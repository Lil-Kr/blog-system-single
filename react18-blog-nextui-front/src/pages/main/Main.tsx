import { useEffect, useState } from 'react'
import { CardSimple } from '@/components/card'
import CardMe from '@/components/card/CardMe'
import { CardBaseDataType } from '@/types/components/CardType'
import SvgIcon from '@/components/svg/SvgIcon'
import { ListBoxBase } from '@/components/list'
import { LinkArchiveType, LinkBaseType } from '@/types/components/LinkType'
import { ListBoxItemType } from '@/types/components/ListBoxType'
import { Outlet } from 'oh-router-react'
import categoryApi from '@/apis/categoryApi'
import labelApi from '@/apis/labelApi'
import { blogContentApi } from '@/apis/contentApi'
import { baseUrl } from '@/constant'
import { getFontRandomColorClass } from '@/utils/colors'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import MusicPlayer from '@/components/musicplayer/MusicPlayer'
import StickyMusicPlayer from '@/components/musicplayer/StickyMusicPlayer'

// const newBlogs: ListBoxItemType[] = [
//   { text: '聊一聊微服务架构与k8s的优劣势', url: '#' },
//   {
//     text: 'Java21的新特性有哪些?Java21的新特性有哪些?Java21的新特性有哪些?Java21的新特性有哪些?Java21的新特性有哪些?',
//     url: '#'
//   },
//   { text: 'Java21的新特性有哪些?', url: '#' },
//   { text: 'Java21的新特性有哪些?', url: '#' },
//   { text: 'Java21的新特性有哪些?', url: '#' },
//   { text: 'Java21的新特性有哪些?', url: '#' }
// ]

// const tags: LinkBaseType[] = [
//   {
//     key: 1,
//     text: 'SpringBoot',
//     textColor: 'text-yellow-500',
//     url: '#',
//     extend: <div>{'3'}</div>
//   },
//   {
//     key: 2,
//     text: 'SpringCloud',
//     textColor: 'text-sky-500',
//     url: '#',
//     extend: <div>{'4'}</div>
//   },
//   {
//     key: 3,
//     text: 'Linux',
//     textColor: 'text-purple-400',
//     url: '#',
//     extend: <div>{'4'}</div>
//   },
//   {
//     key: 4,
//     text: 'Windows',
//     textColor: 'text-gray-400',
//     url: '#',
//     extend: <div>{'4'}</div>
//   },
//   {
//     key: 5,
//     text: 'Java',
//     textColor: 'text-cyan-400',
//     url: '#',
//     extend: <div>{'4'}</div>
//   },
//   {
//     key: 6,
//     text: '前端',
//     textColor: 'text-blue-400',
//     url: '#',
//     extend: <div>{'4'}</div>
//   },
//   {
//     key: 7,
//     text: '编译原理',
//     textColor: 'text-pink-400',
//     url: '#',
//     extend: <div>{'12'}</div>
//   }
// ]

// const categorys: ListBoxItemType[] = [
//   { text: 'Java后端', url: '/category/java', extend: { node: <div>{'1'}</div> } },
//   { text: 'ReactJS', url: '#', extend: { node: <div>{'3'}</div> } },
//   { text: '操作系统', url: '#', extend: { node: <div>{'4'}</div> } }
// ]

// const archives: LinkArchiveType[] = [
//   {
//     key: 1,
//     url: '#',
//     date: 'Dec 21th 2021',
//     depict: '9 篇文章'
//   },
//   {
//     key: 2,
//     url: '#',
//     date: 'Dec 21th 2021',
//     depict: '9 篇文章'
//   },
//   {
//     key: 3,
//     url: '#',
//     date: 'Dec 21th 2021',
//     depict: '9 篇文章'
//   },
//   {
//     key: 4,
//     url: '#',
//     date: 'Dec 21th 2021',
//     depict: '9 篇文章'
//   },
//   {
//     key: 5,
//     url: '#',
//     date: 'Dec 21th 2021',
//     depict: '9 篇文章'
//   },
//   {
//     key: 6,
//     url: '#',
//     date: 'Dec 21th 2021',
//     depict: '9 篇文章'
//   },
//   {
//     key: 7,
//     url: '#',
//     date: 'Dec 21th 2021',
//     depict: '9 篇文章'
//   }
// ]

