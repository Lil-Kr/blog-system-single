import { useBearStore, BearState } from '@/store/demo/bearStore'
import { Button, Menu } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useState } from 'react'
import Children from './Children'
import Children2 from './Children2'

const Login = () => {
  // const [btnSize, setSize] = useState<SizeType>('large')
  const { bears } = useBearStore()

  console.log('--> 刷新主页面')

  // const handleIncrease = () => {
  //   increase(1)
  // }

  // const handleDecrease = () => {
  //   decrease(1)
  // }

  /**
   * pubs之后, arr改变了, 改变了指针
   */
  // let arr = [1, 2]
  // console.log('--> push前: ', arr)
  // arr.push(4)
  // console.log('--> push后: ', arr)

  // let newArr = [4, 5]
  // arr = newArr
  // console.log('--> 修改后: ', arr)

  return (
    <div className='editor'>
      <p>{`父组件中的值更新: ` + bears}</p>
      <Children />
      <Children2 />

    </div>
  )
}

export default Login
