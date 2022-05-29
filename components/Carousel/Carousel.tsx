import { Swiper, Navigation } from 'swiper'
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

type AddItems = () => void

export type CarouselList = Array<{ key?: string | null, element: JSX.Element }> | undefined

interface props {
  list?: CarouselList,
  addItems?: AddItems,
}

const SLIDES_BUFFER = 5
const BREAKPOINTS = {
  '640': { slidesPerView: 2 },
  '1280': { slidesPerView: 3 },
} as const

type Breakpoints = keyof typeof BREAKPOINTS

const onActiveIndexChange = (addItems?: AddItems) => (swiper: Swiper): void => {
  if (!addItems) return;

  const currentBreakpoint: Breakpoints = swiper.currentBreakpoint

  const slidesPerView = BREAKPOINTS[currentBreakpoint]?.slidesPerView
  const leftToShow = swiper.slides.length - slidesPerView - swiper.activeIndex

  if (leftToShow <= SLIDES_BUFFER) addItems()
};

const Carousel: React.FC<props> = ({ list, addItems }) => {
  return (
    <SwiperComponent
      className='swiper-custom'
      breakpoints={BREAKPOINTS}
      modules={[Navigation]}
      navigation
      onSlideNextTransitionEnd={onActiveIndexChange(addItems)}
      spaceBetween={32}
      slidesPerView={1}
      wrapperTag='ul'
    >
      { list?.map((item) => {
        return (
          <SwiperSlide key={item.key} tag='li'>
            { item.element }
          </SwiperSlide>
        )})}
    </SwiperComponent>
  )
};

export default Carousel
