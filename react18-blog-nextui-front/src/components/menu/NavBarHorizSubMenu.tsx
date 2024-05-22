import AcmeLogo from '@/components/navbar/icon/AcmeLogo'
import SearchIcon from '@/components/navbar/icon/SearchIcon'
import { ThemeSwitcher } from '@/components/themeSwitcher'
import { Input, Link } from '@nextui-org/react'
import { it } from 'node:test'
import { NavBarSubMenuItem } from '@/types/components/MenuType'
import MenuIncludeSub from './MenuIncludeSub'

const navbarItems: NavBarSubMenuItem[] = [
  {
    id: 1,
    title: '推荐文章',
    link: '/default'
  },
  {
    id: 2,
    title: '系列文章',
    link: '/a',
    children: [
      {
        id: '2.1',
        title: 'SpringBoot',
        link: '/spring-boot'
      },
      {
        id: '2.2',
        title: '操作系统',
        link: '/os'
      },
      {
        id: '2.3',
        title: 'Redis',
        link: '/redis'
      }
    ]
  },
  {
    id: 3,
    title: '精选留言',
    link: '/comments'
  },
  {
    id: 4,
    title: '本站插件',
    link: '/plugins',
    children: [
      {
        id: '4.1',
        title: 'nextUI',
        link: '/nextui'
      },
      {
        id: '4.2',
        title: 'react-hook-dev',
        link: '/react-dev'
      }
    ]
  },
  {
    id: 5,
    title: '关于本站',
    link: '/about-station'
  },
  {
    id: 6,
    title: '关于作者',
    link: '/about-me'
  }
]


/**
 * support submenu navbar
 * @returns
 */
const NavBarHorizSubMenu = () => {
  return (
    <div className='flex flex-row w-full h-[4vh] justify-center gap-x-2 border-b-1 border-borderColor sticky top-0'>
      <div className='flex flex-row w-full h-full basis-5/6 justify-between'>
        <div className='flex flex-row w-auto h-auto items-center'>
          <a className='font-bold hover:bg-success px-2 py-2 rounded-lg' href='#'>
            Placeholder
          </a>
        </div>
        <MenuIncludeSub items={navbarItems} />
        <div className='flex flex-row w-auto items-center'>
          <span>Placeholder</span>
        </div>
      </div>
    </div>
  )
}

export default NavBarHorizSubMenu
