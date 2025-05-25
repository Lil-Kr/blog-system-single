import { useEffect, useState } from 'react'
import { useParams } from 'oh-router-react'
import { CardBlogItem } from '@/components/card'
import { CardBaseDataType } from '@/types/components/CardType'
import SvgIcon from '@/components/svg/SvgIcon'
import { blogContentApi } from '@/apis/contentApi'
import { getFontRandomColorClass } from '@/utils/colors'
import { transformToDay } from '@/utils/date/dateTimeUtil'
import { addCopyButtons } from '../../components/blog/addCopyButtons'
import CardDirectory from './CardDirectory'
import AnchorPoint from './AnchorPoint'
import { CardBlogItemProps, BlogContentGetReq, BlogContentVO } from '@/types/apis/blog/blogTypes'
import { useTranslation } from 'react-i18next'

// blog code segmentation
import Prism from 'prismjs'
import '@/utils/prism/prism-langs'
import './styles/blog-content.scss'

const BlogDetails = () => {
  const { blogId } = useParams()
  const { t } = useTranslation()
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

    const blogContent = mappingContent(data)
    setContent(blogContent)
  }

  const mappingContent = (data: BlogContentVO): CardBlogItemProps => {
    const cardBlogItem: CardBlogItemProps = {
      ...data,
      publishTime: transformToDay(data.publishTime),
      updateTime: transformToDay(data.updateTime),
      tags: data.labels?.map(({ surrogateId, name }) => ({
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
    headTitle: <div className='text-stone-600 dark:text-stone-300 font-bold'>{t('blogcontent.paragraph')}</div>,
    content: <AnchorPoint paragraph={content.paragraph} />
  }

  return (
    <>
      <div className='w-10/12 2xl:w-10/12 xl:w-full lg:w-full md:w-10/12 sm:w-10/12 gap-y-4'>
        <CardBlogItem content={content} />
      </div>
      <div className='hidden 2xl:flex flex-col w-4/12 gap-y-4'>
        {/* 文章目录 */}
        <CardDirectory cardItem={cardItem} />
      </div>
    </>
  )
}

export default BlogDetails
