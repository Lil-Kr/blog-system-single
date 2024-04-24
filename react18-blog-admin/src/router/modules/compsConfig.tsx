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
      },
      {
        meta: {
          key: '/tiptap',
          title: 'tiptap',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: 'tiptap',
        element: LazyLoad(lazy(() => import('@/views/comps/tiptap/Tiptap')))
      },
      {
        meta: {
          key: '/quill',
          title: 'quill',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: 'quill',
        element: LazyLoad(lazy(() => import('@/views/comps/quill/ReactQuillEditor')))
      },
      {
        meta: {
          key: '/quill2',
          title: 'quill2',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: 'quill2',
        element: LazyLoad(lazy(() => import('@/views/comps/quill/QuillEditor2')))
      },
      {
        meta: {
          key: '/tinymce',
          title: 'tinymce',
          layout: false,
          icon: <SlidersOutlined />
        },
        path: 'tinymce',
        element: LazyLoad(lazy(() => import('@/views/comps/tinymce/Tinymce')))
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
