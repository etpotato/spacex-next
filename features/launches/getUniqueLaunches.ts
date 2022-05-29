import type { Launch } from './types'

const getUniqueLaunches = (launches?: Launch): Launch | [] => {
  if (!launches?.length) return []

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

export default getUniqueLaunches
