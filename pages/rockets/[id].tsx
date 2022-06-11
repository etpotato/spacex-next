import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import { MouseEventHandler, useState } from 'react'

import Section from '../../components/Section/Section'
import Modal from '../../components/Modal/Modal'
import fetchRocket from '../../features/rockets/fetchRocket'
import type { RocketStatic } from '../../features/rockets/types'

const RocketPage: NextPage<RocketStatic> = ({ staticRocket }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const handleImageClick = (src: typeof activeImage): MouseEventHandler => (evt) => {
    evt.preventDefault();
    setActiveImage(src);
    setModalOpen(true);
  }

  const link = `/img/rockets/${staticRocket?.id}.jpg`;
  const date = staticRocket?.first_flight && new Date(staticRocket?.first_flight).toUTCString()

  return (
    <Section title={staticRocket?.name || ''}>
      <div className='md:grid grid-cols-2 items-start gap-8'>
        <a
          className='relative h-full block mb-8 md:mb-0'
          href={link}
          onClick={handleImageClick(link)}>
          <Image className='block w-full max-h-80 object-cover object-top'
            src={link}
            priority
            width='200'
            height='200'
            layout='raw'
            placeholder='blur'
            blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
            alt='Rocket photo'/>
        </a>
        <ul className='mb-8 md:mb-0'>
          <li className='mb-3 flex flex-wrap'>
            <h3 className='font-bold mr-3'>first flight</h3>
            <p>{date}</p>
          </li>
          <li className='mb-3 flex flex-wrap'>
            <h3 className='font-bold mr-3'>cost per launch</h3>
            <p>{staticRocket?.cost_per_launch}$</p>
          </li>
          <li className='mb-3 flex flex-wrap'>
            <h3 className='font-bold mr-3'>stages</h3>
            <p>{staticRocket?.stages}</p>
          </li>
          <li className='mb-3 flex flex-wrap'>
            <h3 className='font-bold mr-3'>engines</h3>
            <p>{`${staticRocket?.engines?.type} ${staticRocket?.engines?.version}`}</p>
          </li>
          <li className='mb-3 flex flex-wrap'>
            <h3 className='font-bold mr-3'>diameter</h3>
            <p>{staticRocket?.diameter?.meters}m</p>
          </li>
          <li className='mb-3 flex flex-wrap'>
            <h3 className='font-bold mr-3'>height</h3>
            <p>{staticRocket?.height?.meters}m</p>
          </li>
          <li className='mb-3 flex flex-wrap'>
            <h3 className='font-bold mr-3'>mass</h3>
            <p>{staticRocket?.mass?.kg}kg</p>
          </li>
          <li className='mb-3 flex flex-wrap'>
            <h3 className='font-bold mr-3'>payload weights</h3>
            <ul>
              { staticRocket?.payload_weights?.map(item => (
                <li key={item?.id}>- {item?.name?.toLocaleLowerCase()}: {item?.kg}kg</li>
              ))}
            </ul>
          </li>
        </ul>
        <p className='mb-8 md:mb-0'>{ staticRocket?.description }</p>
        { staticRocket?.wikipedia
          && <div className='flex flex-col h-full items-end justify-end'>
              <h2 className='mb-5'>Links:</h2>
              <a className='block max-w-max mb-4 text-sm underline underline-offset-2 hover:-translate-y-1 focus:-translate-y-1 hover:text-cyan-400 focus:text-cyan-400'
                href={staticRocket.wikipedia}
                target='_blank'
                rel='noreferrer'>
                Wikipedia
              </a>
            </div>
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
              alt='Rocket photo'/>
        }
      </Modal>
    </Section>
  )
}

export const getStaticPaths: GetStaticPaths = async() => ({
  paths: [
    { params: { id: 'falcon1' }},
    { params: { id: 'falcon9' }},
    { params: { id: 'falconheavy' }},
    { params: { id: 'starship' }},
  ],
  fallback: false,
})

export const getStaticProps: GetStaticProps = async({ params }) => await fetchRocket(params?.id)

export default RocketPage
