import React from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { Button, Divider, Image } from '@nextui-org/react'
import { CardBlogItem } from '@/components/card'
import { BlogItemsType } from '@/types/blog'
import { PaginationBase } from '@/components/pagination'
import { ItemBase } from '@/components/listBox'

const blogItems: BlogItemsType[] = [
  {
    key: 1,
    image: {
      alt: 'test image',
      src: 'http://localhost:8089/upload/image/Jay1_20240422212922.png'
    },
    tags: ['Java后台开发', '微服务', 'TS'],
    blogTitle: 'React8 hook 学习经验分享',
    publishDate: '2022-02-22'
  },
  {
    key: 2,
    image: {
      alt: 'test image',
      src: 'http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg'
    },
    tags: ['Java后台开发', '微服务', 'TS'],
    blogTitle: '操作系统中的线程与进程',
    publishDate: '2022-09-22'
  },
  {
    key: 3,
    image: {
      alt: 'test image',
      src: 'http://localhost:8089/upload/image/微信图片_202404241849052.jpg'
    },
    tags: ['编译原理', '计算机基础'],
    blogTitle: '操作系统中的线程与进程',
    publishDate: '2024-04-22'
  }
]

const Home = () => {
  return (
    <div className='flex flex-col w-full gap-y-4'>
      <div className='flex w-full h-96 bg-blue-500'>图片轮播</div>
      <div className='grid grid-cols-3 gap-4'>
        {blogItems.map((blogItem, index) => (
          <CardBlogItem key={index} blogItem={blogItem} />
        ))}
      </div>
      <div className='flex flex-row justify-center pt-6'>
        <PaginationBase />
      </div>
    </div>
  )
}

export default Home
