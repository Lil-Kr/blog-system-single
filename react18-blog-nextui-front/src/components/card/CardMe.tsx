import React from 'react'
import { Card, CardFooter, Image, Tooltip } from '@heroui/react'
import SvgIcon from '../svg/SvgIcon'

const env = import.meta.env
const CardMe = () => {
  return (
    <Card
      className='flex flex-col items-center gap-y-4'
      isPressable={true}
      // onPress={() => console.log('')} // 点击头像出发 action
      radius='sm'
      shadow='sm'
      fullWidth={true}
    >
      <div className='flex mt-8'>
        <Image
          alt='me'
          className='object-cover'
          isZoomed={true}
          width={150}
          height={150}
          // shadow='sm'
          radius='full'
          src={env.VITE_BACKEND_IMAGE_BASE_API + '/upload/image/流川枫-1_1915216468627296256.webp'}
        />
      </div>

      <div className='text-sm text-fontColor'>{'消失的下雨天, 好想再淋一遍'}</div>
      <div className='flex flex-row items-center gap-4'>
        <Tooltip key={1} color={'secondary'} content={'github'}>
          <a href='https://github.com/Lil-Kr' target='blank'>
            <SvgIcon name='github' style={'w-6 h-6'} />
          </a>
        </Tooltip>

        <Tooltip key={1} color={'secondary'} content={'Email'}>
          <div>
            <SvgIcon name='envelope' style={'w-6 h-6'} />
          </div>
        </Tooltip>

        <Tooltip key={1} color={'secondary'} content={'Gmail'}>
          <div>
            <SvgIcon name='google' style={'w-6 h-6'} />
          </div>
        </Tooltip>
      </div>
      <CardFooter />
    </Card>
  )
}

export default CardMe
