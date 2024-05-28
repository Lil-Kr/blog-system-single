import React from 'react'
import { CardSimple, CardBase } from '@/components/card'
import { CardBaseDataType } from '@/types/components/CardType'
import SvgIcon from '@/components/svg/SvgIcon'
import { Outlet } from 'oh-router-react'
import { ListBoxBase } from '@/components/list'
import { ListBoxItemType } from '@/types/components/ListBoxType'
import { LinkListBase } from '@/components/link'
import { LinkArchiveType, LinkBaseType } from '@/types/components/LinkType'
import LinkListArchive from '@/components/link/LinkListArchive'
import CardMe from '@/components/card/CardMe'

const newBlogs: ListBoxItemType[] = [
  {id: '1', text: '聊一聊微服务架构与k8s的优劣势' },
  {id: '2', text: 'Java21的新特性有哪些?' },
  {id: '3', text: 'Java21的新特性有哪些?' },
  {id: '4', text: 'Java21的新特性有哪些?' },
  {id: '5', text: 'Java21的新特性有哪些?' },
  {id: '6', text: 'Java21的新特性有哪些?' }
]

const categorys: ListBoxItemType[] = [
  { id: '1', text: 'Java后端', url: '/category/java', extend: { node: <div>{'1'}</div> } },
  { id: '2', text: 'ReactJS', url: '#', extend: { node: <div>{'3'}</div> } },
  { id: '3', text: '操作系统', url: '#', extend: { node: <div>{'4'}</div> } }
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
    headTitle: '近期文章',
    headRightContent: {
      headMoreText: '更多',
      moreUrl: ''
    },
    svgIcon: <SvgIcon name='book' />,
    content: <ListBoxBase type={'link'} items={newBlogs} />
  },
  {
    key: 2,
    headTitle: '分类',
    headRightContent: {
      headMoreText: '更多',
      moreUrl: ''
    },
    svgIcon: <SvgIcon name='category' />,
    content: <ListBoxBase type={'link'} items={categorys} />
  },
  {
    key: 3,
    headTitle: '标签',
    headRightContent: {
      headMoreText: '更多',
      moreUrl: ''
    },
    svgIcon: <SvgIcon name='tag-1' />,
    content: <LinkListBase items={tags} />
  },
  {
    key: 4,
    headTitle: '归档',
    headRightContent: {
      headMoreText: '更多',
      moreUrl: ''
    },
    svgIcon: <SvgIcon name='calendar-1' />,
    content: <LinkListArchive items={archives} />
  }
]

const ContainerFlex = () => {
  return (
    <div className='container-flex-warpper flex w-full justify-center'>
      <div className='flex flex-col gap-x-6 lg:flex-row lg:basis-5/6 md:flex-row md:basis-5/6'>
        <div className='sider-left-warpper hidden flex-col lg:basis-1/4 md:basis-1/4 lg:flex md:flex items-center gap-y-4'>
          <CardMe />
          {cardList.map(item => (
            <CardSimple key={item.key} cardItem={item} />
          ))}
        </div>
        <div className='content-right-warpper flex flex-col w-full lg:basis-3/4 items-start'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ContainerFlex
