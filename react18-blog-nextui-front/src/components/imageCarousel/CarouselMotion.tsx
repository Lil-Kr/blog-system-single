import React, { useEffect, useState } from 'react'
import { imageUrlProp } from '@/pages/home/Home'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const CarouselMotion = (props: { images: imageUrlProp[] }) => {
  const { images } = props
  const [[index, direction], setIndex] = useState([0, 0])

  // 自动切换图片
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(([prev]) => [
        (prev + 1) % images.length,
        1 // 向右切换
      ])
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // 动画变换配置
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0
    })
  }

  // 弹簧动画配置
  const transition = {
    type: 'spring',
    stiffness: 60, // 调整刚度, 越高动画越快
    damping: 15, // 阻尼, 越高越平滑
    velocity: 5 // 初始速度, 模拟惯性
  }

  // 点击事件：切换图片
  const goToNext = () => {
    setIndex(([prev]) => [
      (prev + 1) % images.length,
      1 // 向右切换
    ])
  }

  const goToPrev = () => {
    setIndex(([prev]) => [
      (prev - 1 + images.length) % images.length,
      -1 // 向左切换
    ])
  }

  return (
    <div className='hidden sm:flex flex-col w-full h-[50vh] m-auto relative group overflow-hidden'>
      {/* 左箭头：默认透明，hover 父容器时显现 */}
      <button
        onClick={goToPrev}
        className='absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-60 p-3 rounded-full z-10
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300'
      >
        <ChevronLeftIcon className='w-6 h-6' />
      </button>

      <AnimatePresence custom={direction}>
        <motion.img
          key={index}
          src={images[index].url}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={transition}
          className='absolute w-full h-full object-cover'
        />
      </AnimatePresence>

      {/* 右箭头：同理 */}
      <button
        onClick={goToNext}
        className='absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-60 p-3 rounded-full z-10
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300'
      >
        <ChevronRightIcon className='w-6 h-6' />
      </button>
    </div>
  )
}

export default CarouselMotion
