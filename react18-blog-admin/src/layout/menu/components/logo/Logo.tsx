import React from 'react'

import { useTranslation } from 'react-i18next'
import styles from '../index.module.scss'

const Logo = (props: { collapsed: boolean }) => {
  const { collapsed } = props
  const { t } = useTranslation()
  return (
    <div className={styles.logoBox}>
      {/* <img src={logo} alt="logo" className="logo-img" /> */}

      {!collapsed ? <h2 className='logo-text'>{t('logo.title')}</h2> : null}
    </div>
  )
}

export default Logo
