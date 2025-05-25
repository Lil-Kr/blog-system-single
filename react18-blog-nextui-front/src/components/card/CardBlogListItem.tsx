import { Card, Image, Link } from '@heroui/react'
import { BlogItemsType } from '@/types/blog'
import { useNavigate } from 'oh-router-react'

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
        {/* <div className='flex flex-row blog-tags px-1 py-1 gap-x-2'>
          {(blogItem.tags || []).map((tag, index) => (
            <div key={index} className='flex flex-col gap-y-1'>
              <Link className='text-sm font-bold text-violet-700' href='#' underline='hover' isExternal={true}>
                {tag.name}
              </Link>
            </div>
          ))}
        </div> */}
        <div key={blogItem.key} className='blog-title flex px-1 py-1'>
          <Link
            className='text-lg sm:text-sm md:text-md lg:text-md 2xl:text-lg text-stone-700 dark:text-purple-400 font-bold'
            underline='hover'
            href={blogItem.backendApi}
          >
            {blogItem.blogTitle}
          </Link>
        </div>
        <Link className='blog-publish-date flex px-1 py-1 text-md font-bold text-zinc-400' underline='hover'>
          {blogItem.publishTime}
        </Link>
      </div>
    </Card>
  )
}

export default CardBlogListItem
