import React from 'react'
import { PaginationBase } from '@/components/pagination'
import { NavBarSubMenuItem } from '@/types/components/MenuType'
import { MenuIncludePageSub } from '@/components/menu'
import { useLocation, useParams } from 'oh-router-react'
import { ListItemBase } from '@/components/list'
import { BlogItemsType } from '@/types/blog'

const blogItem: BlogItemsType = {
  key: 1,
  image: {
    alt: 'test image',
    url: 'http://localhost:8089/upload/image/Jay1_20240422212922.png'
  },
  tags: ['Java后台开发', '微服务', 'TS', 'a'],
  blogTitle: 'React8 hook 学习经验分享',
  publishTime: '2022-02-22'
}

const CategoryDetail = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  console.log(id, pathname)

  // todo: 发起http请求, 获取DB的数据

  return (
    <div className='flex flex-col w-full gap-y-8'>
      <div className='flex text-4xl'>CategoryDetail - {id}</div>

      <div className='flex flex-col w-full gap-y-2'>
        {Array.from({ length: 2 }).map((item, index) => (
          <ListItemBase
            key={index}
            blogItem={{
              key: 1,
              image: {
                alt: 'test image',
                url: 'http://localhost:8089/upload/image/Jay1_20240422212922.png'
              },
              // todo: 删除id选项, 测试使用
              tags: ['Java后台开发', '微服务', 'TS', `${id}`],
              blogTitle: 'React8 hook 学习经验分享',
              publishTime: '2022-02-22'
            }}
          />
        ))}
      </div>
      <div className='flex flex-row justify-center pt-6'>
        <PaginationBase />
      </div>
    </div>
  )
}

export default CategoryDetail
