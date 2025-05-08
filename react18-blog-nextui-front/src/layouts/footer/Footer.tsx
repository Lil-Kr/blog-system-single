import { transformToYear } from '@/utils/date/dateTimeUtil'
import React from 'react'

/**
 * footer
 * @returns
 */
const Footer = () => {
  return (
    <div className='footer-wrapper flex w-full'>
      <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row justify-around items-center w-full bg-zinc-800 py-4 flex-wrap'>
        <div className='flex text-white text-sm'>
          <span>
            {'Powered by'} <span className='font-semibold text-indigo-400 dark:text-purple-400'>{'ReactJS'}</span>
            {' | UI by '}
            <span className='font-semibold text-indigo-400 dark:text-purple-400'>{'HeroUI / Tailwind CSS'}</span>
          </span>
        </div>
        <div className='flex text-white text-sm'>
          <span>
            {'Copyright  '}
            <span className='font-semibold text-indigo-400 dark:text-purple-400'>
              © 2023 - {transformToYear(new Date().toDateString())}
            </span>
            {' Lil-K '}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
