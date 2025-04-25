import { Card, CardBody, CardFooter, CardHeader, Divider, Link, Image } from '@heroui/react'
import React from 'react'

const Logs = () => {
  return (
    <>
      <div className='col-span-8 flex flex-col gap-y-4'>
        <div className='bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-8 border-2 border-borderColor hover:shadow-md transition-shadow duration-400'>
          {/* 日期 */}
          <div className='text-[1.5em] font-bold text-fontColor'>{'2022-02-02'}</div>
          {/* 分割线 */}
          <hr className='border-gray-300 mb-4' />
          {/* 内容 */}
          <div className='text-fontColor'>{'ssss'}</div>
        </div>
        <div className='bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-8 border-2 border-borderColor hover:shadow-md transition-shadow duration-400'>
          {/* 日期 */}
          <div className='text-[1.5em] font-bold text-fontColor'>{'2022-02-02'}</div>
          {/* 分割线 */}
          <hr className='border-gray-300 mb-4' />
          {/* 内容 */}
          <div className='text-fontColor'>{'ssss'}</div>
        </div>
      </div>
    </>
  )
}

export default Logs
