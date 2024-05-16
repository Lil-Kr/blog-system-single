import React, { Suspense } from 'react'

// css
import styles from './index.module.scss'

const LazyLoad = (Comp: React.LazyExoticComponent<any>) => {
  const LazyComponent = (props: any) => {
    return (
      <Suspense fallback={<div>{/* <Spin size="large" className={styles.spinLargeStyle} /> */}</div>}>
        <Comp />
      </Suspense>
    )
  }

  return <LazyComponent />
}

export default LazyLoad
