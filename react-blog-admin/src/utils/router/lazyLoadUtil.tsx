import React, { Suspense } from 'react'
import { Spin } from 'antd'
// css
import styles from './index.module.scss'

const lazyLoadUtil = (Comp: React.LazyExoticComponent<any>) => {
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

export default lazyLoadUtil
