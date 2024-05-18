import React from 'react'
import { CardSimple, CardBase } from '@/components/card'
import { CardBaseDataType } from '@/types/components/CardType'
import SvgIcon from '@/components/svg/SvgIcon'
import { it } from 'node:test'
import { Outlet } from 'oh-router-react'

const ContainerFlex = () => {
  const cardList: CardBaseDataType[] = [
    {
      key: '1',
      headTitle: '最新文章',
      headMoreText: '更多',
      svgIcon: <SvgIcon name='book' />
    },
    {
      key: '2',
      headTitle: '分类',
      headMoreText: '更多',
      svgIcon: <SvgIcon name='category' />
    },
    {
      key: '3',
      headTitle: '标签',
      headMoreText: '更多',
      svgIcon: <SvgIcon name='tag-1' />
    },
    {
      key: '4',
      headTitle: '归档',
      headMoreText: '更多',
      svgIcon: <SvgIcon name='calendar-1' />
    }
  ]
  return (
    <div className='container-flex-warpper flex w-full justify-center'>
      <div className='flex flex-col gap-x-6 lg:flex-row lg:basis-5/6 md:flex-row md:basis-5/6'>
        <div className='sider-left-warpper hidden flex-col lg:basis-1/4 md:basis-1/4 lg:flex md:flex items-center gap-y-4'>
          <CardBase />
          {cardList.map(item => {
            return <CardSimple key={item.key} headTitle={item.headTitle} headMoreText={item.headMoreText} svgIcon={item.svgIcon} />
          })}
        </div>
        <div className='content-right-warpper flex flex-col w-full lg:basis-3/4 items-start'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ContainerFlex
