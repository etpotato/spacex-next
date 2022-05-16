import type { NextPage, GetStaticProps } from 'next'
import client from '../libs/apollo-client'
import { LaunchesDocument } from '../libs/graphql/__generated__'
import Launches, { type LaunchesPropTypes } from '../components/Launches/Launches'

const Main: NextPage<LaunchesPropTypes> = ({ response, error }) => {
  return (
    <main className='main'>
      <h1 className='text-center text-3xl font-bold underline'>hello next</h1>
      <Launches response={response} error={error} />
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await client.query({
      query: LaunchesDocument,
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
    console.log('error: ', error.message)
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
