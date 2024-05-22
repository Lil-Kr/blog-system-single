import React from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { Button, Divider, Image } from '@nextui-org/react'
import { CardBlogItem, CardSimple } from '@/components/card'
import { BlogItemsType } from '@/types/blog'
import { PaginationBase } from '@/components/pagination'
import CardMe from '@/components/card/CardMe'
import { CardBaseDataType } from '@/types/components/CardType'
import SvgIcon from '@/components/svg/SvgIcon'
import { ListBoxBase } from '@/components/list'
import { LinkListBase } from '@/components/link'
import LinkListArchive from '@/components/link/LinkListArchive'
import { LinkArchiveType, LinkBaseType } from '@/types/components/LinkType'
import { ListBoxItemType } from '@/types/components/ListBoxType'
import { Outlet } from 'oh-router-react'

const blogItems: BlogItemsType[] = [
  {
    key: 1,
    image: {
      alt: 'test image',
      url: 'http://localhost:8089/upload/image/Jay1_20240422212922.png'
    },
    tags: ['Java后台开发', '微服务', 'TS'],
    blogTitle: 'React8 hook 学习经验分享',
    publishDate: '2022-02-22'
  },
  {
    key: 2,
    image: {
      alt: 'test image',
      url: 'http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg'
    },
    tags: ['Java后台开发', '微服务', 'TS'],
    blogTitle: '操作系统中的线程与进程',
    publishDate: '2022-09-22'
  },
  {
    key: 3,
    image: {
      alt: 'test image',
      url: 'http://localhost:8089/upload/image/微信图片_202404241849052.jpg'
    },
    tags: ['编译原理', '计算机基础'],
    blogTitle: '操作系统中的线程与进程',
    publishDate: '2024-04-22'
  }
]

const newBlogs: ListBoxItemType[] = [
  { text: '聊一聊微服务架构与k8s的优劣势', url: '#' },
  {
    text: 'Java21的新特性有哪些?Java21的新特性有哪些?Java21的新特性有哪些?Java21的新特性有哪些?Java21的新特性有哪些?',
    url: '#'
  },
  { text: 'Java21的新特性有哪些?', url: '#' },
  { text: 'Java21的新特性有哪些?', url: '#' },
  { text: 'Java21的新特性有哪些?', url: '#' },
  { text: 'Java21的新特性有哪些?', url: '#' }
]

const tags: LinkBaseType[] = [
  {
    key: 1,
    text: 'SpringBoot',
    textColor: 'text-yellow-500',
    url: '#',
    extend: <div>{'3'}</div>
  },
  {
    key: 2,
    text: 'SpringCloud',
    textColor: 'text-sky-500',
    url: '#',
    extend: <div>{'4'}</div>
  },
  {
    key: 3,
    text: 'Linux',
    textColor: 'text-purple-400',
    url: '#',
    extend: <div>{'4'}</div>
  },
  {
    key: 4,
    text: 'Windows',
    textColor: 'text-gray-400',
    url: '#',
    extend: <div>{'4'}</div>
  },
  {
    key: 5,
    text: 'Java',
    textColor: 'text-cyan-400',
    url: '#',
    extend: <div>{'4'}</div>
  },
  {
    key: 6,
    text: '前端',
    textColor: 'text-blue-400',
    url: '#',
    extend: <div>{'4'}</div>
  },
  {
    key: 7,
    text: '编译原理',
    textColor: 'text-pink-400',
    url: '#',
    extend: <div>{'12'}</div>
  }
]

const archives: LinkArchiveType[] = [
  {
    key: 1,
    url: '#',
    date: 'Dec 21th 2021',
    depict: '9 篇文章'
  },
  {
    key: 2,
    url: '#',
    date: 'Dec 21th 2021',
    depict: '9 篇文章'
  },
  {
    key: 3,
    url: '#',
    date: 'Dec 21th 2021',
    depict: '9 篇文章'
  },
  {
    key: 4,
    url: '#',
    date: 'Dec 21th 2021',
    depict: '9 篇文章'
  },
  {
    key: 5,
    url: '#',
    date: 'Dec 21th 2021',
    depict: '9 篇文章'
  },
  {
    key: 6,
    url: '#',
    date: 'Dec 21th 2021',
    depict: '9 篇文章'
  },
  {
    key: 7,
    url: '#',
    date: 'Dec 21th 2021',
    depict: '9 篇文章'
  }
]

const categorys: ListBoxItemType[] = [
  { text: 'Java后端', url: '/category/java', extend: { node: <div>{'1'}</div> } },
  { text: 'ReactJS', url: '#', extend: { node: <div>{'3'}</div> } },
  { text: '操作系统', url: '#', extend: { node: <div>{'4'}</div> } }
]

const cardList: CardBaseDataType[] = [
  {
    key: 1,
    headTitle: '近期文章',
    headMoreText: '更多',
    moreUrl: '',
    svgIcon: <SvgIcon name='book' />,
    content: <ListBoxBase type={'link'} items={newBlogs} />
  },
  {
    key: 2,
    headTitle: '分类',
    headMoreText: '更多',
    moreUrl: '/main/category',
    svgIcon: <SvgIcon name='category' />,
    content: <ListBoxBase type={'link'} items={categorys} />
  },
  {
    key: 3,
    headTitle: '标签',
    headMoreText: '更多',
    moreUrl: '',
    svgIcon: <SvgIcon name='tag-1' />,
    content: <LinkListBase items={tags} />
  },
  {
    key: 4,
    headTitle: '归档',
    headMoreText: '更多',
    moreUrl: '',
    svgIcon: <SvgIcon name='calendar-1' />,
    content: <LinkListArchive items={archives} />
  }
]

const Main = () => {
  return (
    <>
      {/* 左侧侧边栏 */}
      <div className='col-span-3'>
        <div className='sider-left-warpper hidden flex-col lg:basis-1/4 md:basis-1/4 lg:flex md:flex items-center gap-y-4'>
          <CardMe />
          {cardList.map(item => (
            <CardSimple key={item.key} cardItem={item} />
          ))}
        </div>
      </div>
      {/* 右侧主体内容 */}
      <div className='col-span-9 w-full'>
        <Outlet />
      </div>
    </>
  )
}

export default Main
