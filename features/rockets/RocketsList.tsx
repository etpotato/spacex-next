import Image from 'next/image'
import Link from 'next/link'
import Clock from '../../components/Icons/Clock'
import Weight from '../../components/Icons/Weight'
import type { CarouselList } from '../../components/Carousel/Carousel'
import type { RocketCard } from './types'

const RocketsList = (rockets: RocketCard): CarouselList => {
  return rockets?.map(rocket => {
    const firstFlight = rocket?.first_flight ? new Date(rocket?.first_flight).toDateString() : null

    const item = (
      <Link href={`/rockets/${rocket?.id}`} passHref>
        <a className='grid grid-cols-card gap-4 h-full p-6 border-2 border-black hover:border-cyan-400 focus:border-cyan-400 hover:-translate-y-1 focus:-translate-y-1 hover:underline focus:underline outline-none underline-offset-2'>
          <h3 className='text-lg mb-4 col-span-2 self-start'>{rocket?.name}</h3>
          <p className='contents'>
            <Clock className='block w-5 h-5 ml-1 col-start-1 col-end-2' />
            <span className='col-start-2 col-end-4 xl:col-end-3'>{firstFlight}</span>
          </p>
          <p className='contents'>
            <Weight className='block w-5 h-5 ml-1 col-start-1 col-end-2' />
            <span className='col-start-2 col-end-4 xl:col-end-3'>{rocket?.mass?.kg} kg</span>
          </p>
          <div className='relative w-16 h-16 col-start-3 row-start-1 row-end-2'>
            <Image src={`/img/rockets/${rocket?.id}.jpg`} alt='mission patch' layout='fill' priority/>
          </div>
        </a>
      </Link>
    )

    return ({
      key: rocket?.id,
      element: item,
    })
  })
}

export default RocketsList
