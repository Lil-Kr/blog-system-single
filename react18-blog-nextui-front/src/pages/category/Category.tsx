import React from 'react'
import { ItemBase } from '@/components/listBox'
import { TabsBase } from '@/components/tab'

const Category = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row w-full'>
        <TabsBase />
      </div>
      <div className='flex flex-col w-full gap-y-4'>
        {Array.from({ length: 6 }).map((item, index) => (
          <ItemBase />
        ))}
      </div>
    </div>
  )
}

export default Category
