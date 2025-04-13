import React from 'react'
import { usePermissionsStore } from '@/store/sys/authStore'
import RoleAcl from '@/views/sys/role/RoleAcl'
import { TabsProps } from 'antd/lib'

/**
 * HOC 根据权限决定是否渲染组件
 * @param WrappedComponent 需要受控的组件
 * @param btnPermission 需要的权限
 */
const withPermission = <P extends object>(
  WrappedComponent: React.ComponentType<P>, // 传入的组件
  btnPermission: string // 需要的权限
): React.FC<P> => {
  // 返回新的受权限控制的组件
  return (props: P) => {
    const { btnSignSet } = usePermissionsStore()
    const hasPermission = btnSignSet.has(btnPermission)
    if (!hasPermission) {
      return null // 没有权限, 不渲染组件
    }

    return <WrappedComponent {...props} /> // 传递原组件的 props
  }
}

export default withPermission

const withShowPermission =
  <P extends object>(
    showPermission: string // 需要的权限
  ) =>
  (WrappedComponent: React.ComponentType<P>) => {
    // 返回新的受权限控制的组件
    return (props: P) => {
      const { btnSignSet } = usePermissionsStore()
      const hasPermission = btnSignSet.has(showPermission)
      if (!hasPermission) {
        return <WrappedComponent {...(props as P)} items={[]} />
      }
      return <WrappedComponent {...(props as P)} />
    }
  }

export { withShowPermission }
