import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import CheckCircleIcon from '@heroicons/react/24/solid/esm/CheckCircleIcon'
import { Card, CardBody, CardFooter, CardHeader, Divider, Link, Image } from '@heroui/react'
import { motion } from 'framer-motion'
import React from 'react'

interface TimelineItem {
  title: string
  time: string
  description: string
  color?: string
}

const Timeline = () => {
  const timeline: TimelineItem[] = [
    {
      title: '文章发布',
      time: '2025-04-10',
      description: '在博客上发布了文章《VuePress 入门》'
    },
    {
      title: '阅读高峰',
      time: '2025-04-12',
      description: '文章获得 5,000+ 阅读量'
    },
    {
      title: '评论突破',
      time: '2025-04-15',
      description: '评论数量突破 100 条'
    },
    {
      title: '评论突破',
      time: '2025-04-15',
      description: '评论数量突破 100 条'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut'
      }}
    >
      <div className='relative border-l border-gray-300 dark:border-gray-600 pl-6 m-12'>
        {timeline.map((item, index) => (
          <div key={index} className='mb-10 ml-2'>
            <span
              className={`absolute -left-3 flex items-center justify-center w-6 h-6 text-white rounded-full bg-indigo-500 dark:bg-purple-600`}
            >
              {/* <CheckBadgeIcon className='h-4 w-4' /> */}
              <CheckCircleIcon className='h-4 w-4' />
            </span>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>{item.title}</h3>
            <time className='block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-400'>
              {item.time}
            </time>
            <p className='text-base text-gray-700 dark:text-gray-300'>{item.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Timeline
