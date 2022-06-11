import client from '../../libs/apollo-client'
import { RocketDocument, RocketQueryVariables } from "../../libs/graphql/__generated__"

import type { RocketStaticProps, RocketResponse } from './types'

type Id = RocketQueryVariables['id']

const fetchRocket = async (id?: Id | Id[]): Promise<RocketStaticProps> => {

  if (!id || Array.isArray(id)) return { notFound: true }

  const response: RocketResponse = await client.query({
    query: RocketDocument,
    variables: { id },
  })

  if (response.error || response.errors || !response.data.rocket) return { notFound: true }

  return {
    props: {
      staticRocket: response.data.rocket,
      error: false,
    },
    revalidate: 10,
  }
}

export default fetchRocket
