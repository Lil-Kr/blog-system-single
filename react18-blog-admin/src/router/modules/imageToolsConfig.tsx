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
    path: 'image',
    children: [
      {
        meta: { key: 'image-index', title: 'comps-index' },
        index: true,
        element: LazyLoad(lazy(() => import('@/views/comps/modal/ModalTest')))
      },
      {
        meta: {
          key: '/category',
          title: '图片分类管理',
          layout: false,
          icon: <FileImageOutlined />
        },
        path: 'category',
        element: LazyLoad(lazy(() => import('@/views/image/ImageCategory')))
      },
      {
        meta: {
          key: '/pictures',
          title: '图片管理',
          layout: false,
          icon: <FileImageOutlined />
        },
        path: 'pictures',
        element: LazyLoad(lazy(() => import('@/views/image/ImageManage')))
      }
    ]
  }
]

export { imageToolsConfig }
