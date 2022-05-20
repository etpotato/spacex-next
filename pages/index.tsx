import type { NextPage, GetStaticProps } from 'next'
import type { ApolloQueryResult } from '@apollo/client'

import { LaunchesDocument, LaunchesQuery } from '../libs/graphql/__generated__'
import client from '../libs/apollo-client'
import Image from 'next/image'
import Link from 'next/link'
import Rocket from '../components/Icons/Rocket'
import Clock from '../components/Icons/Clock'

interface props {
  response: ApolloQueryResult<LaunchesQuery>,
  error: { message: String, exist: Boolean },
}

const Main: NextPage<props> = ({ response, error }) => {
  return (
    <>
      <h1 className='font-bold mb-6'>launches</h1>
      { error.exist
        ? <p>{ error.message }</p>
        : (
          <ul className='md:grid grid-cols-2 gap-6 xl:grid-cols-3 xl:gap-8'>
            { response?.data?.launches?.map(launch => {
              const date = launch?.launch_date_local
                && new Date(launch?.launch_date_local).toUTCString()

              return (
                <li className='mb-6 last:mb-0 md:mb-0' key={launch?.id}>
                  <Link href={`/launches/${launch?.id}`} passHref>
                    <a className='grid grid-cols-card gap-4 h-full p-6 border-2 border-black hover:border-cyan-400 focus:border-cyan-400 hover:-translate-y-1 focus:-translate-y-1 hover:underline focus:underline outline-none underline-offset-2'>
                      <h3 className='text-lg mb-4 col-span-2 self-start'>{launch?.mission_name}</h3>
                      <p className='contents'>
                        <Clock className='block w-5 h-5 ml-1 col-start-1 col-end-2' />
                        <span className='col-start-2 col-end-4 xl:col-end-3'>{date}</span>
                      </p>
                      <p className='contents'>
                        <Rocket className='block w-6 h-6 col-start-1 col-end-2'/>
                        <span className='col-start-2'>{launch?.rocket?.rocket_name}</span>
                      </p>
                      <div className='relative w-16 h-16 col-start-3 row-start-1 row-end-2'>
                        <Image src={launch?.links?.mission_patch_small || ''} alt='mission patch' layout='fill'/>
                      </div>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await client.query({
      query: LaunchesDocument,
      variables: {
        limit: 12,
        sort: 'launch_year',
        order: 'desc',
      },
    })

    return {
      props: {
        response,
        error: {
          exist: false,
        },
      },
    }
  } catch (error: any) {
    return {
      props: {
        error: {
          exist: true,
          message: error.message,
        },
      },
    }
  }
}

export default Main
