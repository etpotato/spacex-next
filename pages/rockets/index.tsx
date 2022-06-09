import type { NextPage, GetStaticProps } from 'next'

import fetchRockets from '../../features/rockets/fetchRockets'
import RocketsList from '../../features/rockets/RocketsList'
import Section from '../../components/Section/Section'
import Carousel from '../../components/Carousel/Carousel'

import type { RocketsStatic } from '../../features/rockets/types'


const Rockets:NextPage<RocketsStatic> = ({ error, staticRockets}) => {

  return (
    <Section title='rockets' error={error}>
      <Carousel list={RocketsList(staticRockets)} />
    </Section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return await fetchRockets()
}

export default Rockets
