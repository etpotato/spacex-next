import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
import { MouseEventHandler, useState } from 'react'

import Section from '../../components/Section/Section'
import Carousel, { type CarouselList } from '../../components/Carousel/Carousel'
import Modal from '../../components/Modal/Modal'
import Pin from '../../components/Icons/Pin'
import Clock from '../../components/Icons/Clock'
import Rocket from '../../components/Icons/Rocket'
import Success from '../../components/Icons/Success'
import fetchLaunch from '../../features/launches/fetchLaunch'
import { getYouTubeVideoIdFromUrl } from '../../libs/helpers/youtube'
import type { LaunchServerSide } from '../../features/launches/types'

const LaunchPage: NextPage<LaunchServerSide> = ({ launch }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const handleImageClick = (src: typeof activeImage): MouseEventHandler => (evt) => {
    evt.preventDefault();
    setActiveImage(src);
    setModalOpen(true);
  }

  const images = launch?.links?.flickr_images?.reduce<CarouselList>((accum, link) => {
    if (link) accum?.push({
      key: link,
      element: (
        <a
          className='relative h-full flex items-center'
          href={link}
          onClick={handleImageClick(link)}>
          <Image className='block w-full max-h-80 object-contain'
            src={link}
            priority
            width='200'
            height='200'
            layout='raw'
            placeholder='blur'
            blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
            alt='Launch photo'/>
        </a>
      )
    })
    return accum
  }, [])
  const location = launch?.launch_site?.site_name_long
  const date = launch?.launch_date_utc
    && new Date(launch?.launch_date_utc).toUTCString()
  const rocket = launch?.rocket?.rocket_name
  const patchSrc = launch?.links?.mission_patch_small
  const isSuccessful = launch?.launch_success
  const video = getYouTubeVideoIdFromUrl(launch?.links?.video_link ? launch.links.video_link : '')

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
        <p className='max-w-prose mb-12'>
          { patchSrc
            ? <span className='block float-left mx-4 mt-2 mb-1'>
                <Image className='block'
                  src={patchSrc}
                  width='80'
                  height='80'
                  layout='fixed'
                  alt='Mission patch'/>
              </span>
            : null
          }
          { launch?.details }
        </p>
        { video
          ? <div>
              <iframe className='w-full h-auto aspect-video' width='560' height='315' src={`https://www.youtube.com/embed/${video}`} title='YouTube video player' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'></iframe>
            </div>
          : null
        }
        { launch?.links?.article_link || launch?.links?.wikipedia
          ? <div className='flex flex-col h-full items-end justify-end'>
              <h2 className='mb-5'>Links:</h2>
              { launch?.links?.article_link
                ? <a className='block max-w-max mb-4 text-sm underline underline-offset-2 hover:-translate-y-1 focus:-translate-y-1 hover:text-cyan-400 focus:text-cyan-400'
                    href={launch.links.article_link}
                    target='_blank'
                    rel='noreferrer'>
                    Article
                  </a>
                : null
              }
              { launch?.links?.wikipedia
                ? <a className='block max-w-max mb-4 text-sm underline underline-offset-2 hover:-translate-y-1 focus:-translate-y-1 hover:text-cyan-400 focus:text-cyan-400'
                href={launch.links.wikipedia}
                target='_blank'
                rel='noreferrer'>
                    Wikipedia
                  </a>
                : null
              }
            </div>
        : null
        }
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        { activeImage
          && <Image
              className='block w-auto h-screen object-contain'
              src={activeImage}
              layout='raw'
              width='600'
              height='600'
              placeholder='blur'
              blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
              alt='launch photo'/>
        }
      </Modal>
    </Section>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return await fetchLaunch(params?.id)
}

export default LaunchPage
