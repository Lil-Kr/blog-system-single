import React from 'react'
import { CardBase } from '@/components/card'

const ContainerFlex = () => {
  return (
    <div className='container-2-warpper flex w-full justify-center'>
      <div className='flex flex-col gap-x-4 lg:flex-row lg:basis-5/6 md:flex-row md:basis-5/6'>
        <div className='sider-left-warpper hidden flex-col lg:basis-1/4 md:basis-1/4 lg:flex md:flex items-center gap-y-4'>
          <CardBase />
          <CardBase />
          <CardBase />
          <CardBase />
        </div>
        <div className='content-right-warpper flex flex-col w-full lg:basis-3/4 items-start'>
          <div>
            <p>
              右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边
            </p>

            <p>
              右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边右边
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerFlex
