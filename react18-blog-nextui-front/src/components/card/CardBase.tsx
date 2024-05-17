import React from 'react'
import { Card, CardBody, CardHeader, Divider, Listbox, ListboxItem } from '@nextui-org/react'
import { trace } from 'console'

type CardBaseDataType = {
  title: string
  moreText: string
}

const CardBase = () => {
  const data: CardBaseDataType = {
    title: '最新文章',
    moreText: '更多'
  }

  return (
    <Card radius='sm' fullWidth={true}>
      <CardHeader className='flex justify-between'>
        <div className='flex flex-row gap-x-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25'
            />
          </svg>

          <p className='text-large font-sans'>{data.title}</p>
        </div>
        <div className='flex flex-col'>
          <a href='#' className='text-large hover:bg-purple-500'>
            {data.moreText}
          </a>
        </div>
      </CardHeader>
      <CardBody className='flex flex-col w-full'>
        <Listbox aria-label='Actions' color='secondary' onAction={key => alert(key)}>
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

export default CardBase
