import { Card, Divider, Skeleton } from '@heroui/react'
import { LinkBase } from '../../components/link'
import SvgIcon from '../../components/svg/SvgIcon'
import { useTheme } from 'next-themes'
import { CardBlogItemProps } from '@/types/apis/blog/blogTypes'
import { baseUrl } from '@/constant'
import { useTranslation } from 'react-i18next'

const CardBlogItem = (props: { content: CardBlogItemProps }) => {
  const { content } = props
  const { theme } = useTheme()
  const { t } = useTranslation()

  return (
    <div className='blog-content-wrapper flex flex-col gap-y-2'>
      {content.contentText ? (
        <div>
          <Card key={1} className='flex flex-col gap-y-6 p-4' radius='sm' fullWidth={true}>
            <div className='blog-info flex flex-col gap-y-2'>
              <div className='blog-tags flex flex-row gap-x-2'>
                {content.tags?.map((item, index) => (
                  <LinkBase key={index} item={item} />
                ))}
              </div>
              <div className='blog-title text-3xl font-bold mt-2 mb-2'>{content.title}</div>
              <div className='blog-views flex flex-row gap-x-2 text-gray-600 dark:text-gray-300'>
                <div className='flex flex-row text-sm gap-x-[0.2em]'>
                  <SvgIcon name='user-1' style={'w-5 h-5'} />
                  <span>{'Lil-K'}</span>
                </div>
                {/* publish time */}
                <div className='flex flex-row text-sm gap-x-[0.2em]'>
                  <SvgIcon name='calendar-work-1' style={'w-5 h-5'} />
                  <span>{content.publishTime}</span>
                </div>
                {/* last edit time */}
                <div className='flex flex-row text-sm gap-x-[0.2em]'>
                  <SvgIcon name='pencil-square-2' style={'w-5 h-5'} />
                  <span>{content.updateTime}</span>
                </div>
                <div className='flex flex-row text-sm gap-x-[0.2em]'>
                  <SvgIcon name='eye-1' style={'w-5 h-5'} />
                  <span>{'20'}</span>
                </div>
              </div>
            </div>
            <Divider className='h-[0.2em]' />
            {/* 显示内容 */}
            <div className={`blog-content-wrapper code-block-wrapper relative ${theme}`}>
              {content.contentText && <div dangerouslySetInnerHTML={{ __html: `${content.contentText}` }} />}
            </div>
          </Card>
          {/* post page,  next page */}
          <div className='flex justify-between items-center w-full mt-2 gap-4'>
            {content.prev?.surrogateId ? (
              <a
                className={`group flex items-center px-4 py-3 rounded-lg transition-all duration-300
                ${'bg-gray-100 hover:bg-primary-50 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer'} border border-gray-200 dark:border-gray-700`}
                href={content.prev?.surrogateId ? `${baseUrl}/blog/${content.prev.surrogateId}` : '#'}
              >
                <div className='flex flex-col items-start'>
                  <div className='flex flex-row items-start'>
                    <SvgIcon
                      name='arrow-left'
                      style={
                        'w-5 h-5 mr-3 text-fontColor dark:text-fontColor group-hover:text-fontColor transition-transform duration-300 group-hover:translate-x-[-0.5em]'
                      }
                    />
                    <span className='text-sm text-fontColor dark:text-fontColor group-hover:text-fontColor'>
                      {t('blogcontent.prev')}
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-fontColor dark:text-fontColor font-medium mt-1 line-clamp-1 group-hover:text-fontColor'>
                      {content.prev?.title}
                    </span>
                  </div>
                </div>
              </a>
            ) : (
              <></>
            )}
            {content.next?.surrogateId ? (
              <a
                className={`group flex items-center justify-end px-6 py-3 rounded-lg transition-all duration-300
                ${'bg-gray-100 hover:bg-primary-50 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer'} border border-gray-200 dark:border-gray-700`}
                href={content.next?.surrogateId ? `${baseUrl}/blog/${content.next.surrogateId}` : '#'}
              >
                <div className='flex flex-col items-end'>
                  <div className='flex flex-row items-end'>
                    <span className='text-sm text-fontColor dark:text-fontColor group-hover:text-fontColor'>
                      {t('blogcontent.next')}
                    </span>
                    <SvgIcon
                      name='arrow-right'
                      style={
                        'w-5 h-5 ml-3 text-fontColor dark:text-fontColor group-hover:text-fontColor transition-transform duration-300 group-hover:translate-x-[0.5em]'
                      }
                    />
                  </div>
                  <span className='flex flex-nowrap text-fontColor dark:text-fontColor font-medium mt-1 line-clamp-1 group-hover:text-fontColor'>
                    {content.next?.title}
                  </span>
                </div>
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <Card key={1} className='flex flex-col gap-y-6 p-4' radius='sm' fullWidth={true}>
          <Skeleton className='blog-info flex flex-col gap-y-2'>
            <div className='blog-tags flex flex-row gap-x-2'></div>
          </Skeleton>
          <Skeleton className='blog-title text-3xl font-bold mt-2 mb-2'>{content.title}</Skeleton>
          <Skeleton className='blog-views flex flex-row gap-x-2 text-gray-600 dark:text-gray-300'>
            <Skeleton className='flex flex-row text-sm gap-x-[0.2em]'>
              <SvgIcon name='user-1' style={'w-5 h-5'} />
              <span>{'Lil-K'}</span>
            </Skeleton>
            {/* publish time */}
            <Skeleton className='flex flex-row text-sm gap-x-[0.2em]'>
              <SvgIcon name='calendar-work-1' style={'w-5 h-5'} />
              <span>{content.publishTime}</span>
            </Skeleton>
            {/* last edit time */}
            <Skeleton className='flex flex-row text-sm gap-x-[0.2em]'>
              <SvgIcon name='pencil-square-2' style={'w-5 h-5'} />
              <span>{content.updateTime}</span>
            </Skeleton>
            <Skeleton className='flex flex-row text-sm gap-x-[0.2em]'>
              <SvgIcon name='eye-1' style={'w-5 h-5'} />
              <span>{'20'}</span>
            </Skeleton>
          </Skeleton>
        </Card>
      )}
    </div>
  )
}

export default CardBlogItem
