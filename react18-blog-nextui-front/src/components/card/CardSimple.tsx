import React from 'react'
import { Card, CardBody, CardHeader, Listbox, ListboxItem } from '@nextui-org/react'
import { CardBaseDataType } from '@/types/components/CardType'

const CardSimple = (props: CardBaseDataType) => {
  const { headTitle, headMoreText, svgIcon } = props

  return (
    <Card className='flex shrink' radius='sm' shadow='sm' fullWidth={true}>
      <CardHeader className='flex justify-between'>
        <div className='flex flex-row gap-x-2'>
          {svgIcon}
          <p className='text-large font-bolb'>{headTitle}</p>
        </div>
        <div className='flex flex-col px-2'>
          <a href='#' className='text-medium hover:text-primary'>
            {headMoreText}
          </a>
        </div>
      </CardHeader>
      <CardBody className='flex flex-col w-full'>
        <Listbox aria-label='Actions' color='primary' onAction={key => console.log(key)}>
          <ListboxItem key='1'>
            <div className='text-medium'>聊一聊云原生架构是否取代微服务架构?</div>
          </ListboxItem>
          <ListboxItem key='2'>
            <div className='text-medium'>浅谈操作系统中的进程与线程?</div>
          </ListboxItem>
          <ListboxItem key='3'>
            <div className='text-medium'>聊一聊远程办公文化</div>
          </ListboxItem>
          <ListboxItem key='4'>
            <div className='text-medium'>聊一聊远程办公文化</div>
          </ListboxItem>
          <ListboxItem key='5'>
            <div className='text-medium'>聊一聊远程办公文化</div>
          </ListboxItem>
        </Listbox>
      </CardBody>
    </Card>
  )
}

export default CardSimple
