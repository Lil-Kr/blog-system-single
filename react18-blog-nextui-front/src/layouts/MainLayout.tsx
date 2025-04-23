import React, { useState } from 'react'
import Header from './header/Header'
import { ContainerGrid } from './container'
import Footer from './footer/Footer'

const MainLayout = () => {
  return (
    <div className='flex flex-col gap-y-4'>
      <Header />
      <div className='flex flex-col w-full items-center'>
        <ContainerGrid />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
