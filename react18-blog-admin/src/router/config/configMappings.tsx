import { HomeOutlined } from '@ant-design/icons/lib/icons'
import { lazy } from 'react'

export const componentMap = {
  home_a: lazy(() => import('@/views/home'))
}

export const iconMap = {
  home: <HomeOutlined />
}
