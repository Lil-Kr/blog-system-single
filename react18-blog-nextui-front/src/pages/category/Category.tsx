import React from 'react'
import { Card } from "@heroui/react"
import { MenuIncludePageSub } from '@/components/menu'
import { NavBarSubMenuItem } from '@/types/components/MenuType'
import { Outlet, useParams } from 'oh-router-react'
import { baseUrl } from '@/constant'

const navbarItems: NavBarSubMenuItem[] = [
  {
    id: '0',
    title: '随笔',
    link: `${baseUrl}/category/default`
  },
  {
    id: '1',
    title: 'Java后端',
    link: `${baseUrl}/category/java`
  },
  {
    id: '2',
    title: '前端',
    link: `${baseUrl}/category/front`
  },
  {
    id: '3',
    title: '数据库',
    link: `${baseUrl}/category/database`
  },
  {
    id: '4',
    title: '编译原理',
    link: `${baseUrl}/category/compile`
  },
  {
    id: '5',
    title: '计算机网络',
    link: `${baseUrl}/category/networking`
  },
  {
    id: '6',
    title: '数据结构',
    link: `${baseUrl}/category/datastructure`
  }
]

const Category = () => {
  const { id } = useParams()
  return (
    <div className='flex flex-col w-full'>
      <Card className='w-full px-2 py-2 flex-wrap gap-2' shadow='sm'>
        <MenuIncludePageSub items={navbarItems} defaultActive={!id ? navbarItems[0].link : ''} />
        <Outlet />
      </Card>
    </div>
  )
}

export default Category
