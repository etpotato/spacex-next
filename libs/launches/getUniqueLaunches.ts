import type { ApolloQueryResult } from '@apollo/client'
import type { LaunchesQuery } from '../graphql/__generated__'

type Input = ApolloQueryResult<LaunchesQuery>
type Launch = Input['data']['launches']

const getUniqueLaunches = (response?: Input): Launch | [] => {
  const launches =  response?.data?.launches
  if (!launches?.length) return [];

  const set: Set<String> = new Set()
  const uniqueLaunches = launches.filter((launch) => {
    if (launch?.id && !set.has(launch.id)) {
      set.add(launch.id)
      return true
    }
    return false
  })

  return uniqueLaunches
}

export default getUniqueLaunches;
