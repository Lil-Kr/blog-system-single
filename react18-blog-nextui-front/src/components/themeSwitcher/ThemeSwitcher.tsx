import { Switch } from '@nextui-org/react'
import React from 'react'
import SunIcon from './icon/SunIcon'
import MoonIcon from './icon/MoonIcon'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setTheme('purple-dark') : setTheme('light')
  }
  return (
    <Switch
      defaultSelected={theme === 'purple-dark' ? true : false}
      size='md'
      color='secondary'
      thumbIcon={({ isSelected, className }) =>
        isSelected ? <MoonIcon className={className} /> : <SunIcon className={className} />
      }
      onChange={onChange}
    />
  )
}

export default ThemeSwitcher
