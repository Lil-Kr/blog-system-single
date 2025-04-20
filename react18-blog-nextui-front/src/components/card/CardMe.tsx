import React from 'react'
import { Card, CardFooter, Image } from '@heroui/react'
import SvgIcon from '../svg/SvgIcon'

const env = import.meta.env
const CardMe = () => {
  return (
    <Card
      className='flex flex-col items-center gap-y-4'
      isPressable={true}
      onPress={() => console.log('')} // 点击头像出发 action
      radius='sm'
      shadow='sm'
      fullWidth={true}
    >
      <div className='flex mt-8'>
        <Image
          alt='me'
          className='object-cover'
          // isZoomed={true}
          width={200}
          height={200}
          // shadow='sm'
          radius='full'
          src={env.VITE_BACKEND_IMAGE_BASE_API + '/upload/image/11月的萧邦_109951167749320136_1894396375513305088.webp'}
        />
      </div>

      {/* <div className='text-large'>{'Full-Stack Developer'}</div> */}
      <div className='flex flex-row items-center gap-4'>
        <SvgIcon name='github' style={'w-8 h-10'} />
        <SvgIcon name='twitter' style={'w-8 h-10'} />
        <SvgIcon name='facebook' style={'w-8 h-10'} />
      </div>
      <CardFooter />
    </Card>
  )
}

export default CardMe
