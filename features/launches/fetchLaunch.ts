import client from '../../libs/apollo-client'

import { LaunchDocument, LaunchQueryVariables } from '../../libs/graphql/__generated__'
import { LaunchServerSideProps } from './types'

type Id = LaunchQueryVariables['id']

const fetchLaunch = async (id?: Id | Id[] ): Promise<LaunchServerSideProps> => {
  if (!id || Array.isArray(id)) return { notFound: true }

  const response = await client.query({
    query: LaunchDocument,
    variables: { id },
  })

  if (response.error || response.errors) throw Error()

  if (!response.data.launch) return { notFound: true }

  return {
    props: {
      launch: response.data.launch,
    },
  }
}

export default fetchLaunch
