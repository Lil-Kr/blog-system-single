import React, { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Image } from '@nextui-org/react'

const variants: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 }
}

interface CarouselProps {
  images: string[]
}

const images = [
  'http://localhost:8089/upload/image/Jay1_20240422212922.png',
  'http://localhost:8089/upload/image/bak.webp',
  'http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg',
  'http://localhost:8089/upload/image/微信图片_202404241849052.jpg'
]

const Carousel = (props: CarouselProps) => {
  // const { images } = props
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrev = () => {
    // console.log('goToPrev')
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    // console.log('goToNext')
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className='carousel-container overflow-hidden relative'>
      <div className='flex transition-transform ease-in-out duration-300' style={{transform:`translateX(-${currentIndex * 100}%)`}}>
        {images.map((image, index) => (
          <img key={index} src={image} width={'200px'} alt='a' />
        ))}
      </div>

      <div className='flex absolute inset-0 items-center justify-between p-4'>
        <div
          onClick={goToPrev}
          className='p-1 rounded-full shadow-md bg-white hover:bg-white-100 text-gray-800 text-lg cursor-pointer'
        >
          {'<'}
        </div>
        <div
          onClick={goToNext}
          className='p-1 rounded-full shadow-md bg-white hover:bg-white-100 text-gray-800 text-lg cursor-pointer'
        >
          {'>'}
        </div>
      </div>

      <div className='absolute bottom-4 right-0 left-0'>
        <div className='flex item-center justify-center gap-2'>
          {images.map((_,i) => (
            <div className={`transition-all w-3 h-3 bg-white rounded-full ${currentIndex === i ? 'p-2' : 'bg-opacity-50'}`}></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
