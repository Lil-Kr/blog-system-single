import {
  ApartmentOutlined,
  BookOutlined,
  FileImageOutlined,
  HomeOutlined,
  MergeCellsOutlined,
  SlidersOutlined,
  SnippetsOutlined,
  TagsOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  UserOutlined,
  UserSwitchOutlined
} from '@ant-design/icons/lib/icons'
import { lazy } from 'react'

/**
 * 路由渲染页面
 */
export const componentMap = {
  _admin_home: lazy(() => import('@/views/home')),
  // 博客管理
  // _admin_blog: lazy(() => import('@/views/home')),
  _admin_blog_index: lazy(() => import('@/views/blog/blogContent/BlogList')),
  _admin_blog_label: lazy(() => import('@/views/blog/label/Label')),
  _admin_blog_category: lazy(() => import('@/views/blog/category/BlogCategory')),
  _admin_blog_topic: lazy(() => import('@/views/blog/topic/BlogTopic')),
  // 图片管理
  _admin_image_category: lazy(() => import('@/views/image/ImageCategory')),
  _admin_image_pictures: lazy(() => import('@/views/image/ImageManage')),

  // 门户管理
  // _admin_image_pictures: lazy(() => import('@/views/image/ImageManage')),

  // 系统管理
  _admin_sys_user: lazy(() => import('@/views/sys/user/User')),
  _admin_sys_org: lazy(() => import('@/views/sys/Org')),
  _admin_sys_role: lazy(() => import('@/views/sys/role/Role')),
  _admin_sys_acl: lazy(() => import('@/views/sys/Acl')),
  _admin_sys_dict: lazy(() => import('@/views/sys/Dict'))
} as const

/**
 * 图片
 */
export const iconMap = {
  _admin_home: <HomeOutlined />,
  // 博客管理
  _admin_blog: <BookOutlined />,
  _admin_blog_index: <UnorderedListOutlined />,
  _admin_blog_label: <TagsOutlined />,
  _admin_blog_category: <SnippetsOutlined />,
  _admin_blog_topic: <SlidersOutlined />,
  // 图片管理
  _admin_image: <SlidersOutlined />,
  _admin_image_category: <FileImageOutlined />,
  _admin_image_pictures: <FileImageOutlined />,
  // 门户管理

  // 组件管理

  // 系统管理
  _admin_sys: <ToolOutlined />,
  _admin_sys_user: <UserOutlined />,
  _admin_sys_org: <ApartmentOutlined />,
  _admin_sys_role: <UserSwitchOutlined />,
  _admin_sys_acl: <MergeCellsOutlined />,
  _admin_sys_dict: <SlidersOutlined />
} as const
