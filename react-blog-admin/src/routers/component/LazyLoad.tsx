import React, { Suspense } from 'react'
import { Spin } from 'antd'
import store, { RootState, useAppDispatch, useAppSelector } from '@/redux'

// css
import styles from './index.module.scss'


const LazyLoad = (Comp: React.LazyExoticComponent<any>) => {

  const LazyComponent = (props: any) => {

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
