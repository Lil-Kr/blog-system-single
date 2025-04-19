import React, { useMemo } from 'react'
import { useLocation } from 'oh-router-react'
import { Breadcrumb } from 'antd/lib'
import { useBreadcrumbStore } from '@/store/global'
import { BreadcrumbType } from '@/types/common/breadcrumbType'

const BreadcrumbNav = () => {
  const { pathname } = useLocation()
  const { breadcrumbMap } = useBreadcrumbStore()
  const items: BreadcrumbType[] = breadcrumbMap!.get(pathname) ?? []
  // console.log('--> items:', items)
  return (
    <div>
      <Breadcrumb items={items} />
    </div>
  )
}

export default BreadcrumbNav
