import type { NextPage, GetStaticProps } from 'next'
import type { ApolloQueryResult } from '@apollo/client'

import { LaunchesDocument, LaunchesQuery } from '../libs/graphql/__generated__'
import getUniqueLaunches from '../libs/launches/getUniqueLaunches'
import client from '../libs/apollo-client'
import Image from 'next/image'
import Link from 'next/link'
import Rocket from '../components/Icons/Rocket'
import Clock from '../components/Icons/Clock'
import Carousel from '../components/Carousel/Carousel'
import Section from '../components/Section/Section'

interface props {
  response: ApolloQueryResult<LaunchesQuery>,
  error: { message: String, exist: Boolean },
}

const Main: NextPage<props> = ({ response, error }) => {
  const list = getUniqueLaunches(response)?.map(launch => {
    const date = launch?.launch_date_utc
      && new Date(launch?.launch_date_utc).toUTCString()
    const imageSrc = launch?.links?.mission_patch_small;

    console.log(response);

    return ({
      key: launch?.id,
      element: (
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
              { imageSrc ? <Image src={imageSrc} alt='mission patch' layout='fill'/> : null }
            </div>
          </a>
        </Link>
      ),
    })
  })

  return (
    <Section title='launches' error={error}>
      <Carousel list={list} />
    </Section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await client.query({
      query: LaunchesDocument,
      variables: {
        limit: 6,
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
