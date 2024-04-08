import { useBearStore } from '@/store/demo/bearStore'
import { Button } from 'antd'
import React from 'react'

const Children = () => {
  const { bears, increase, decrease } = useBearStore()

  console.log('--> 刷新子页面 Children-3')
  // const handleIncrease = () => {
  //   console.log('--> 点击子页面按钮')
  //   increase(1)
  // }

  // const handleDecrease = () => {
  //   decrease(1)
  // }

  return (
    <div>
      <Button onClick={() => increase(1)}>+</Button>
      <Button onClick={() => decrease(1)}>-</Button>
      {/* <p>{bears}</p> */}
      <p>{`Children-3: ` + bears}</p>
    </div>
  )
}

export default Children
