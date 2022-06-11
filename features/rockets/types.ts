import type { ApolloQueryResult } from '@apollo/client'
import type { RocketsQuery, RocketQuery } from '../../libs/graphql/__generated__'

type RocketsResponse = ApolloQueryResult<RocketsQuery>
export type RocketCard = RocketsResponse['data']['rockets']

export type RocketsStatic = {
  staticRockets?: RocketCard,
  error: boolean,
}

export type RocketsStaticProps = {
  props: RocketsStatic
}

export type RocketResponse = ApolloQueryResult<RocketQuery>

export type RocketStatic = {
  staticRocket?: RocketResponse['data']['rocket'],
  error: boolean,
}

export type RocketStaticProps = {
  props: RocketStatic,
  revalidate?: number,
} | { notFound: true }

