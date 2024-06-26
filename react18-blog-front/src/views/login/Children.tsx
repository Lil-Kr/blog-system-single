import { useBearStore } from '@/store/demo/bearStore'
import { Button } from 'antd'
import React from 'react'
import Children2 from './Children2'
import Children3 from './Children3'

const Children = () => {
  const { bears, increase, decrease } = useBearStore()

  console.log('--> 刷新子页面 Children')
  // const handleIncrease = () => {
  //   console.log('--> 点击子页面按钮')
  //   increase(1)
  // }

  // const handleDecrease = () => {
  //   decrease(1)
  // }

  return (
    <div>
      {/* <p>{bears}</p> */}
      <p>{`Children-1: ` + bears}</p>
      <Children3 />
    </div>
  )
}

export default Children
