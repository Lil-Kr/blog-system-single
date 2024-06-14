import React, { useEffect, useState } from 'react'
import { CardBlogListItem } from '@/components/card'
import { BlogItemsType } from '@/types/blog'
import { PaginationBase } from '@/components/pagination'
import { CarouselBase } from '@/components/imageCarousel'

import { blogContentApi, BlogContentReqParams } from '@/apis/contentApi'

// const blogItems: BlogItemsType[] = [
//   {
//     key: 1,
//     image: {
//       alt: 'test image',
//       url: 'http://localhost:8089/upload/image/Jay1_20240422212922.png'
//     },
//     tags: ['Java后台开发', '微服务', 'TS'],
//     blogTitle: 'React8 hook 学习经验分享',
//     publishTime: '2022-02-22'
//   },
//   {
//     key: 2,
//     image: {
//       alt: 'test image',
//       url: 'http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg'
//     },
//     tags: ['Java后台开发', '微服务', 'TS'],
//     blogTitle: '操作系统中的线程与进程',
//     publishTime: '2022-09-22'
//   },
//   {
//     key: 3,
//     image: {
//       alt: 'test image',
//       url: 'http://localhost:8089/upload/image/微信图片_202404241849052.jpg'
//     },
//     tags: ['编译原理', '计算机基础'],
//     blogTitle: '操作系统中的线程与进程',
//     publishTime: '2024-04-22'
//   },
//   {
//     key: 4,
//     image: {
//       alt: 'test image',
//       url: 'http://localhost:8089/upload/image/微信图片_202404241849052.jpg'
//     },
//     tags: ['编译原理', '计算机基础'],
//     blogTitle: '操作系统中的线程与进程',
//     publishTime: '2024-04-22'
//   },
//   {
//     key: 5,
//     image: {
//       alt: 'test image',
//       url: 'http://localhost:8089/upload/image/微信图片_202404241849052.jpg'
//     },
//     tags: ['编译原理', '计算机基础'],
//     blogTitle: '操作系统中的线程与进程',
//     publishTime: '2024-04-22'
//   },
//   {
//     key: 6,
//     image: {
//       alt: 'test image',
//       url: 'http://localhost:8089/upload/image/微信图片_202404241849052.jpg'
//     },
//     tags: ['编译原理', '计算机基础'],
//     blogTitle: '操作系统中的线程与进程',
//     publishTime: '2024-04-22'
//   },
//   {
//     key: 7,
//     image: {
//       alt: 'test image',
//       url: 'http://localhost:8089/upload/image/微信图片_202404241849052.jpg'
//     },
//     tags: ['编译原理', '计算机基础'],
//     blogTitle: '操作系统中的线程与进程',
//     publishTime: '2024-04-22'
//   }
// ]

const images = [
  { url: 'http://localhost:8089/upload/image/Jay1_20240422212922.png' },
  { url: 'http://localhost:8089/upload/image/bak.webp' },
  { url: 'http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg' },
  { url: 'http://localhost:8089/upload/image/微信图片_202404241849052.jpg' }
]

const Home = () => {
  const [contents, setContents] = useState<BlogItemsType[]>([])

  /**
   * 初始化数据
   */
  useEffect(() => {
    frontContentPageList({ keyWords: '', currentPageNum: 1, pageSize: 10 })
  }, [])

  const frontContentPageList = async (params: BlogContentReqParams) => {
    const contentPageList = await blogContentApi.frontContentPageList({ ...params })
    const { code, data, msg } = contentPageList
    if (code !== 200) {
      return []
    }

    const contentPageData = data.list.map(
      ({ id, surrogateId, number, title, original, recommend, imgUrl, labels, publishTime }) => ({
        key: surrogateId,
        image: {
          alt: '',
          url: imgUrl
        },
        tags: labels,
        blogTitle: title,
        publishTime,
        backendApi: `/get/${surrogateId}`
      })
    )
    console.log('--> contentPageData: ', contentPageData)
    setContents(contentPageData)
  }

  return (
    <>
      {/* 右侧主体内容 */}
      <div className='flex flex-col w-full gap-y-4'>
        <div className='flex w-full'>
          {/* <Carousel images={images} /> */}
          <CarouselBase images={images} />
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {contents.map((blogItem, index) => (
            <CardBlogListItem key={index} blogItem={blogItem} />
          ))}
        </div>
        <div className='flex flex-row justify-center pt-6'>
          <PaginationBase />
        </div>
      </div>
    </>
  )
}

export default Home
