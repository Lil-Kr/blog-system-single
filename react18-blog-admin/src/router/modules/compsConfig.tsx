import LazyLoad from '@/components/router/LazyLoad'
import { RouterItemType } from '@/types/router/routeType'
import { SlidersOutlined, DotChartOutlined } from '@ant-design/icons'
import { lazy } from 'react'

const compsConfig: RouterItemType[] = [
  {
    meta: {
      key: '/comps',
      title: '组件管理',
      layout: false,
      icon: <DotChartOutlined />
    },
    path: '/admin/comps',
    children: [
      {
        meta: {
          key: '/tinymce-cloud',
          title: 'tinymce-cloud',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: '/admin/comps/tinymce-cloud',
        element: LazyLoad(lazy(() => import('@/views/comps/tinymce/TinymceCloud')))
      },
      {
        meta: {
          key: '/tinymce-local',
          title: 'tinymce-local',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: '/admin/comps/tinymce-local',
        element: LazyLoad(lazy(() => import('@/views/comps/tinymce/TinymceLocal')))
      },
      {
        meta: {
          key: '/image-uploader',
          title: '图片上传',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: '/admin/comps/image-uploader',
        element: LazyLoad(lazy(() => import('@/views/comps/imageupload/ImageUploda')))
      },
      {
        meta: {
          key: '/select',
          title: '下拉选择框',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: '/admin/comps/select',
        element: LazyLoad(lazy(() => import('@/views/comps/select/SelectDemo')))
      },
      {
        meta: {
          key: '/table-pro',
          title: 'ProTable组件',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: '/admin/comps/table-pro',
        element: LazyLoad(lazy(() => import('@/views/comps/protable/ProTableDemo')))
      }
    ]
  }
]

export { compsConfig }
