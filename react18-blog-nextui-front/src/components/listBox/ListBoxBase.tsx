import React from 'react'
import { Link, Listbox, ListboxItem } from '@nextui-org/react'
import { ListBoxItemType, compType } from '@/types/components/ListBoxType'

const ListBoxBase = (props: { items: ListBoxItemType[]; type: compType }) => {
  const { items, type } = props
  return (
    <Listbox aria-label='actions' color='primary' onAction={key => console.log(key)}>
      {type === 'link'
        ? items.map((item, index) => (
            <ListboxItem key={index} className='flex  w-full'>
              <a className='flex flex-row justify-between text-medium' href={item.url} target='_blank'>
                {item.text}
                {item.extend?.node}
              </a>
            </ListboxItem>
          ))
        : items.map((item, index) => (
            <ListboxItem key={index}>
              <div className='text-medium'>{item.text}</div>
              {item.extend?.node}
            </ListboxItem>
          ))}
    </Listbox>
  )
}

export default ListBoxBase
