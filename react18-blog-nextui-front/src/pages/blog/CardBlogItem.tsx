import { LinkBaseType } from '@/types/components/LinkType'
import { Card, Divider } from '@heroui/react'
import { LinkBase } from '../../components/link'
import SvgIcon from '../../components/svg/SvgIcon'
import { useTheme } from 'next-themes'

export type CardBlogItemProps = {
  surrogateId: string
  title: string
  original: number
  recommend: number
  introduction: string
  publishTime: string
  updateTime: string
  contentText: string
  paragraph: string
  tags: LinkBaseType[]
}

const CardBlogItem = (props: { content: CardBlogItemProps }) => {
  const { content } = props
  const { theme } = useTheme()

  return (
    <Card key={1} className='flex flex-col gap-y-6 p-4' radius='sm' fullWidth={true}>
      <div className='blog-info flex flex-col gap-y-2'>
        <div className='blog-tags flex flex-row gap-x-2'>
          {content.tags?.map((item, index) => (
            <LinkBase key={index} item={item} />
          ))}
        </div>
        <h1 className='blog-title text-3xl font-bold mt-2'>{content.title}</h1>
        <div className='blog-views flex flex-row gap-x-2 text-gray-600 dark:text-gray-300'>
          <div className='flex flex-row text-sm gap-x-[0.2em]'>
            <SvgIcon name='user-1' style={'w-5 h-5'} />
            <span>{'Lil-K'}</span>
          </div>
          <div className='flex flex-row text-sm gap-x-[0.2em]'>
            <SvgIcon name='calendar-work-1' style={'w-5 h-5'} />
            <span>{content.publishTime}</span>
          </div>
          <div className='flex flex-row text-sm gap-x-[0.2em]'>
            <SvgIcon name='pencil-square-2' style={'w-5 h-5'} />
            <span>{content.publishTime}</span>
          </div>
          <div className='flex flex-row text-sm gap-x-[0.2em]'>
            <SvgIcon name='eye-1' style={'w-5 h-5'} />
            <span>{'20'}</span>
          </div>
        </div>
        {/* <div className='blog-views flex flex-row gap-x-2 text-gray-600 dark:text-gray-300'>
          <div className='flex flex-row text-sm gap-x-[0.2em]'>
            <SvgIcon name='tag-2' style={'w-5 h-5'} />
            <span>{content.updateTime}</span>
          </div>
        </div> */}
      </div>
      <Divider className='h-[0.2em]' />
      {/* 显示内容 */}
      <div className={`blog-content-wrapper code-block-wrapper relative ${theme}`}>
        <div dangerouslySetInnerHTML={{ __html: `${content.contentText}` }} />
      </div>
    </Card>
  )
}

export default CardBlogItem
