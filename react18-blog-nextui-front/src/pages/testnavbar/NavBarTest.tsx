import AcmeLogo from '@/components/navbar/icon/AcmeLogo'
import SearchIcon from '@/components/navbar/icon/SearchIcon'
import { ThemeSwitcher } from '@/components/themeSwitcher'
import { Input, Link } from '@nextui-org/react'
import { it } from 'node:test'

type NavbarItem = {
  id: number | string
  title: string
  link: string
  icon?: React.ReactNode
  children?: NavbarItem[]
}

const navbarItems: NavbarItem[] = [
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

const NavBarTest = () => {
  return (
    <div className='flex flex-row w-full h-16 justify-center items-center gap-x-4 shadow-md sticky top-0 opacity-95'>
      {navbarItems.map((item, index) => (
        <div key={index} className='relative group flex flex-col w-auto'>
          <a
            key={index}
            className='flex px-2 py-2 rounded-lg group-hover:bg-primary group-hover:text-hoverFontColor'
            href={item.link}
          >
            {item.title}
          </a>
          {item?.children && (
            <div className='absolute group-hover:flex group-hover:bg-hoverBackground hidden left-0 top-full flex-col gap-y-1 text-start rounded-lg border-1'>
              {item.children.map((child, index) => (
                <a key={index} className='flex whitespace-nowrap rounded-lg px-2 py-1 hover:bg-primary hover:text-hoverFontColor' href={child.link}>
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

export default NavBarTest
