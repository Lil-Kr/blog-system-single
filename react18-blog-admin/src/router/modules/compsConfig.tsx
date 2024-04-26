import LazyLoad from '@/components/router/LazyLoad'
import { RouterItemType } from '@/types/router/routeType'
import { SlidersOutlined, DotChartOutlined, AreaChartOutlined } from '@ant-design/icons'
import { lazy } from 'react'

const compsConfig: RouterItemType[] = [
  {
    meta: {
      key: '/comps',
      title: '组件管理',
      layout: false,
      icon: <DotChartOutlined />
    },
    path: 'comps',
    children: [
      {
        meta: { key: 'comps-index', title: 'comps-index' },
        index: true,
        element: LazyLoad(lazy(() => import('@/views/comps/modal/ModalTest')))
      },
      {
        meta: {
          key: '/modal',
          title: 'Modal组件',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: 'modal',
        element: LazyLoad(lazy(() => import('@/views/comps/modal/ModalTest')))
      },
      {
        meta: {
          key: '/tinymce-cloud',
          title: 'tinymce-cloud',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: 'tinymce-cloud',
        element: LazyLoad(lazy(() => import('@/views/comps/tinymce/TinymceCloud')))
      },
      {
        meta: {
          key: '/tinymce-local',
          title: 'tinymce-local',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: 'tinymce-local',
        element: LazyLoad(lazy(() => import('@/views/comps/tinymce/TinymceLocal')))
      },
      {
        meta: {
          key: '/image-uploader',
          title: '图片上传',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: 'image-uploader',
        element: LazyLoad(lazy(() => import('@/views/comps/imageupload/ImageUploda')))
      }
    ]
  }
]

export { compsConfig }
