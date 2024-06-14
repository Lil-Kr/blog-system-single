import { LinkBaseType } from '@/types/components/LinkType'
import { Card, Divider } from '@nextui-org/react'
import { LinkBase } from '../link'
import SvgIcon from '../svg/SvgIcon'

export type CardBlogItemProps = {
  surrogateId: string
  title: string
  original: number
  recommend: number
  introduction: string
  publishTime: string
  updateTime: string
  contentText: string
  tags: LinkBaseType[]
}

const CardBlogItem = (props: { content: CardBlogItemProps }) => {
  const { content } = props
  const htmlContent = `<h2 class="custom-h2">不不不</h2>`

  return (
    <Card key={1} className='flex flex-col gap-y-6 p-4' radius='sm' fullWidth={true}>
      <div className='blog-info flex flex-col gap-y-3'>
        <div className='blog-tags flex flex-row gap-x-2'>
          {content.tags?.map((item, index) => (
            <LinkBase key={index} item={item} />
          ))}
        </div>
        <h1 className='blog-title text-3xl font-bold mt-2'>{content.title}</h1>
        <div className='blog-views flex flex-row gap-x-4'>
          <div className='flex flex-row text-sm gap-x-[2px]'>
            <SvgIcon name='user-1' style={'w-5 h-5'} />
            <span>{'Lil-K'}</span>
          </div>
          <div className='flex flex-row text-sm gap-x-[2px]'>
            <SvgIcon name='calendar-work-1' style={'w-5 h-5'} />
            <span>{content.publishTime}</span>
          </div>
          <div className='flex flex-row text-sm gap-x-[2px]'>
            <SvgIcon name='pencil-square-2' style={'w-5 h-5'} />
            <span>{content.updateTime}</span>
          </div>
          <div className='flex flex-row text-sm gap-x-[2px]'>
            <SvgIcon name='eye-1' style={'w-5 h-5'} />
            <span>{'21'}</span>
          </div>
        </div>
      </div>
      <Divider className='h-[2px]' />
      {/* <div className='blog-article flex flex-col'>
      </div> */}
      <p dangerouslySetInnerHTML={{ __html: `${content.contentText}` }} />

      {/* <p dangerouslySetInnerHTML={{ __html: `<h2>我就是我</h2><p>这是内容。</p>` }} /> */}
    </Card>
  )
}

export default CardBlogItem
