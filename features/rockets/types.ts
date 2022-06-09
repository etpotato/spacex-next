import type { ApolloQueryResult } from '@apollo/client'
import type { RocketsQuery } from '../../libs/graphql/__generated__'

type RocketsResponse = ApolloQueryResult<RocketsQuery>
export type RocketCard = RocketsResponse['data']['rockets']

export type RocketsStatic = {
  staticRockets?: RocketCard,
  error: boolean,
}

export type RocketsStaticProps = {
  props: RocketsStatic
}
