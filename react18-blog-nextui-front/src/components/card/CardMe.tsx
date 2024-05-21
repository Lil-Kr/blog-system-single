import React from 'react'
import { Card, CardFooter, Image } from '@nextui-org/react'
import SvgIcon from '../svg/SvgIcon'

const CardMe = () => {
  return (
    <Card
      className='flex flex-col items-center gap-y-4'
      isPressable={true}
      onPress={() => console.log('ss')}
      radius='sm'
      shadow='sm'
      fullWidth={true}
    >
      <div className='felx mt-8'>
        <Image
          alt='me'
          className='object-cover'
          isZoomed={true}
          width={300}
          height={200}
          // shadow='sm'
          radius='full'
          src='http://localhost:8089/upload/image/Jay1_20240422212922.png'
        />
      </div>

      <div className='text-large'>{'Full-Stack Developer'}</div>
      <div className='flex flex-row items-center gap-4'>
        <SvgIcon name='github' style={'w-10 h-10'} />
        <SvgIcon name='twitter' style={'w-10 h-10'} />
        <SvgIcon name='facebook' style={'w-10 h-10'} />
      </div>
      <CardFooter></CardFooter>
    </Card>
  )
}

export default CardMe
