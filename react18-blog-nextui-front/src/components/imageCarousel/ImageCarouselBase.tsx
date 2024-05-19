import React, { useState } from 'react'
import { AnimatePresence, motion, wrap } from 'framer-motion'

const images = [
  'http://localhost:8089/upload/image/Jay1_20240422212922.png',
  'http://localhost:8089/upload/image/bak.webp',
  'http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg',
  'http://localhost:8089/upload/image/微信图片_202404241849052.jpg'
]

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    }
  }
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

const ImageCarouselBase = () => {
  const [[page, direction], setPage] = useState([0, 0])
  const imageIndex = wrap(0, images.length, page)
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <div className='image-carousel-baseflex flex flex-row w-full'>
      <AnimatePresence initial={false} custom={direction}>
        <div className='prev bg-cyan-600' onClick={() => paginate(-1)}>
          {'<<<<<<'}
        </div>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
        />
        <div className='next bg-primary-600' onClick={() => paginate(1)}>
          {'>>>>>>'}
        </div>
      </AnimatePresence>
    </div>
  )
}

export default ImageCarouselBase
