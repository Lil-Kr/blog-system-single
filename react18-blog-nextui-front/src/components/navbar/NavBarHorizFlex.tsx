import SearchIcon from '@/components/navbar/icon/SearchIcon'
import { ThemeSwitcher, LanguageSwitcher } from '@/components/themeSwitcher'
import { baseUrl } from '@/constant'
import { Input, Kbd, Link } from '@heroui/react'
import { useTheme } from 'next-themes'
import { useNavigate } from 'oh-router-react'
import { useTranslation } from 'react-i18next'

type AboutMeProps = {
  name: string
  url: string
}

const NavBarHorizFlex = () => {
  const { t, i18n } = useTranslation()

  const navItems: AboutMeProps[] = [
    { name: t('header.recommend'), url: '/recommend' },
    { name: '系列文章', url: '/article' },
    { name: '精彩留言', url: '/article' },
    { name: '本站插件', url: '/plugins' },
    { name: t('header.webstation'), url: '/article' },
    { name: t('header.aboutme'), url: '/about' }
  ]
  const { theme, setTheme } = useTheme()
  const navigateTo = useNavigate()

  /**
   * skip to about me page
   * @param param
   */
  const aboutMe = (param: AboutMeProps) => {
    navigateTo(param.url)
  }

  const backHome = () => {
    navigateTo('')
  }

  return (
    <div
      className={`flex flex-row w-full h-16 justify-center shadow-sm border-b ${
        theme === 'purple-dark' ? 'bg-[#0D001A] border-[#32263E]' : 'bg-white'
      }`}
    >
      <div className='flex flex-row w-full basis-5/6 justify-between'>
        <div className='flex flex-row w-auto h-auto items-center'>
          <a className='font-bold hover:bg-success px-2 py-2 rounded-lg cursor-pointer' onClick={() => backHome()}>
            HOME
          </a>
          {/* <Link className='font-bold hover:bg-success  px-2 py-2 rounded-lg' href='#'>
            HOME
          </Link> */}
        </div>
        <div className='flex flex-row w-auto items-center gap-x-2'>
          {navItems.map((item, index) => {
            return (
              <div
                key={index}
                // isBlock
                // href='#'
                // disableAnimation={false}
                // color='primary'
                className={`flex rounded-lg hover:bg-[#4757d5] cursor-pointer w-auto px-2 py-2 ${
                  theme === 'purple-dark' ? 'text-[#ffffff]' : 'text-black hover:text-[#ffffff] cursor-pointer'
                }`}
                onClick={() => aboutMe({ ...item, url: `${baseUrl}${item.url}` })}
              >
                {item.name}
              </div>
            )
          })}
        </div>
        <div className='flex flex-row w-auto h-auto items-center gap-x-4'>
          <Input
            type='search'
            placeholder='Search sth...'
            labelPlacement='outside'
            startContent={
              <SearchIcon className='hidden lg:flex lg:text-2xl lg:text-default-400 lg:pointer-events-none lg:flex-shrink-0 md:flex md:text-2xl md:text-default-400 md:pointer-events-none md:flex-shrink-0' />
            }
            endContent={
              <Kbd
                className='hidden lg:text-md lg:text-default-400 lg:pointer-events-none lg:flex-shrink-0 lg:flex md:text-sm md:text-default-400 md:pointer-events-none md:flex-shrink-0 md:flex'
                keys={['command']}
              >
                K
              </Kbd>
            }
          />
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}

export default NavBarHorizFlex
