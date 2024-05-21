import { Card, Image } from '@nextui-org/react'
import React from 'react'

/**
 * List item display component
 * @returns
 */
const ItemListBase = () => {
  return (
    <Card className='flex flex-row w-full gap-x-6 hover:border hover:border-primary' radius='md' shadow='none'>
      <div className='flex'>
        <Image
          className='object-cover rounded-none'
          isZoomed={true}
          // shadow='sm'
          radius='none'
          width={200}
          height={200}
          src='http://localhost:8089/upload/image/Jay1_20240422212922.png'
        />
      </div>
      <div className='flex flex-col items-start justify-center gap-y-4'>
        <div>sss</div>
        <div>sss</div>
        <div>sss</div>
      </div>
    </Card>
  )
}

export default ItemListBase
