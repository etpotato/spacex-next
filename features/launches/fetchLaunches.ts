import { useState } from 'react'
import client from '../../libs/apollo-client'

import { LaunchesDocument, useLaunchesLazyQuery } from '../../libs/graphql/__generated__'
import getUniqueLaunches from './getUniqueLaunches'
import type { LaunchCard, LaunchesData, LaunchesStaticProps } from './types'

const ITEMS_LIMIT = 6;

export const getStaticLaunches = async (): Promise<LaunchesStaticProps> => {
  try {
    const response = await client.query({
      query: LaunchesDocument,
      variables: {
        limit: ITEMS_LIMIT,
        offset: 0,
      },
    })
    return {
      props: {
        staticLaunches: getUniqueLaunches(response?.data?.launches),
        error: false,
      },
    }
  } catch (error: any) {
    return {
      props: {
        error: true,
      },
    }
  }
}

export const useFetchLaunches = (staticLaunches: LaunchCard) => {
  const [fetchLaunches] = useLaunchesLazyQuery({ onCompleted })
  const [launches, setLaunches] = useState(staticLaunches)
  const [offset, setOffset] = useState(ITEMS_LIMIT)

  function onCompleted(data: LaunchesData) {
    const haveLaunches = Array.isArray(launches)
    const haveNewLaunches = Array.isArray(data?.launches)

    if (haveLaunches || haveNewLaunches) {
      const newLaunches = getUniqueLaunches([
        ...(haveLaunches ? launches : []),
        ...(Array.isArray(data?.launches) ? data.launches : [])
      ])

      setOffset(state => state + ITEMS_LIMIT)
      setLaunches(newLaunches)
    }
  }

  const addLaunches = () => fetchLaunches({
    variables: {
      limit: ITEMS_LIMIT,
      offset,
    }
  })

  return { launches, addLaunches }
}

export default useFetchLaunches
