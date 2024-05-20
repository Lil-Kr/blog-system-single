import React from 'react'
import { LinkArchiveType } from '@/types/components/LinkType'
import LinkArchive from './LinkArchive'

const LinkListArchive = (props: { items: LinkArchiveType[] }) => {
  const { items } = props
  return (
    <div className='grid grid-cols-2 gap-4'>
      {items.map((item, index) => (
        <LinkArchive key={index} item={item} />
      ))}
    </div>
  )
}

export default LinkListArchive
