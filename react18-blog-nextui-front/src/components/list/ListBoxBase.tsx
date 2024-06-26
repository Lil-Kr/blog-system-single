import React from 'react'
import { Link, Listbox, ListboxItem } from '@nextui-org/react'
import { ListBoxItemType, CompType } from '@/types/components/ListBoxType'

const textLength = 32

/**
 *
 * @param props
 * @returns
 */
const ListBoxBase = (props: { items: ListBoxItemType[]; type: CompType }) => {
  const { items, type } = props
  return (
    <div className='grid grid-cols-1 w-full'>
      <Listbox aria-label='actions' color='primary' onAction={key => console.log(key)}>
        {type === 'link'
          ? items.map((item, index) => (
              <ListboxItem key={index} href={item.url} textValue={item.text}>
                <div className='flex justify-between text-medium'>
                  <span>
                    {item.text.length > textLength ? item.text.substring(0, textLength) + ' ....' : item.text}
                  </span>
                  <span>{item.extend?.node}</span>
                </div>
              </ListboxItem>
            ))
          : items.map((item, index) => (
              <ListboxItem key={index} href={item.url}>
                <div className='flex flex-row w-full justify-between text-medium'>
                  <span>{item.text}</span>
                  <span>{item.extend?.node}</span>
                </div>
              </ListboxItem>
            ))}
      </Listbox>
    </div>
  )
}

export default ListBoxBase
