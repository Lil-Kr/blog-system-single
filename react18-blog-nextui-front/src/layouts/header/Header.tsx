import { NavBarHorizFlex } from '@/components/navbar'
import React from 'react'

const Header = () => {
  return (
    <div className='header-warpper flex sticky top-0 z-50 opacity-95'>
      {/* <NavbarHorizontal /> */}
      <NavBarHorizFlex />
    </div>
  )
}

export default Header
