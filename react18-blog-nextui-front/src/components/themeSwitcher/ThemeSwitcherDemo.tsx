import React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/react'

const ThemeSwitcherDemo = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      The current theme is: {theme}
      <br />
      <Button onClick={() => setTheme('light')}>Light Mode</Button>
      <br />
      <Button onClick={() => setTheme('dark')}>Dark Mode</Button>
      <br />
      <Button onClick={() => setTheme('purple-dark')}>purple Dark Mode</Button>
    </div>
  )
}

export default ThemeSwitcherDemo
