import Image from 'next/image'
import Link from 'next/link'
import Rocket from '../../components/Icons/Rocket'
import Clock from '../../components/Icons/Clock'
import getUniqueLaunches from './getUniqueLaunches'
import type { CarouselList } from '../../components/Carousel/Carousel'
import type { Launch } from './types'

const LaunchesList = (launches: Launch): CarouselList => {
  const uniqueLaunches = getUniqueLaunches(launches)

  return uniqueLaunches?.map(launch => {
    const date = launch?.launch_date_utc
      && new Date(launch?.launch_date_utc).toUTCString()
    const imageSrc = launch?.links?.mission_patch_small;

    const item = (
      <Link href={`/launches/${launch?.id}`} passHref>
        <a className='grid grid-cols-card gap-4 h-full p-6 border-2 border-black hover:border-cyan-400 focus:border-cyan-400 hover:-translate-y-1 focus:-translate-y-1 hover:underline focus:underline outline-none underline-offset-2'>
          <h3 className='text-lg mb-4 col-span-2 self-start'>{launch?.mission_name}</h3>
          <p className='contents'>
            <Clock className='block w-5 h-5 ml-1 col-start-1 col-end-2' />
            <span className='col-start-2 col-end-4 xl:col-end-3'>{date}</span>
          </p>
          <p className='contents'>
            <Rocket className='block w-6 h-6 col-start-1 col-end-2'/>
            <span className='col-start-2'>{launch?.rocket?.rocket_name}</span>
          </p>
          <div className='relative w-16 h-16 col-start-3 row-start-1 row-end-2'>
            { imageSrc ? <Image src={imageSrc} alt='mission patch' layout='fill' priority/> : null }
          </div>
        </a>
      </Link>
    )

    return ({
      key: launch?.id,
      element: item,
    })
  })
}

export default LaunchesList
