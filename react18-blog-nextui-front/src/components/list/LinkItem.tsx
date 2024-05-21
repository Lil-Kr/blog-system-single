import React from 'react'

const LinkItem = () => {
  return (
    <div className='flex flex-col w-full'>
      <a href='#' className='text-gray-300 hover:text-gray-800'>
        a
      </a>
      <a href='#' className='text-gray-400 hover:text-gray-800'>
        bg
      </a>
      <a href='#' className='text-gray-600 hover:text-gray-800'>
        g
      </a>
      <a href='#' className='text-gray-800 hover:text-gray-800'>
        c
      </a>
    </div>
  )
}

export default LinkItem
