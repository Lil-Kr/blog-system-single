import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { imageUrlProp } from '@/pages/home/Home'

const CarouselBase = (props: { images: imageUrlProp[] }) => {
  const { images } = props
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }
  // 轮播效果
  useEffect(() => {
    const interval = setTimeout(() => {
      goToNext()
    }, 3000) // Change image every 3 seconds
    return () => clearTimeout(interval)
  }, [currentIndex])

  return (
    <div className='hidden sm:flex flex-col w-full h-[50vh] m-auto relative group'>
      <div
        className={`w-full h-full rounded-md bg-center bg-cover duration-500`}
        style={{
          backgroundImage: `url(${images[currentIndex].url})`
        }}
      />

      {/* left arrow */}
      <div
        className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
        onClick={goToPrev}
      >
        <BsChevronCompactLeft size={30} />
      </div>

      {/* right arrow */}
      <div
        className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
        onClick={goToNext}
      >
        <BsChevronCompactRight size={30} />
      </div>

      <div className='flex justify-center py-2'>
        {/* {images.map((slide, index) => (
          <div key={index} className='text-2xl cursor-pointer' onClick={() => goToSlide(index)}>
            <RxDotFilled />
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default CarouselBase
