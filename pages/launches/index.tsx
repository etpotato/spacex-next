import type { NextPage, GetStaticProps } from 'next'

import { getStaticLaunches, useFetchLaunches } from '../../features/launches/fetchLaunches'
import LaunchesList from '../../features/launches/LaunchesList'
import Carousel from '../../components/Carousel/Carousel'
import Section from '../../components/Section/Section'
import type { LaunchesStatic } from '../../features/launches/types'

const Main: NextPage<LaunchesStatic> = ({ staticLaunches, error }) => {
  const { launches, addLaunches } = useFetchLaunches(staticLaunches);

  return (
    <Section title='launches' error={error}>
      <Carousel list={LaunchesList(launches)} addItems={addLaunches}/>
    </Section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const result = await getStaticLaunches()
  return result
}

export default Main
