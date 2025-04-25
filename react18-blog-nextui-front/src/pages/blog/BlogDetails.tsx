import { useEffect, useState } from 'react'
import { useParams } from 'oh-router-react'
import { CardBlogItem } from '@/components/card'
import { CardBaseDataType } from '@/types/components/CardType'
import SvgIcon from '@/components/svg/SvgIcon'
import { BlogContentGetReq, BlogContentVO } from '@/apis/contentApi'
import { blogContentApi } from '@/apis/contentApi'
import { CardBlogItemProps } from '@/pages/blog/CardBlogItem'
import { getFontRandomColorClass } from '@/utils/colors'
import { formatDate, transformToDay } from '@/utils/date/dateTimeUtil'
import { addCopyButtons } from '../../components/blog/addCopyButtons'
import CardDirectory from './CardDirectory'
import AnchorPoint from './AnchorPoint'

// blog code segmentation
import '@/utils/prism/prism-langs'
import './styles/blog-content.scss'
import Prism from 'prismjs'

const BlogDetails = () => {
  const { blogId } = useParams()
  const [content, setContent] = useState<CardBlogItemProps>({} as CardBlogItemProps)

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
    if (content.contentText) {
      Prism.highlightAll()
      addCopyButtons()
    }
  }, [content])

  const getBlogDetail = async (req: BlogContentGetReq) => {
    const blogDetail = await blogContentApi.frontGetBlog({ ...req })
    const { code, data } = blogDetail
    if (code !== 200) {
      return {} as BlogContentVO
    }
    const mapping = mappingContent(data)
    setContent(mapping)
  }

  const mappingContent = (req: BlogContentVO): CardBlogItemProps => {
    const cardBlogItem: CardBlogItemProps = {
      surrogateId: req.surrogateId,
      title: req.title,
      original: req.original,
      recommend: req.recommend,
      introduction: req.introduction,
      publishTime: transformToDay(req.publishTime),
      updateTime: req.updateTime,
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
    content: <AnchorPoint paragraph={content.paragraph} />
  }

  return (
    <>
      <div className='col-span-2 hidden lg:flex flex-col gap-y-4 '>
        {/* 文章目录 */}
        <CardDirectory cardItem={cardItem} />
      </div>
      <div className='col-span-12 gap-y-4 lg:col-span-8'>
        <CardBlogItem content={content} />
      </div>
    </>
  )
}

export default BlogDetails
