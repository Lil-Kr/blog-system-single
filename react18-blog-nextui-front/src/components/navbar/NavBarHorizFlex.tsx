import SearchIcon from '@/components/navbar/icon/SearchIcon'
import { ThemeSwitcher, LanguageSwitcher } from '@/components/themeSwitcher'
import { baseUrl } from '@/constant'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Kbd, Link } from '@heroui/react'
import { div } from 'framer-motion/client'
import { useTheme } from 'next-themes'
import { useNavigate } from 'oh-router-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SvgIcon from '../svg/SvgIcon'

type NavProps = {
  name: string
  url: string
}

/**
 * 导航栏
 * @returns
 */
const NavBarHorizFlex = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navigateTo = useNavigate()

  const navItems: NavProps[] = [
    // { name: t('header.recommend'), url: '/recommend' },
    // { name: '专题文章', url: '/article' },
    // { name: '精选留言', url: '/article' },
    // { name: '本站插件', url: '/plugins' },
    { name: t('header.favorites'), url: '/favorites' },
    { name: t('header.timeline'), url: '/timeline' },
    { name: t('header.about'), url: '/about' }
  ]

  /**
   * skip to about me page
   * @req req
   */
  const handleNavClick = (req: NavProps) => {
    navigateTo(req.url)
  }

  const backHome = () => {
    navigateTo('')
  }

  return (
    <div className='flex flex-row w-full h-16 justify-center shadow-sm border-b bg-background'>
      <div className='flex flex-row w-full basis-5/6 justify-between'>
        <div className='flex flex-row w-auto h-auto items-center'>
          <a
            className='font-bold px-2 py-2 border-1 border-borderColor rounded-lg cursor-pointer text-fontColor hover:text-indigo-500 hover:bg-green-400 dark:hover:bg-green-500'
            onClick={() => backHome()}
          >
            {t('header.home')}
          </a>
        </div>
        <div className='hidden lg:flex md:flex flex-row w-auto items-center gap-x-2'>
          {navItems.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex rounded-lg cursor-pointer hover:bg-[#4757d5] w-auto px-2 py-2 text-fontColor hover:text-hoverFontColor`}
                onClick={() => handleNavClick({ ...item, url: `${baseUrl}${item.url}` })}
              >
                {item.name}
              </div>
            )
          })}
        </div>
        <div className='hidden md:flex lg:flex flex-row w-auto h-auto items-center gap-x-4'>
          <Input
            type='search'
            placeholder='Search Something...'
            labelPlacement='outside'
            startContent={<SearchIcon className='flex text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
            endContent={
              <Kbd className='text-sm text-default-400 pointer-events-none flex-shrink-0 flex' keys={['command']}>
                {'K'}
              </Kbd>
            }
          />
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        {/* 响应式的样式内容, 与上面的内容一致 */}
        <div className='lg:hidden md:hidden flex flex-row w-auto h-auto items-center gap-x-4'>
          <Button className='flex border rounded-md text-fontColor' onPress={() => setIsOpen(!isOpen)}>
            <SvgIcon name={'bars-3'} style='w-15 h-15' />
          </Button>

          {/* Dropdown 内容 */}
          {isOpen && (
            <div className='absolute flex flex-col top-full left-0 w-full bg-background shadow-lg p-4 space-y-4'>
              <Input
                type='search'
                placeholder='Search Something...'
                labelPlacement='outside'
                startContent={
                  <SearchIcon className='flex text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                }
                endContent={
                  <Kbd className='text-sm text-default-400 pointer-events-none flex-shrink-0 flex' keys={['command']}>
                    {'K'}
                  </Kbd>
                }
              />
              <ThemeSwitcher />
              <LanguageSwitcher />
              {navItems.map(({ name, url }) => (
                <div
                  className='flex p-2 rounded-lg cursor-pointer text-fontColor hover:text-hoverFontColor hover:bg-[#4757d5]'
                  onClick={() => handleNavClick({ name, url })}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBarHorizFlex
