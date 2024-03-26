import React, { Suspense, useEffect } from 'react'
import { Spin } from 'antd'
import store, { RootState, useAppDispatch, useAppSelector } from '@/redux'
import { NonIndexRouteObject, useLocation, useResolvedPath, useMatch, useParams, useNavigate } from 'react-router-dom'
import {routerAllMap} from '@/routers/index'

// css
import styles from './index.module.scss'


const LazyLoad = (Comp: React.LazyExoticComponent<any>) => {

  const LazyComponent = (props: any) => {
    const { key, pathname } = useLocation()
    const navigateTo = useNavigate()
    console.log('--> pathname', pathname)

    const token = useAppSelector((state) => state.auth.token)
    const isLogin = useAppSelector((state) => state.auth.isLogin)

    if (!token || !isLogin) {
      useEffect(() => {
        navigateTo('/login', {replace:true})
      }, [navigateTo]);
    }

    return (
      <Suspense
        fallback={
          <div>
            <Spin size="large" className={styles.spinLargeStyle} />
          </div>
        }
      >
        <Comp />
      </Suspense>
    )
  }

	return <LazyComponent/>
}

export default LazyLoad
