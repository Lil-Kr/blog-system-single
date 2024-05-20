import React from 'react'
import { LinkArchiveType, LinkBaseType } from '@/types/components/LinkType'
import { it } from 'node:test'

const LinkArchive = (props: { item: LinkArchiveType }) => {
  const { item } = props
  return (
    <a
      key={item.key}
      className={`flex flex-col border px-1 py-2 gap-2 text-md ${item.textColor} hover:bg-primary hover:text-white rounded-md`}
      href={item.url}
      target='_blank'
    >
      <div className='text-small'>{item.date}</div>
      <div className='text-lg font-bold'>{item.depict}</div>
    </a>
  )
}

export default LinkArchive
