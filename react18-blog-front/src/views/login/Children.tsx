import { useBearStore } from '@/store/demo/bearStore'
import React from 'react'

const Children = () => {
  const {bears, increase, decrease} = useBearStore()
  return (
    <div>
      <p>{`子组件中的值更新: ` + bears}</p>
    </div>
  )
}

export default Children
