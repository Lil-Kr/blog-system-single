import React from 'react'

/** css **/
import containerStyle from '@/layouts/css/container.module.scss'

const Container = () => {
  return (
    <div className='grid grid-rows-3 grid-flow-col gap-4'>
      <div className='row-span-3 bg-slate-500'>01</div>
      <div className='col-span-2 bg-sky-500'>02</div>
      <div className='row-span-2 col-span-2 bg-orange-500'>03</div>
    </div>
  )
}

export default Container
