import SearchIcon from '@/components/navbar/icon/SearchIcon'
import { ThemeSwitcher, LanguageSwitcher } from '@/components/themeSwitcher'
import { baseUrl } from '@/constant'
import { Button, Input, Kbd } from '@heroui/react'
import { useNavigate } from 'oh-router-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SvgIcon from '../svg/SvgIcon'
import { cn } from '@/components/navbar/cn'

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
    { name: t('header.favorites'), url: '/favorites' },
    // { name: t('header.timeline'), url: '/timeline' },
    { name: t('header.about'), url: '/about' }
  ]

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

        {/* 导航菜单 - 在移动端隐藏 */}
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

        {/* 右侧工具栏 */}
        <div className='flex flex-row w-auto h-auto items-center gap-x-4'>
          {/* 搜索框 */}
          <div className='hidden md:block'>
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
          </div>

          {/* 主题和语言切换器 */}
          <div className='hidden md:flex items-center gap-x-4'>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>

          {/* 移动端菜单按钮 */}
          <div className='md:hidden'>
            <Button className='flex border rounded-md text-fontColor' onPress={() => setIsOpen(!isOpen)}>
              <SvgIcon name={'bars-3'} style='w-15 h-15' />
            </Button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 - 使用相同的组件, 通过CSS控制显示方式 */}
      <div
        className={cn(
          'md:hidden absolute top-16 left-0 w-full bg-background shadow-lg p-4 space-y-4 z-50',
          isOpen ? 'block' : 'hidden'
        )}
      >
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
        <div className='flex items-center gap-x-4'>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        {navItems.map(({ name, url }, index) => (
          <div
            key={index}
            className='flex p-2 rounded-lg cursor-pointer text-fontColor hover:text-hoverFontColor hover:bg-[#4757d5]'
            onClick={() => handleNavClick({ name, url })}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NavBarHorizFlex
