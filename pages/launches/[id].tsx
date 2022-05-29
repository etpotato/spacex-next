import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'

import Section from '../../components/Section/Section'
import Carousel, { type CarouselList } from '../../components/Carousel/Carousel'
import Pin from '../../components/Icons/Pin'
import Clock from '../../components/Icons/Clock'
import Rocket from '../../components/Icons/Rocket'
import Success from '../../components/Icons/Success'
import fetchLaunch from '../../features/launches/fetchLaunch'
import type { LaunchServerSide } from '../../features/launches/types'

const LaunchPage: NextPage<LaunchServerSide> = ({ launch }) => {
  const images = launch?.links?.flickr_images?.reduce<CarouselList>((accum, link) => {
    if (link) accum?.push({
      key: link,
      element: (
        <div className='relative h-full flex items-center'>
          <Image className='block w-full max-h-80 object-contain'
            src={link}
            priority
            width='200'
            height='200'
            layout='raw'
            placeholder='blur'
            blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
            alt='Launch photo'/>
        </div>
      )
    })
    return accum
  }, [])
  const location = launch?.launch_site?.site_name_long
  const date = launch?.launch_date_utc
    && new Date(launch?.launch_date_utc).toUTCString()
  const rocket = launch?.rocket?.rocket_name
  const patchSrc = launch?.links?.mission_patch_small;
  const isSuccessful = launch?.launch_success

  return (
    <Section title={launch?.mission_name || ''}>
      <div className='mb-12'>
        <Carousel list={images}/>
      </div>
      <div className='md:grid grid-cols-2 items-start gap-8'>
        <ul className='grid grid-cols-info-item gap-x-3 gap-y-5 items-center mb-12'>
          { location
              ? <li className='contents'>
                  <Pin className='block w-6 h-6' />
                  <span>{location}</span>
                </li>
              : null
          }
          { date
              ? <li className='contents'>
                  <Clock className='block w-5 h-5 ml-0.5' />
                  <span>{date}</span>
                </li>
              : null
          }
          { rocket
              ? <li className='contents'>
                  <a className='contents group py-2 -my-2 hover:-translate-y-1 focus:-translate-y-1 hover:underline focus:underline outline-none underline-offset-2 hover:text-cyan-400 focus:text-cyan-400'
                    href={launch.rocket?.rocket?.wikipedia || undefined}
                    target='_blank'
                    rel='noreferrer'>
                    <Rocket className='col-start-1 col-span-1 block w-6 h-6 group-hover:-translate-y-1 group-focus:-translate-y-1 group-hover:text-cyan-400 group-focus:text-cyan-400'/>
                    <span className='justify-self-start group-hover:-translate-y-1 group-focus:-translate-y-1 group-hover:underline group-focus:underline underline-offset-2 group-hover:text-cyan-400 focus:text-cyan-400'>{rocket}</span>
                  </a>
                </li>
              : null
          }
          <li className='contents'>
            <Success className='block w-5 h-5 ml-1' isSuccessful={isSuccessful || true} />
            <span>{isSuccessful ? 'Success' : 'Fail'}</span>
          </li>
        </ul>
        <p className='max-w-prose'>
          { patchSrc
            ? <div className='float-left mx-4 mt-2 mb-1'>
                <Image className='block'
                  src={patchSrc}
                  width='80'
                  height='80'
                  layout='fixed'
                  alt='Mission patch'/>
              </div>
            : null
          }
          { launch?.details }
        </p>
      </div>
    </Section>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return await fetchLaunch(params?.id)
}

export default LaunchPage
