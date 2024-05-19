import React from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { Button, Divider } from '@nextui-org/react'

const Home = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  const { scrollYProgress } = useScroll()

  return (
    // <div className='flex flex-col w-full bg-purple-100'>
    // </div>
    <div className='flex flex-col w-full gap-y-6'>
      <motion.button
        className='bg-primary-400 px-10 py-10 text-white'
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        color='primary'
      >
        运动
      </motion.button>
      <motion.div className='bg-primary-600 px-10 py-10 text-large text-white' animate={{ x: 50 }}>
        animate(动画组件)
      </motion.div>

      <motion.div
        className='bg-primary-600 px-10 py-10 text-large text-white'
        animate={{ x: 50, y: 50 }}
        transition={{ ease: 'easeOut', duration: 2 }}
        initial={false}
      >
        transitions(过度动画组件)
      </motion.div>

      <AnimatePresence>
        <motion.div
          className='bg-purple-400 px-10 py-10 text-large text-white'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          Exit animations
        </motion.div>
      </AnimatePresence>

      {/* <motion.div
        className='box bg-purple-600 px-10 py-10 text-large text-white'
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ['0%', '0%', '50%', '50%', '0%']
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      >
        Exit animations
      </motion.div> */}

      <motion.div
        className='bg-sky-400 px-5 py-5 text-large text-white'
        transition={{ type: 'spring', stiffness: 200, damping: 5 }}
        whileHover={{ scale: 1.1 }}
      >
        abc
      </motion.div>

      <motion.a className='bg-sky-600 px-5 py-5 text-large text-white' whileFocus={{ scale: 1.2 }} href='#'>
        abc
      </motion.a>

      <motion.input className='placeholder-gray-500 border border-grap-300' whileFocus={{ scale: 1.1 }} />

      <motion.div className='progress-bar' style={{ scaleX: scrollYProgress }} />
      <h1>
        <code>useScroll</code>
      </h1>
    </div>
  )
}

export default Home
