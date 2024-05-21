import React from 'react'
import { ItemListBase } from '@/components/list'
import { TabsBase } from '@/components/tab'
import { Card } from '@nextui-org/react'

const Category = () => {
  return (
    <div className='flex flex-col w-full'>
      <Card className='w-full px-2 py-2 flex-wrap' shadow='sm'>
        <TabsBase />
      </Card>
    </div>
  )
}

export default Category
