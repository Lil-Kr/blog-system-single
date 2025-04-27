import React from 'react'
import { useMenuStore } from '@/store/global'
import { useTranslation } from 'react-i18next'
import styles from '../index.module.scss'
import reactLogo from '/react.svg'

const Logo = () => {
  const { collapsed } = useMenuStore()
  const { t } = useTranslation()

  return (
    <div className={styles.logoBox}>
      <img src={reactLogo} alt='logo' className='logo-img' />
      {!collapsed ? <h2 className='logo-text'>{t('logo.title')}</h2> : null}
    </div>
  )
}

export default Logo
