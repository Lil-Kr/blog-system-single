import { Card, Image, Link } from '@nextui-org/react'
import { BlogItemsType } from '@/types/blog'
import { useNavigate } from 'oh-router-react'
import { baseUrl } from '@/constant'

const CardBlogListItem = (props: { blogItem: BlogItemsType }) => {
  const { blogItem } = props
  const navigateTo = useNavigate()
  return (
    <Card
      key={blogItem.key}
      className='flex flex-col gap-y-2'
      shadow='sm'
      radius='sm'
      fullWidth={true}
      isPressable={true}
      onPress={() => navigateTo(blogItem.backendApi ?? '')}
    >
      <a href={blogItem.backendApi} className='flex px-1 py-1'>
        <Image
          loading={'lazy'}
          isZoomed
          className='w-full aspect-[4/3]'
          alt={blogItem.image.alt}
          src={blogItem.image.url}
        />
      </a>
      <div className='flex flex-col'>
        <div className='flex flex-row blog-tags px-1 py-1 gap-x-2'>
          {(blogItem.tags || []).map((tag, index) => (
            <div key={index} className='flex flex-col gap-y-1'>
              <Link className='text-sm font-bold text-violet-700' href='#' underline='hover' isExternal={true}>
                {tag.name}
              </Link>
            </div>
          ))}
        </div>
        <div key={blogItem.key} className='blog-title flex px-1 py-1'>
          <Link className='text-lg text-stone-700 font-bold' underline='hover' href={blogItem.backendApi}>
            {blogItem.blogTitle}
          </Link>
        </div>
        <div className='blog-publish-date flex px-1 py-1 text-md font-bold text-zinc-400'>{blogItem.publishTime}</div>
      </div>
    </Card>
  )
}

export default CardBlogListItem
