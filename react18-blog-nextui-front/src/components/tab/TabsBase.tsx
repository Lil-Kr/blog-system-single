import React, { useState } from 'react'
import { Card, CardBody, Tab, Tabs, dataFocusVisibleClasses } from '@nextui-org/react'
import { ItemListBase } from '../list'
import { Key } from '@react-types/shared'

const TabsBase = () => {
  const [selectKey, setSelectKey] = useState<number | string>(0)

  let tabs = Array.from({ length: 10 }).map((item, index) => {
    let value = {
      id: index,
      label: <div className='text-medium'>{'随笔-' + `${index}`}</div>,
      content: (
        <div className='flex flex-col w-full gap-y-4'>
          {Array.from({ length: 6 }).map((item, index) => (
            <ItemListBase key={index} />
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
    setSelectKey(key)
  }

  return (
    <Tabs
      className='w-full'
      aria-label='tab-base'
      color='primary'
      variant='solid'
      selectedKey={selectKey}
      size={'lg'}
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
