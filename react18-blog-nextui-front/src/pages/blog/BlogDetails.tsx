import React, { useEffect, useState } from 'react'
import { useParams } from 'oh-router-react'
import { CardBlogItem, CardBlogListItem, CardSimple } from '@/components/card'
import { CardBaseDataType } from '@/types/components/CardType'
import SvgIcon from '@/components/svg/SvgIcon'
import { AnchorPointBase } from '@/components/anchor'
import { BlogContentGetReqParams, BlogContentVO } from '@/apis/contentApi'
import { blogContentApi } from '@/apis/contentApi'
import { CardBlogItemProps } from '@/components/card/CardBlogItem'
import { getFontRandomColorClass } from '@/utils/colors'
import { formatDate } from '@/utils/date/dateTimeUtil'

const cardItem: CardBaseDataType = {
  key: '1',
  svgIcon: <SvgIcon name='catalog-2' />,
  headTitle: '文章目录',
  content: <AnchorPointBase />
}

const BlogDetails = () => {
  const { blogId } = useParams()
  const [contents, setContents] = useState<CardBlogItemProps>({} as CardBlogItemProps)

  useEffect(() => {
    if (blogId) {
      const fetchBlogDetail = async () => {
        const blogDetail = await getBlogDetail({ surrogateId: blogId })
        setContents(mappingContent(blogDetail))
      }
      fetchBlogDetail()
    }
  }, [])

  const getBlogDetail = async (params: BlogContentGetReqParams): Promise<BlogContentVO> => {
    const blogDetail = await blogContentApi.frontGet({ ...params })
    const { code, data } = blogDetail
    if (code !== 200) {
      return {} as BlogContentVO
    }
    return data
  }

  const mappingContent = (params: BlogContentVO): CardBlogItemProps => {
    const cardBlogItem: CardBlogItemProps = {
      surrogateId: params.surrogateId,
      title: params.title,
      original: params.original,
      recommend: params.recommend,
      introduction: params.introduction,
      publishTime: formatDate(params.publishTime),
      updateTime: formatDate(params.updateTime),
      contentText: params.contentText,
      tags: params.labels?.map(({ surrogateId, name }) => ({
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
