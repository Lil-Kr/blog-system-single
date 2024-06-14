import { BlogItemsType } from '@/types/blog'
import { Card, Image, Link } from '@nextui-org/react'
import React from 'react'
import SvgIcon from '../svg/SvgIcon'

// const blogItem: BlogItemsType = {
//   key: 1,
//   image: {
//     alt: 'test image',
//     url: 'http://localhost:8089/upload/image/Jay1_20240422212922.png'
//   },
//   tags: ['Java后台开发', '微服务', 'TS'],
//   blogTitle: 'React8 hook 学习经验分享',
//   publishDate: '2022-02-22'
// }

/**
 * List item display component
 * @returns
 */
const ListItemBase = (props: { blogItem: BlogItemsType }) => {
  const { blogItem } = props
  return (
    <Card
      className='flex flex-row w-full gap-x-4 rounded-sm hover:border-1 hover:border-primary hover:transition-all hover:ease hover:duration-500 hover:translate-x-2'
      radius='md'
      shadow='none'
    >
      <div className='flex'>
        <Image
          className='object-cover rounded-none'
          // isZoomed={true}
          // shadow='sm'
          radius='none'
          width={200}
          height={200}
          src={blogItem.image.url}
        />
      </div>
      <div className='flex flex-col justify-center gap-y-2'>
        <Link className='blog-title text-lg text-stone-700 font-bold' underline='hover' isExternal={true} href='#'>
          {'React8 hook 学习经验分享'}
        </Link>
        <div className='flex flex-row blog-tags px-1 py-1 gap-x-2 text-start'>
          {blogItem.tags.map((tag, index) => (
            <div key={index} className='flex flex-col gap-y-1'>
              <Link className='text-sm font-bold text-violet-700' href='#' underline='hover' isExternal={true}>
                {tag.name}
              </Link>
            </div>
          ))}
        </div>
        <div className='blog-info flex flex-row gap-x-4 text-md font-bold text-zinc-500'>
          <div className='flex flex-row gap-x-1'>
            <SvgIcon name='author-2' />
            <span>{'张三'}</span>
          </div>
          <div className='flex flex-row gap-x-1'>
            <SvgIcon name='date-solid' />
            <span>2022-02-22</span>
          </div>
          <div className='flex flex-row gap-x-1'>
            <SvgIcon name='folder-2' />
            <span>技术</span>
          </div>
          <div className='flex flex-row gap-x-1'>
            <SvgIcon name='look-1' />
            <span>{'12'}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ListItemBase
