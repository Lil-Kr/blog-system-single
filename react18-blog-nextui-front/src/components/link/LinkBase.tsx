import { LinkBaseType } from '@/types/components/LinkType'
import { getFontRandomColorClass } from '@/utils/colors'

const LinkBase = (props: { item: LinkBaseType }) => {
  const { item } = props

  return (
    <a
      key={item.key}
      className={`flex flex-row justify-between px-1 py-1 text-md ${item.textColor} hover:bg-primary hover:text-hoverFontColor rounded-md`}
      href={item.url}
    >
      <span>{item.text}</span>
      <div className='text-sm'>{item.extend}</div>
    </a>
  )
}

export default LinkBase
