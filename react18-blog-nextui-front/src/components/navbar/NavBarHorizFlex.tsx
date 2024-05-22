import AcmeLogo from '@/components/navbar/icon/AcmeLogo'
import SearchIcon from '@/components/navbar/icon/SearchIcon'
import { ThemeSwitcher } from '@/components/themeSwitcher'
import { Input, Kbd, Link } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { useNavigate } from 'oh-router-react'

type AboutMeProps = {
  url: string
}

const NavBarHorizFlex = () => {
  const navItems = ['推荐文章', '系列文章', '精彩留言', '本站插件', '关于本站', '关于作者']
  const { theme, setTheme } = useTheme()
  const navigateTo = useNavigate()

  const aboutMe = (param: AboutMeProps) => {
    console.log(param.url)
    navigateTo(param.url)
  }

  return (
    <div
      className={`flex flex-row w-full h-16 justify-center shadow-sm border-b ${
        theme === 'purple-dark' ? 'bg-[#0D001A] border-[#32263E]' : 'bg-white'
      }`}
    >
      <div className='flex flex-row w-full basis-5/6 justify-between'>
        <div className='flex flex-row w-auto h-auto items-center'>
          <a className='font-bold hover:bg-success px-2 py-2 rounded-lg' href='/main/home'>
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
                className={`flex rounded-lg hover:bg-[#4757d5] w-auto px-2 py-2 ${
                  theme === 'purple-dark' ? 'text-[#ffffff]' : 'text-black hover:text-[#ffffff] cursor-pointer'
                }`}
                onClick={() => aboutMe({ url: '/about' })}
              >
                {item}
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
        </div>
      </div>
    </div>
  )
}

export default NavBarHorizFlex
