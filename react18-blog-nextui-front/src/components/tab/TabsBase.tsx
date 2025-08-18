import React, { useState } from 'react'
import { Card, CardBody, Tab, Tabs, dataFocusVisibleClasses } from "@heroui/react"
import { ListItemBase } from '../list'
import { Key } from '@react-types/shared'
import { BlogItemsType } from '@/types/blog'

const blogItem: BlogItemsType = {
  key: '1',
  image: {
    alt: 'test image',
    url: 'http://localhost:8089/upload/image/Jay1_20240422212922_1894388366645006336.webp'
  },
  tags: [
    {
      surrogateId: '1',
      name: 'Java后台开发'
    },
    {
      surrogateId: '2',
      name: '微服务'
    },
    {
      surrogateId: '3',
      name: 'TS'
    }
  ],
  blogTitle: 'React8 hook 学习经验分享',
  paragraph: 'React8 hook 学习经验分享',
  publishTime: '2022-02-22'
}

const TabsBase = () => {
  const [selectKey, setSelectKey] = useState<string>('0')

  const tabs = Array.from({ length: 3 }).map((item, index) => {
    const value = {
      id: index,
      label: <div className='text-medium text-fontColor hover:text-hoverFontColor'>{'随笔-' + `${index}`}</div>,
      content: (
        <div className='flex flex-col w-full gap-y-2'>
          {Array.from({ length: 6 }).map((item, index) => (
            <ListItemBase key={index} blogItem={blogItem} />
          ))}
        </div>
      )
    }
    return value
  })

  /**
   * change tab data when click on tab
   * @param key
   */
  const selectChange = (key: Key) => {
    // alert(key)
    setSelectKey(key.toString())
  }

  return (
    <Tabs
      className='w-full'
      aria-label='tab-base'
      color='primary'
      variant='solid'
      selectedKey={selectKey}
      size={'lg'}
      radius='sm'
      onSelectionChange={selectChange}
      items={tabs}
    >
      {item => (
        <Tab key={item.id} title={item.label}>
          {item.content}
        </Tab>
      )}
    </Tabs>
  )
}

export default TabsBase
