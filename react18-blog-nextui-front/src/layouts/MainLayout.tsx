import React, { useState } from 'react'
import { ThemeSwitcher, ThemeSwitcherDemo } from '@/components/themeSwitcher'
import { NavbarHorizontal } from '@/components/navbar'
import Header from './header/Header'
import { Container, ContainerGrid, ContainerFlex } from './container'
import Footer from './footer/Footer'

const MainLayout = () => {
  return (
    <div className='flex flex-col gap-y-4'>
      <Header />
      {/* <Container /> */}
      {/* <ContainerFlex /> */}
      <div className='flex flex-col w-full items-center'>
        <ContainerGrid />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
