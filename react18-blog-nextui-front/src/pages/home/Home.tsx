import React, { useEffect, useState } from 'react'
import { CardBlogListItem } from '@/components/card'
import { BlogItemsType } from '@/types/blog'
import { PaginationBase } from '@/components/pagination'
import { CarouselBase } from '@/components/imageCarousel'
import { baseUrl } from '@/constant'
import { blogContentApi } from '@/apis/contentApi'
import { PageResult, PaginationType } from '@/types/base/response'
import { transformToDay } from '@/utils/date/dateTimeUtil'
import { BlogContentReq } from '@/types/apis/blog/blogTypes'
import { motion } from 'framer-motion'

const env = import.meta.env

export type btnStatueProp = {
  prevBtn: boolean
  nextBtn: boolean
}

export type imageUrlProp = {
  url: string
}

const Home = () => {
  const [images, setImages] = useState<imageUrlProp[]>([])
  const [contents, setContents] = useState<PageResult<BlogItemsType>>()
  const [pagination, setPagination] = useState<PaginationType>({
    currentPageNum: 1,
    pageSize: 6,
    total: 0,
    totalPage: 0
  })
  const [btnDisable, setBtnDisable] = useState<btnStatueProp>({ prevBtn: false, nextBtn: false })

  /**
   * 初始化数据
   */
  useEffect(() => {
    initBlogPageList()
  }, [])

  /**
   * init data
   */
  const initBlogPageList = async () => {
    const req = {
      currentPageNum: pagination.currentPageNum,
      pageSize: pagination.pageSize
    }
    const blogPageList = await frontContentPageList({ ...req })
    setContents(blogPageList)

    // set 图片轮播内容
    const imageUrls: imageUrlProp[] = blogPageList.list
      .filter(item => item.image?.url)
      .map(({ image }) => ({
        url: image.url
      }))
    setImages(imageUrls)

    const totalPage = calculateTotalPages(blogPageList.total, pagination.pageSize)
    setPagination({ ...req, total: blogPageList.total, totalPage })

    const newState = { ...btnDisable }
    if (pagination.currentPageNum <= 1) {
      newState.prevBtn = true
    } else {
      newState.prevBtn = false
    }

    if (pagination.currentPageNum === totalPage) {
      newState.nextBtn = true
    } else {
      newState.nextBtn = false
    }
    setBtnDisable({ ...newState })
  }

  /**
   * fetch content data list
   * @param req
   * @returns
   */
  const frontContentPageList = async (req: BlogContentReq): Promise<PageResult<BlogItemsType>> => {
    const contentPageList = await blogContentApi.frontContentPageList({ ...req })
    const { code, data } = contentPageList
    if (code !== 200) {
      return {} as PageResult<BlogItemsType>
    }

    const blogPageList = data.list.map(({ surrogateId, title, imgUrl, labels, publishTime, ...rest }) => ({
      key: surrogateId,
      image: {
        alt: '',
        url: env.VITE_BACKEND_IMAGE_BASE_API + imgUrl
      },
      tags: labels,
      blogTitle: title,
      publishTime: transformToDay(publishTime),
      backendApi: `${baseUrl}/blog/${surrogateId}`,
      ...rest
    }))

    const res: PageResult<BlogItemsType> = {
      list: blogPageList,
      total: data.total
    }
    return res
  }

  const pageChange = async (currentPageNum: number, pageSize: number) => {
    setPagination({ ...pagination, currentPageNum, pageSize })
    const resData = await frontContentPageList({ keyWords: '', currentPageNum, pageSize })
    setContents(resData)
  }

  const calculateTotalPages = (totalItems: number, itemsPerPage: number): number => {
    return Math.ceil(totalItems / itemsPerPage)
  }

  /**
   * change page number
   * @param currentPageNum
   * @param pageSize
   */
  const handlePageChange = async (currentPageNum: number, pageSize: number) => {
    if (currentPageNum <= 1) {
      setBtnDisable({ prevBtn: true, nextBtn: false })
    } else {
      setBtnDisable({ ...btnDisable, prevBtn: false })
    }

    if (currentPageNum >= pagination.totalPage) {
      setBtnDisable({ prevBtn: false, nextBtn: true })
    }

    setPagination({ ...pagination, currentPageNum, pageSize })
    const resData = await frontContentPageList({ keyWords: '', currentPageNum, pageSize })
    setContents(resData)
  }

  return (
    <>
      <motion.div
        className='flex flex-col w-full gap-y-4'
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}
      >
        <div className='flex w-full'>{images.length > 0 && <CarouselBase images={images} />}</div>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2'>
          {contents?.list.map((blogItem, index) => (
            <CardBlogListItem key={index} blogItem={blogItem} />
          ))}
        </div>
        <div className='flex justify-center pt-6'>
          <PaginationBase
            pagination={pagination}
            btnDisable={btnDisable}
            setBtnDisable={setBtnDisable}
            pageChange={(currentPageNum: number, pageSize: number) => pageChange(currentPageNum, pageSize)}
          />
        </div>
      </motion.div>
    </>
  )
}

export default Home
