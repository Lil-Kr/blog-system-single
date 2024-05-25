import React from 'react'

import { useTranslation } from 'react-i18next'
import styles from '../index.module.scss'
import { useMenuStore } from '@/store/global'
// import { useGlobalMenuStore } from '@/store/global/globalLayoutStore'

const Logo = () => {
  const { collapsed } = useMenuStore()
  const { t } = useTranslation()
  return (
    <div className={styles.logoBox}>
      {/* <img src={logo} alt="logo" className="logo-img" /> */}
      {/* {!collapsed ? <h2 className='logo-text'>{t('logo.title')}</h2> : null} */}
      {!collapsed ? <h2 className='logo-text'>{'后台博客管理'}</h2> : null}
    </div>
  )
}

export default Logo
