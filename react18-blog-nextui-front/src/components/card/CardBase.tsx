import { Card, CardBody, CardFooter, CardHeader, Image } from "@heroui/react"
import React from 'react'

const CardBase = () => {
  return (
    <Card className='flex flex-col items-center gap-y-4' radius='sm' shadow='sm' fullWidth={true}>
      {/* <div className='flex flex-col items-center gap-y-4'>
      </div> */}
      <Image
        alt='Album cover'
        className='w-full object-cover'
        isZoomed={true}
        width={300}
        height={200}
        shadow='sm'
        radius='full'
        src='http://localhost:8089/upload/image/微信图片_20240424184905_1894389253811605504.webp'
      />
      <div>abc</div>
      <div>abc</div>
      <div>abc</div>
    </Card>
  )
}

export default CardBase
