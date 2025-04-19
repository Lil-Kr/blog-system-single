import React, { Suspense } from 'react'
import { Spin } from 'antd/lib'

// css
// import styles from './index.module.scss'

const LazyLoad = (Comp: React.LazyExoticComponent<any>) => {
  const LazyComponent = (props: any) => {
    return (
      <Suspense
        fallback={
          <div
            style={{
              height: '100vh',
              width: '100vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Spin size='large' />
          </div>
        }
      >
        <Comp {...props} />
      </Suspense>
    )
  }

  return <LazyComponent />
}

export default LazyLoad
