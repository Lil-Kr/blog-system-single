import React from 'react'
import { CardSimple } from '@/components/card'
import CardMe from '@/components/card/CardMe'
import { CardBaseDataType } from '@/types/components/CardType'
import SvgIcon from '@/components/svg/SvgIcon'
import { ListBoxBase } from '@/components/list'
import { ListBoxItemType } from '@/types/components/ListBoxType'
import { LinkListBase } from '@/components/link'
import LinkListArchive from '@/components/link/LinkListArchive'
import { LinkArchiveType, LinkBaseType } from '@/types/components/LinkType'
import { Outlet } from 'oh-router-react'

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

const categorys: ListBoxItemType[] = [
  { text: 'Java后端', url: '/category/java', extend: { node: <div>{'1'}</div> } },
  { text: 'ReactJS', url: '#', extend: { node: <div>{'3'}</div> } },
  { text: '操作系统', url: '#', extend: { node: <div>{'4'}</div> } }
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

const cardList: CardBaseDataType[] = [
  {
    key: 1,
    headTitle: '最新文章',
    headMoreText: '更多',
    svgIcon: <SvgIcon name='book' />,
    content: <ListBoxBase type={'link'} items={newBlogs} />
  },
  {
    key: 2,
    headTitle: '分类',
    headMoreText: '更多',
    svgIcon: <SvgIcon name='category' />,
    content: <ListBoxBase type={'link'} items={categorys} />
  },
  {
    key: 3,
    headTitle: '标签',
    headMoreText: '更多',
    svgIcon: <SvgIcon name='tag-1' />,
    content: <LinkListBase items={tags} />
  },
  {
    key: 4,
    headTitle: '归档',
    headMoreText: '更多',
    svgIcon: <SvgIcon name='calendar-1' />,
    content: <LinkListArchive items={archives} />
  }
]

const ContainerGrid = () => {
  return (
    <div className='container-grid grid grid-cols-12 w-10/12 gap-x-4'>
      <div className='col-span-3'>
        <div className='sider-left-warpper hidden flex-col lg:basis-1/4 md:basis-1/4 lg:flex md:flex items-center gap-y-4'>
          <CardMe />
          {cardList.map(item => (
            <CardSimple key={item.key} cardItem={item} />
          ))}
        </div>
      </div>
      <div className='col-span-9 w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default ContainerGrid
