import { LinkBaseType } from '@/types/components/LinkType'
import LinkBase from './LinkBase'

const LinkListBase = (props: { items: LinkBaseType[] }) => {
  const { items } = props

  return (
    <div className='flex flex-row flex-wrap gap-2'>
      {items.map((item, index) => (
        <LinkBase key={index} item={item} />
      ))}
    </div>
  )
}

export default LinkListBase
