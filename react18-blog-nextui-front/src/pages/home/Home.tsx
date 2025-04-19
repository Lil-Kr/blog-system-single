import React, { useEffect, useState } from 'react'
import { CardBlogListItem } from '@/components/card'
import { BlogItemsType } from '@/types/blog'
import { PaginationBase } from '@/components/pagination'
import { CarouselBase } from '@/components/imageCarousel'
import { baseUrl } from '@/constant'
import { blogContentApi, BlogContentReqParams } from '@/apis/contentApi'
import { PageResult, PaginationType } from '@/types/base/response'
const env = import.meta.env

// todo: need change to from DB
const images = [
  { url: env.VITE_BACKEND_IMAGE_BASE_API + '/upload/image/Jay1_20240422212922_1911784719964573696.webp' },
  { url: env.VITE_BACKEND_IMAGE_BASE_API + '/upload/image/寻找周杰伦_109951165564941972_1894396427136798720.webp' },
  { url: env.VITE_BACKEND_IMAGE_BASE_API + '/upload/image/最伟大的作品_109951167891239729_1894400569746001920.webp' },
  { url: env.VITE_BACKEND_IMAGE_BASE_API + '/upload/image/微信图片_202404241849052_1894389626563596288.webp' }
]

export type btnStatueProp = {
  prevBtn: boolean
  nextBtn: boolean
}

const Home = () => {
  const [contents, setContents] = useState<PageResult<BlogItemsType>>()
  const [pagination, setPagination] = useState<PaginationType>({
    currentPageNum: 1,
    pageSize: 9,
    total: 0,
    totalPage: 0
  })
  const [btnDisable, setBtnDisable] = useState<btnStatueProp>({ prevBtn: false, nextBtn: false })

  /**
   * 初始化数据
   */
  useEffect(() => {
    initContentPageList()
  }, [])

  /**
   * init data
   */
  const initContentPageList = async () => {
    const param = {
      keyWords: '',
      currentPageNum: pagination.currentPageNum,
      pageSize: pagination.pageSize
    }
    const resData = await frontContentPageList({ ...param })
    setContents(resData)

    const totalPage = calculateTotalPages(resData.total, pagination.pageSize)
    setPagination({ ...param, total: resData.total, totalPage })

    let newState = { ...btnDisable }
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
   * @param params
   * @returns
   */
  const frontContentPageList = async (params: BlogContentReqParams): Promise<PageResult<BlogItemsType>> => {
    const contentPageList = await blogContentApi.frontContentPageList({ ...params })
    const { code, data, msg } = contentPageList
    if (code !== 200) {
      return {} as PageResult<BlogItemsType>
    }

    const contentPageData = data.list.map(
      ({ id, surrogateId, number, title, original, recommend, imgUrl, labels, publishTime }) => ({
        key: surrogateId,
        image: {
          alt: '',
          url: env.VITE_BACKEND_IMAGE_BASE_API + imgUrl
        },
        tags: labels,
        blogTitle: title,
        publishTime,
        backendApi: `${baseUrl}/blog/${surrogateId}`
      })
    )

    const resData: PageResult<BlogItemsType> = {
      list: contentPageData,
      total: data.total
    }
    return resData
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
      {/* 右侧主体内容 */}
      <div className='flex flex-col w-full gap-y-4'>
        <div className='flex w-full'>
          <CarouselBase images={images} />
        </div>
        <div className='grid grid-cols-4 gap-2'>
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
      </div>
    </>
  )
}

export default Home
