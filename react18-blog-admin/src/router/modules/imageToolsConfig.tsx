import LazyLoad from '@/components/router/LazyLoad'
import { RouterItemType } from '@/types/router/routeType'
import { PictureOutlined, FileImageOutlined } from '@ant-design/icons'
import { lazy } from 'react'

const imageToolsConfig: RouterItemType[] = [
  {
    meta: {
      key: '/image',
      title: '图片管理',
      layout: false,
      icon: <PictureOutlined />
    },
    path: '/admin/image',
    children: [
      {
        meta: {
          key: '/category',
          title: '图片分类管理',
          layout: false,
          icon: <FileImageOutlined />
        },
        path: '/admin/image/category',
        element: LazyLoad(lazy(() => import('@/views/image/ImageCategory')))
      },
      {
        meta: {
          key: '/pictures',
          title: '图片管理',
          layout: false,
          icon: <FileImageOutlined />
        },
        path: '/admin/image/pictures',
        element: LazyLoad(lazy(() => import('@/views/image/ImageManage')))
      }
    ]
  }
]

export { imageToolsConfig }
