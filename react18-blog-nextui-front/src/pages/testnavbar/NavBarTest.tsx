import AcmeLogo from '@/components/navbar/icon/AcmeLogo'
import SearchIcon from '@/components/navbar/icon/SearchIcon'
import { ThemeSwitcher } from '@/components/themeSwitcher'
import { Input, Link } from '@nextui-org/react'

const NavBarTest = () => {
  const linkList = ['推荐文章', '系列文章', '本站插件', '精选留言', '关于本站', '关于作者']

  return (
    <div className='flex flex-row w-full h-16 sticky top-0 z-50 justify-center shadow-md border-b-1 border-gray-500 dark:border-purple-700'>
      <div className='flex flex-row w-full basis-5/6 justify-between'>
        <div className='flex flex-row w-auto h-auto items-center'>
          {/* <AcmeLogo /> */}
          <p className='font-bold'>HOME</p>
        </div>
        <div className='flex flex-row w-auto items-center gap-x-4'>
          {linkList.map((item, index) => {
            return (
              <Link key={index} isBlock href='#' className='font-bold'>
                {item}
              </Link>
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
              <SearchIcon className='hidden lg:text-2xl lg:text-default-400 lg:pointer-events-none lg:flex-shrink-0 lg:flex md:hidden' />
            }
          />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}

export default NavBarTest
