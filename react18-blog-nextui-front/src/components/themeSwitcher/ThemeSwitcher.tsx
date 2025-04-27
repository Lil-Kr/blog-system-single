import { Switch } from '@heroui/react'
import React from 'react'
import SunIcon from './icon/SunIcon'
import MoonIcon from './icon/MoonIcon'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const theme = e.target.checked ? 'purple-dark' : 'light'
    setTheme(theme)
  }

  return (
    <Switch
      size={'md'}
      isSelected={theme === 'purple-dark'}
      color='secondary'
      thumbIcon={({ isSelected, className }) =>
        isSelected ? <MoonIcon className={className} /> : <SunIcon className={className} />
      }
      onChange={onChange}
    />
  )
}

export default ThemeSwitcher
