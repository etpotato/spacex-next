import client from '../../libs/apollo-client'
import { RocketsDocument } from "../../libs/graphql/__generated__"

import type { RocketsStaticProps } from './types'

const fetchRockets = async (): Promise<RocketsStaticProps> => {
  try {
    const response = await client.query({
      query: RocketsDocument,
    })

    const rockets = response?.data?.rockets

    if (!rockets) throw new Error()
    return {
      props: {
        staticRockets: rockets,
        error: false,
      },
    }
  } catch {
    return {
      props: {
        error: true,
      },
    }
  }
}

export default fetchRockets
