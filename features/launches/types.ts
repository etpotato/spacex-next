import type { ApolloQueryResult } from '@apollo/client'
import type { LaunchesQuery } from '../../libs/graphql/__generated__'

export type LaunchesResponse = ApolloQueryResult<LaunchesQuery>
export type LaunchesData = LaunchesResponse['data']
export type Launch = LaunchesData['launches']
export type LaunchesStatic = {
  staticLaunches?: Launch,
  error: Boolean,
}
export type LaunchesStaticProps = {
  props: {
    staticLaunches?: Launch,
    error: Boolean,
  }
}
