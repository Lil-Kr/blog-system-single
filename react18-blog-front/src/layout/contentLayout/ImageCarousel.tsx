import React from 'react'
import { Carousel } from 'react-responsive-carousel'

// css
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import mainLayout from '@/layout/css/index.module.scss'

const ImageCarousel = () => {
  const buttonStyle = { fontSize: 20, padding: '5px 20px', margin: '5px 0px' }
  const containerStyle = { margin: '5px 0 20px' }
  return (
    <div className={mainLayout.carousel}>
      <Carousel
        key={'carousel-1'}
        width={'100%'}
        infiniteLoop={true} // 循环播放
        // centerMode
        // centerSlidePercentage={number('centerSlidePercentage', 80, {}, mainGroupId)}
        showArrows={true}
        dynamicHeight={true}
        showStatus={false}
        showThumbs={false}
        useKeyboardArrows={true}
        // autoFocus={true}
      >
        <div>
          <img
            width={100}
            height={700}
            src='http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg'
          />
        </div>
        <div>
          <img width={100} height={700} src='http://localhost:8089/upload/image/微信图片_202404241849052.jpg' />
        </div>
        <div>
          <img width={100} height={700} src='http://localhost:8089/upload/image/Jay1_20240422212922.png' />
        </div>
        <div>
          <img width={100} height={700} src='http://localhost:8089/upload/image/bak.webp' />
        </div>
      </Carousel>
    </div>
  )
}

export default ImageCarousel
