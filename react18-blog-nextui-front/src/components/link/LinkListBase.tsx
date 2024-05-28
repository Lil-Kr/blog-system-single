import React from 'react'
import { LinkBaseType } from '@/types/components/LinkType'
import LinkBase from './LinkBase'
import { Link } from '@nextui-org/react'

const LinkListBase = (props: { items: LinkBaseType[] }) => {
  const { items } = props

  return (
    <div className='flex flex-row flex-wrap gap-4'>
      {items.map((item, index) => (
        <LinkBase key={index} item={item} />
      ))}
    </div>
  )
}

export default LinkListBase
