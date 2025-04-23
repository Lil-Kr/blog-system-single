import React, { useEffect, useState } from 'react'
import { useParams } from 'oh-router-react'
import { CardBlogItem, CardSimple } from '@/components/card'
import { CardBaseDataType } from '@/types/components/CardType'
import SvgIcon from '@/components/svg/SvgIcon'
import { AnchorPointBase } from '@/components/anchor'
import { BlogContentGetReq, BlogContentVO } from '@/apis/contentApi'
import { blogContentApi } from '@/apis/contentApi'
import { CardBlogItemProps } from '@/pages/blog/CardBlogItem'
import { getFontRandomColorClass } from '@/utils/colors'
import { formatDate } from '@/utils/date/dateTimeUtil'
import { addCopyButtons } from './addCopyButtons'

// blog code segmentation
import '@/utils/prism/prism-langs'
import './styles/blog-content.scss'
import Prism from 'prismjs'
import CardDirectory from './CardDirectory'

const BlogDetails = () => {
  const { blogId } = useParams()
  const [contents, setContents] = useState<CardBlogItemProps>({} as CardBlogItemProps)

  useEffect(() => {
    if (blogId && blogId !== '') {
      const fetchBlogDetail = async () => {
        // 查询博客详情
        await getBlogDetail({ surrogateId: blogId })
      }
      fetchBlogDetail()
    }
  }, [blogId])

  useEffect(() => {
    // 在 contents 更新后调用 Prism.highlightAll()
    if (contents.contentText) {
      Prism.highlightAll()
      addCopyButtons()
    }
  }, [contents])

  const getBlogDetail = async (req: BlogContentGetReq) => {
    const blogDetail = await blogContentApi.frontGetBlog({ ...req })
    const { code, data } = blogDetail
    if (code !== 200) {
      return {} as BlogContentVO
    }
    setContents(mappingContent(data))
  }

  const mappingContent = (req: BlogContentVO): CardBlogItemProps => {
    const cardBlogItem: CardBlogItemProps = {
      surrogateId: req.surrogateId,
      title: req.title,
      original: req.original,
      recommend: req.recommend,
      introduction: req.introduction,
      publishTime: formatDate(req.publishTime),
      updateTime: formatDate(req.updateTime),
      contentText: req.contentText,
      paragraph: req.paragraph,
      tags: req.labels?.map(({ surrogateId, name }) => ({
        key: surrogateId,
        text: name,
        url: '',
        textColor: getFontRandomColorClass()
      }))
    }
    return cardBlogItem
  }

  const cardItem: CardBaseDataType = {
    key: '1',
    svgIcon: <SvgIcon name='catalog-2' />,
    headTitle: <div className='text-stone-600 dark:text-stone-300 font-bold'>{'文章目录'}</div>,
    content: <AnchorPointBase paragraph={contents.paragraph} />
  }

  return (
    <>
      <div className='col-span-2 flex flex-col gap-y-4 sticky top-16'>
        {/* 文章目录 */}
        <CardDirectory cardItem={cardItem} />
      </div>
      <div className='col-span-8'>
        <CardBlogItem content={contents} />
      </div>
    </>
  )
}

export default BlogDetails
