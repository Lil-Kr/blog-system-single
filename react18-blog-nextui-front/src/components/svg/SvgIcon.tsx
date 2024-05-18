import React, { useMemo } from 'react'

interface SvgIconProps {
  prefix?: string
  name: string
  color?: string
  style?: string
}

const SvgIcon = (props: SvgIconProps) => {
  const { prefix = 'icon', name, color, style = 'w-6 h-6' } = props
  const symbolId = useMemo(() => `#${prefix}-${name}`, [prefix, name])

  return (
    <svg className={style} aria-hidden='true'>
      <use href={symbolId} fill={color} />
    </svg>
  )
}

export default SvgIcon
