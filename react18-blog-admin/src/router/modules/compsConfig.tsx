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
        element: LazyLoad(lazy(() => import('@/views/comps/md-editor/MdEditor1')))
      },
      {
        meta: {
          key: '/index',
          title: 'md-editor-rt',
          layout: false,
          icon: <AreaChartOutlined />
        },
        path: 'index',
        element: LazyLoad(lazy(() => import('@/views/comps/md-editor/MdEditor1')))
      },
      {
        meta: {
          key: '/md-editor-2',
          title: 'react-md-editor',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: 'md-editor-2',
        element: LazyLoad(lazy(() => import('@/views/comps/md-editor/MdEditor2')))
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
      }
    ]
  }
]

export { compsConfig }
