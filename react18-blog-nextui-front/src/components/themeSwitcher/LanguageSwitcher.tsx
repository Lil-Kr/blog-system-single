import React from 'react'
import { VisuallyHidden, useSwitch } from '@heroui/react'
import SvgIcon from '@/components/svg/SvgIcon'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation()
  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch()

  const handleClick = (e: any) => {
    console.log('开关状态:', e.target.checked)
    console.log('isSelected:', isSelected)
  }

  return (
    <div className='flex flex-col gap-2'>
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps({ onClick: handleClick })} checked={isSelected} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: ['w-8 h-8', 'flex items-center justify-center', 'rounded-lg bg-default-100 hover:bg-default-200']
          })}
        >
          {isSelected ? <SvgIcon name='lang-change' /> : <SvgIcon name='lang-change' />}
        </div>
      </Component>
    </div>
  )
}

export default LanguageSwitcher
