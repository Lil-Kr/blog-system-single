import { NavBarSubMenuItem } from '@/types/components/MenuType'
import React from 'react'

const MenuIncludeSub = (props: { items: NavBarSubMenuItem[]}) => {
  const { items } = props
  return (
    <div className='flex flex-row gap-x-1'>
      {items.map((item, index) => (
        <div
          key={index}
          className='group relative flex flex-col p-2 justify-center items-center hover:bg-primary hover:text-hoverFontColor transition-all ease duration-100'
        >
          <a key={index} href={item.link}>
            {item.title}
          </a>
          {item?.children && (
            <div className='absolute hidden top-full flex-col gap-y-2 rounded-md border-1 border-borderColor group-hover:flex group-hover:bg-hoverBackground group-hover:text-fontColor'>
              {item.children.map((child, index) => (
                <a
                  key={index}
                  className='flex whitespace-nowrap px-2 py-1 rounded-md hover:bg-primary hover:text-hoverFontColor'
                  href={child.link}
                >
                  {child.title}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MenuIncludeSub
