import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'

interface props {
  list?: Array<{
    key?: string | null,
    element: JSX.Element,
  }>,
}

const Carousel: React.FC<props> = ({ list }) => {
  return (
    <Swiper
      className='swiper-custom'
      modules={[Navigation]}
      navigation
      spaceBetween={32}
      breakpoints={{
        '640': { slidesPerView: 2 },
        '1280': { slidesPerView: 3 },
      }}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      wrapperTag='ul'
    >
      { list?.map((item) => (
        <SwiperSlide key={item.key} tag='li'>
          { item?.element }
        </SwiperSlide>
      ))}
    </Swiper>
  )
};

export default Carousel