import {
  Button,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  ScrollShadow
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
    <Navbar isBordered={true} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify='start'>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />
        <NavbarBrand>
          <AcmeLogo />
          <p className='font-bold text-inherit'>HOME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
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

      <NavbarContent justify='end'>
        <NavbarItem>
          <Input
            className='w-200'
            type='search'
            // color='primary'
            placeholder='search something...'
            labelPlacement='outside'
            startContent={<SearchIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
            endContent={<SearchIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
          />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
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
