import { LinkBaseType } from '@/types/components/LinkType'
import { Link } from '@nextui-org/react'

const LinkBase = (props: { item: LinkBaseType }) => {
  const { item } = props
  return (
    <a
      key={item.key}
      // className={`flex flex-row justify-between px-1 py-1 text-md ${item.textColor} hover:bg-primary hover:text-white rounded-md`}
      className={`flex flex-row justify-between px-1 py-1 text-md text-stone-600 hover:bg-primary hover:text-white rounded-md`}
      href={item.url}
      target='_blank'
    >
      <span>{item.text}</span>
      <div className='text-sm'>{item.extend}</div>
    </a>
  )
}

export default LinkBase
