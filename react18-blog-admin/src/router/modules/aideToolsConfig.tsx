import LazyLoad from '@/components/router/LazyLoad'
import { RouterItemType } from '@/types/router/routeType'
import { SlidersOutlined, ToolOutlined, CodepenOutlined } from '@ant-design/icons'
import { lazy } from 'react'

const aideToolsConfig: RouterItemType[] = [
  {
    meta: {
      key: '/aide-tools',
      title: '辅助工具',
      layout: false,
      icon: <ToolOutlined />
    },
    path: 'aide-tools',
    children: [
      {
        meta: { key: 'aide-tools-index', title: 'aide-tools-index' },
        index: true,
        element: LazyLoad(lazy(() => import('@/views/aidetools/JavaCodeGenerator')))
      },
      {
        meta: {
          key: '/index',
          title: 'code-generator',
          layout: false,
          icon: <CodepenOutlined />
        },
        path: 'index',
        element: LazyLoad(lazy(() => import('@/views/aidetools/JavaCodeGenerator')))
      }
    ]
  }
]

export { aideToolsConfig }
