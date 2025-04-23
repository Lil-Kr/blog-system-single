import React, { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TocNode extends TocItem {
  children: TocNode[]
}

const buildTocTree = (toc: TocItem[]): TocNode[] => {
  const root: TocNode[] = []
  const stack: TocNode[] = []

  toc.forEach(item => {
    const node: TocNode = { ...item, children: [] }

    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      root.push(node)
    } else {
      stack[stack.length - 1].children.push(node)
    }

    stack.push(node)
  })

  return root
}

const AnchorPointBase = (props: { paragraph: string }) => {
  const { paragraph } = props
  const [tocTree, setTocTree] = useState<TocNode[]>([])

  useEffect(() => {
    if (paragraph && paragraph.length > 0) {
      const tocList: TocItem[] = JSON.parse(paragraph)
      const tocTreeData = buildTocTree(tocList)
      setTocTree(tocTreeData)
    }
  }, [paragraph])

  return (
    <div className='flex flex-col'>
      <ul className='pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1'>
        {tocTree.map(item => (
          <li key={item.id} className='ml-2'>
            <a
              href={`#${item.id}`}
              className='text-md text-indigo-600 dark:text-purple-300 hover:underline transition-colors duration-200'
            >
              {item.text}
            </a>
            {item.children.length > 0 && <TocTree items={item.children} />}
          </li>
        ))}
      </ul>
    </div>
  )
}

const TocTree = ({ items }: { items: TocNode[] }) => {
  return (
    <ul className='pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1'>
      {items.map(item => (
        <li key={item.id} className='ml-2'>
          <a
            href={`#${item.id}`}
            className='text-sm text-indigo-600 dark:text-purple-300 hover:underline transition-colors duration-200'
          >
            {item.text}
          </a>
          {item.children.length > 0 && <TocTree items={item.children} />}
        </li>
      ))}
    </ul>
  )
}

export default AnchorPointBase
