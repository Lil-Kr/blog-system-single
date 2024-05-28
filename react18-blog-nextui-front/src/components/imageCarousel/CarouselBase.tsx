import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

interface imageType {
  url: string
}

const CarouselBase = (props: { images: imageType[] }) => {
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

  useEffect(() => {
    const interval = setTimeout(() => {
      goToNext()
    }, 3000) // Change image every 3 seconds
    return () => clearTimeout(interval)
  }, [currentIndex])

  return (
    <div className='flex flex-col w-full h-[55vh] m-auto relative group'>
      <div
        style={{
          backgroundImage: `url(${images[currentIndex].url})`
        }}
        className={`w-full h-full rounded-md bg-center bg-cover duration-500`}
      >
        {/* <img
          className={`flex w-full h-full rounded-md`}
          src={images[currentIndex].url}
          alt='abc'
        /> */}
      </div>

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
