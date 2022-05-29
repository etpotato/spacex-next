import type { ApolloQueryResult } from '@apollo/client'
import type { LaunchesQuery, LaunchQuery } from '../../libs/graphql/__generated__'

type LaunchesResponse = ApolloQueryResult<LaunchesQuery>
export type LaunchesData = LaunchesResponse['data']
export type LaunchCard = LaunchesData['launches']
export type LaunchesStatic = {
  staticLaunches?: LaunchCard,
  error: boolean,
}
export type LaunchesStaticProps = {
  props: LaunchesStatic,
}

type LaunchResponse = ApolloQueryResult<LaunchQuery>
export type LaunchServerSide = {
  launch: LaunchResponse['data']['launch'],
  error?: LaunchResponse['error'],
  errors?: LaunchResponse['errors'],
}
export type LaunchServerSideProps = { props: LaunchServerSide } | { notFound: true }
