import React, { useEffect, useState } from 'react'
import { useParams } from 'oh-router-react'
import { CardBlogItem, CardSimple } from '@/components/card'
import { CardBaseDataType } from '@/types/components/CardType'
import SvgIcon from '@/components/svg/SvgIcon'
import { AnchorPointBase } from '@/components/anchor'
import { BlogContentGetReq, BlogContentVO } from '@/apis/contentApi'
import { blogContentApi } from '@/apis/contentApi'
import { CardBlogItemProps } from '@/components/card/CardBlogItem'
import { getFontRandomColorClass } from '@/utils/colors'
import { formatDate } from '@/utils/date/dateTimeUtil'
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { Button } from '@heroui/react'
import { addCopyButtons } from './addCopyButtons'

// blog code segmentation
import '@/utils/prism/prism-langs'
import './styles/blog-content.scss'
import Prism from 'prismjs'

const cardItem: CardBaseDataType = {
  key: '1',
  svgIcon: <SvgIcon name='catalog-2' />,
  headTitle: '文章目录',
  content: <AnchorPointBase />
}

const BlogDetails = () => {
  const { blogId } = useParams()
  const [contents, setContents] = useState<CardBlogItemProps>({} as CardBlogItemProps)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (blogId && blogId !== '') {
      const fetchBlogDetail = async () => {
        const blogDetail = await getBlogDetail({ surrogateId: blogId })
        setContents(mappingContent(blogDetail))
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

  const getBlogDetail = async (req: BlogContentGetReq): Promise<BlogContentVO> => {
    const blogDetail = await blogContentApi.frontGetBlog({ ...req })
    const { code, data } = blogDetail
    if (code !== 200) {
      return {} as BlogContentVO
    }
    return data
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
      tags: req.labels?.map(({ surrogateId, name }) => ({
        key: surrogateId,
        text: name,
        url: '',
        textColor: getFontRandomColorClass()
      }))
    }
    return cardBlogItem
  }

  return (
    <>
      <div className='col-span-3 flex flex-col gap-y-4'>
        {/* 文章目录 */}
        <CardSimple cardItem={cardItem} />
      </div>
      <div className='col-span-9'>
        <CardBlogItem content={contents} />
      </div>
    </>
  )
}

export default BlogDetails
