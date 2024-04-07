import {useBearStore, BearState } from '@/store/demo/bearStore'
import { Button } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useState } from 'react'
import Children from './Children'

const Login = () => {
  const [btnSize, setSize] = useState<SizeType>('large')
  const {bears, increase, decrease} = useBearStore()

  const handleIncrease = () => {
    increase(1)
  }

  const handleDecrease = () => {
    decrease(1)
  }

  return (
    <div className='editor'>
      <Button onClick={handleIncrease}>+</Button>
      <Button onClick={handleDecrease}>-</Button>
      <Children />
    </div>
  )
}

export default Login
