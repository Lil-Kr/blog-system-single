import React from 'react'
import { VisuallyHidden, useSwitch } from '@heroui/react'
import SvgIcon from '@/components/svg/SvgIcon'
import { useSystemConfigStore } from '@/store/system/systemStore'

const LanguageSwitcher = () => {
  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch()
  const { setLanguage } = useSystemConfigStore()
  const handleClick = (e: any) => {
    const lang: string = isSelected ? 'en' : 'zh'
    setLanguage(lang)
  }

  return (
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
  )
}

export default LanguageSwitcher
