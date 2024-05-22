import React, { useEffect, useState } from 'react'
import { NavBarSubMenuItem } from '@/types/components/MenuType'
import { Link } from '@nextui-org/react'
import { useLocation, useNavigate } from 'oh-router-react'

/**
 * 圆角菜单
 * @param props
 * @returns
 */
const MenuIncludePageSub = (props: { items: NavBarSubMenuItem[]; defaultActive: string | number }) => {
  const { items, defaultActive } = props
  const navigateTo = useNavigate()
  const { pathname } = useLocation()

  // TODO: 切换位状态管理
  const [activeIndex, setActiveIndex] = useState<string>(pathname)

  const changeMenuItem = (item: NavBarSubMenuItem) => {
    setActiveIndex(item.link)
    navigateTo(item.link)
  }

  useEffect(() => {
    if (defaultActive !== '') {
      setActiveIndex(defaultActive.toString())
      navigateTo(defaultActive.toString())
    }
  }, [])

  return (
    <div className='flex flex-row w-full shadow-md p-2 items-center justify-between'>
      <div className='flex flex-row flex-wrap h-auto gap-x-2'>
        {items.length > 0 &&
          items.map((item, index) => (
            <div
              key={index}
              className={`group relative flex flex-col p-2 justify-center items-center hover:bg-primary hover:text-hoverFontColor rounded-md cursor-pointer transition-all ease duration-100 ${
                activeIndex === item.link ? 'bg-primary text-hoverFontColor' : ''
              }`}
              onClick={() => changeMenuItem(item)}
            >
              {item.title}
            </div>
          ))}
      </div>
      <div className='flex flex-row gap-x-2 justify-center items-center'>
        <Link href='#'>{'更多'}</Link>
      </div>
    </div>
  )
}

export default MenuIncludePageSub
