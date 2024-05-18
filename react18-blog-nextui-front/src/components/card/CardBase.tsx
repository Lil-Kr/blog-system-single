import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import React from 'react'

const CardBase = () => {
  return (
    <Card className='flex flex-col' radius='sm' shadow='sm' fullWidth={true}>
      <div className='flex flex-col items-center gap-y-4'>
        <Image
          alt='Album cover'
          className='object-cover'
          width={200}
          height={100}
          // width='100%'
          // height={200}
          // shadow='sm'
          radius='full'
          src='http://localhost:8089/upload/image/Jay1_20240422212922.png'
        />
        <div>abc</div>
        <div>abc</div>
        <div>abc</div>
      </div>
    </Card>
  )
}

export default CardBase