const Main = () => {
  const [categorys, setCategory] = useState<ListBoxItemType[]>([])
  const [labels, setLabel] = useState<LinkBaseType[]>([])
  const [contents, setContents] = useState<ListBoxItemType[]>([])
  const { t } = useTranslation()

  /**
   * 初始化数据
   */
  // useEffect(() => {
  // 近期文章
  // frontContentRecentList()

  // 分类列表
  // frontCategoryCountList()

  // 标签列表
  // frontLabelList()
  // }, [])

  const cardList: CardBaseDataType[] = [
    {
      key: 1,
      headTitle: <span className='text-fontColor'>{t('home.main.left.recent')}</span>,
      // headRightContent: {
      //   headMoreText: <span className='text-fontColor'>{t('home.main.more')}</span>,
      //   moreUrl: `${baseUrl}/blogs`
      // },
      svgIcon: <SvgIcon name='book' />,
      content: <ListBoxBase type={'link'} items={contents} />
    }
    // {
    //   key: 2,
    //   headTitle: '分类',
    //   headRightContent: {
    //     headMoreText: '更多',
    //     moreUrl: `${baseUrl}/category/default`
    //   },
    //   svgIcon: <SvgIcon name='category' />,
    //   content: <ListBoxBase type={'link'} items={categorys} />
    // },
    // {
    //   key: 3,
    //   headTitle: '标签',
    //   svgIcon: <SvgIcon name='tag-1' />,
    //   content: <LinkListBase items={labels} />
    // },
    // {
    //   key: 4,
    //   headTitle: '归档',
    //   headRightContent: {
    //     headMoreText: '更多',
    //     moreUrl: ''
    //   },
    //   svgIcon: <SvgIcon name='calendar-1' />,
    //   content: <LinkListArchive items={archives} />
    // }
  ]

  /**
   * 获取文章分类
   * @returns 获取文章分类
   */
  const frontCategoryCountList = async () => {
    const categorys = await categoryApi.frontCategoryCountList()
    const { code, data } = categorys
    if (code !== 200) {
      return []
    }

    const categoryData = data.map(({ categoryId, categoryName, categoryCount }) => ({
      id: categoryId,
      text: categoryName,
      url: `/category/${categoryId}`,
      extend: { node: <div>{categoryCount}</div> }
    }))

    setCategory(categoryData)
  }

  const frontLabelList = async () => {
    const labels = await labelApi.frontLabelList()
    const { code, data } = labels
    if (code !== 200) {
      return []
    }

    const labelData = data.map(({ surrogateId, name }) => ({
      key: surrogateId,
      text: name,
      textColor: getFontRandomColorClass(),
      url: `/label/${surrogateId}`
      // extend: <div>{'12'}</div>
    }))
    setLabel(labelData)
  }

  /**
   * 获取近期文章列表
   * @returns
   */
  const frontContentRecentList = async () => {
    const contents = await blogContentApi.frontContentRecentList()
    const { code, data } = contents
    if (code !== 200) {
      return []
    }

    const blogList = data.map(({ surrogateId, title }) => ({
      id: surrogateId,
      text: title,
      url: `${baseUrl}/blog/${surrogateId}`
    }))
    setContents(blogList)
  }

  return (
    <>
      {/* 左侧侧边栏 响应式布局 */}
      {/* <div className='hidden 2xl:flex 2xl:flex-col col-span-2 items-center gap-y-4'></div> */}
      {/* 右侧主体内容 响应式布局配合上面的样式 */}
      {/* <div className='w-full sm:w-11/12 lg:w-10/12 2xl:max-w-screen-xl'></div> */}
      <div className='flex'>
        <Outlet />
      </div>
    </>
  )
}

export default Main
