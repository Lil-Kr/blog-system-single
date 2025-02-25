import AcmeLogo from '@/components/navbar/icon/AcmeLogo'
import SearchIcon from '@/components/navbar/icon/SearchIcon'
import { ThemeSwitcher } from '@/components/themeSwitcher'
import { Input, Link } from "@heroui/react"
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
    <div className='flex flex-row w-full h-[4vh] justify-center gap-x-2 border-b-1 border-borderColor sticky top-0'>
      <div className='flex flex-row w-full h-full basis-5/6 justify-between'>
        <div className='flex flex-row w-auto h-auto items-center'>
          <a className='font-bold hover:bg-success px-2 py-2 rounded-lg' href='#'>
            Placeholder
          </a>
        </div>
        <div className='flex flex-row gap-x-4'>
          {navbarItems.map((item, index) => (
            <div
              key={index}
              className='group relative flex flex-col p-2 justify-center items-center rounded-lg hover:bg-primary hover:text-hoverFontColor'
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
        <div className='flex flex-row w-auto items-center'>
          <span>Placeholder</span>
        </div>
      </div>
    </div>
  )
}

export default NavBarTest
