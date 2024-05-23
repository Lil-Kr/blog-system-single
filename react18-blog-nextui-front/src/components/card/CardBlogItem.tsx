import { LinkBaseType } from '@/types/components/LinkType'
import { Card, Divider, divider } from '@nextui-org/react'
import React from 'react'
import { LinkBase } from '../link'
import SvgIcon from '../svg/SvgIcon'

type CardBlogItemProps = {}

const tags: LinkBaseType[] = [
  {
    key: 1,
    text: 'SpringBoot',
    textColor: 'text-yellow-500',
    url: '#',
    extend: <div>{'3'}</div>
  },
  {
    key: 2,
    text: 'SpringCloud',
    textColor: 'text-sky-500',
    url: '#',
    extend: <div>{'4'}</div>
  },
  {
    key: 3,
    text: 'Linux',
    textColor: 'text-purple-400',
    url: '#',
    extend: <div>{'4'}</div>
  },
  {
    key: 4,
    text: 'Windows',
    textColor: 'text-gray-400',
    url: '#',
    extend: <div>{'4'}</div>
  },
  {
    key: 5,
    text: 'Java',
    textColor: 'text-cyan-400',
    url: '#',
    extend: <div>{'4'}</div>
  },
  {
    key: 6,
    text: '前端',
    textColor: 'text-blue-400',
    url: '#',
    extend: <div>{'4'}</div>
  },
  {
    key: 7,
    text: '编译原理',
    textColor: 'text-pink-400',
    url: '#',
    extend: <div>{'12'}</div>
  }
]

const CardBlogItem = () => {
  return (
    <Card key={'1'} className='flex flex-col gap-y-6 p-4' radius='sm' fullWidth={true}>
      <div className='blog-info flex flex-col gap-y-3'>
        <div className='blog-tags flex flex-row gap-x-2'>
          {tags.map((item, index) => (
            <LinkBase key={index} item={item} />
          ))}
        </div>
        <h1 className='blog-title text-3xl font-bold mt-2'>操作系统中的线程与进程</h1>
        <div className='blog-views flex flex-row gap-x-4'>
          <div className='flex flex-row text-sm gap-x-[2px] text-stone-600'>
            <SvgIcon name='user-1' style={'w-5 h-5'} />
            <span>{'Lil-K'}</span>
          </div>
          <div className='flex flex-row text-sm gap-x-[2px] text-stone-600'>
            <SvgIcon name='calendar-work-1' style={'w-5 h-5'} />
            <span>{'2022-03-09'}</span>
          </div>
          <div className='flex flex-row text-sm gap-x-[2px] text-stone-600'>
            <SvgIcon name='eye-1' style={'w-5 h-5'} />
            <span>{'21'}</span>
          </div>
        </div>
      </div>
      <Divider className='h-[2px]' />
      <div className='blog-article flex flex-col'>
        {/* <a className='w-full break-words whitespace-normal'>aba</a> */}
        <p>
          <a id='asdb'></a>asdfasdfasdfas
        </p>
        <pre className='language-java bg-primary'>
          <code className='text-white'>String imageFullName = imageFile.getOriginalFilename();</code>
        </pre>
      </div>
    </Card>
  )
}

export default CardBlogItem
