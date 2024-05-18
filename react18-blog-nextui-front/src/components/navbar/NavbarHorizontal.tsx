import {
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react'
import React from 'react'
import AcmeLogo from './icon/AcmeLogo'
import { ThemeSwitcher } from '../themeSwitcher'
import SearchIcon from './icon/SearchIcon'

const NavbarHorizontal = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out'
  ]
  return (
    <Navbar className='flex flex-row w-full h-16 shadow-md' isBordered={true} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify='start'>
        <NavbarBrand>
          <AcmeLogo />
          <p className='font-bold text-inherit'>BLOG</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden lg:flex md:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='#'>
            热门文章
          </Link>
        </NavbarItem>
        <NavbarItem isActive={true}>
          <Link href='#' aria-current='page'>
            系列文章
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            本站插件
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            关于我
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/*  */}
      <NavbarContent className='lg:flex md:flex' justify='end'>
        <NavbarItem className='shrink'>
          <Input
            type='search'
            placeholder='Search something...'
            labelPlacement='outside'
            startContent={
              <SearchIcon className='hidden lg:flex lg:text-2xl lg:text-default-400 lg:pointer-events-none lg:flex-shrink-0 md:flex md:text-2xl md:text-default-400 md:pointer-events-none md:flex-shrink-0' />
            }
            endContent={
              <SearchIcon className='hidden lg:text-2xl lg:text-default-400 lg:pointer-events-none lg:flex-shrink-0 lg:flex md:hidden' />
            }
          />
        </NavbarItem>
        <NavbarItem className='hidden lg:flex'>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className='lg:hidden md:hidden' justify='end'>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'}
              className='w-full'
              href='#'
              size='lg'
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default NavbarHorizontal
