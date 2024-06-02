import React from 'react'
import { useParams } from 'oh-router-react'
import { CardBlogItem, CardBlogListItem, CardSimple } from '@/components/card'
import { CardBaseDataType } from '@/types/components/CardType'
import SvgIcon from '@/components/svg/SvgIcon'
import { AnchorPointBase } from '@/components/anchor'

const cardItem: CardBaseDataType = {
  key: '1',
  svgIcon: <SvgIcon name='catalog-2' />,
  headTitle: '文章目录',
  content: <AnchorPointBase />
}

const BlogDetails = () => {
  const { blogId } = useParams()
  console.log(blogId)
  return (
    <>
      <div className='col-span-3 flex flex-col gap-y-4'>
        {/* 文章目录 */}
        <CardSimple cardItem={cardItem} />
      </div>
      <div className='col-span-9'>
        <CardBlogItem />
      </div>
    </>
  )
}

export default BlogDetails
