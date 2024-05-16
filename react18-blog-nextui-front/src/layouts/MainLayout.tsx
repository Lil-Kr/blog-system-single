import React, { useState } from 'react'
import { ThemeSwitcher, ThemeSwitcherDemo } from '@/components/themeSwitcher'
import { NavbarHorizontal } from '@/components/navbar'
import Header from './header/Header'
import Container from './container/Container'

const MainLayout = () => {
  return (
    <div className='main-layout-wrapper'>
      <Header />
      <Container />
    </div>
  )
}

export default MainLayout
