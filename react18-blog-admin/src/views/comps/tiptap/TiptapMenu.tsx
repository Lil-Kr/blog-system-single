import React from 'react'
import { useCurrentEditor } from '@tiptap/react'
import { Button, ConfigProvider, Divider, Dropdown, Flex, FlexProps, Menu } from 'antd'
import {
  BoldOutlined,
  CodeOutlined,
  ItalicOutlined,
  SearchOutlined,
  StrikethroughOutlined,
  UnderlineOutlined
} from '@ant-design/icons'

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff'
}

const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']

const alignOptions = ['flex-start', 'center', 'flex-end']

const TiptapMenu = () => {
  const [justify, setJustify] = React.useState<FlexProps['justify']>(justifyOptions[0])
  const [alignItems, setAlignItems] = React.useState<FlexProps['align']>(alignOptions[0])
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  } else {
    console.log('--> tiptap instance is exit')
    console.log(editor.getHTML())
    console.log(editor.getJSON())
  }

  const menu = (
    <Menu>
      <Menu.Item key='1'>菜单项一</Menu.Item>
      <Menu.Item key='2'>菜单项二</Menu.Item>
      <Menu.Item key='3'>菜单项三</Menu.Item>
    </Menu>
  )

  return (
    <div className='tiptap-menu-class'>
      <Flex flex={'flex'} gap='small'>
        <Button icon={<BoldOutlined />} />
        <Button icon={<ItalicOutlined />} />
        <Button icon={<UnderlineOutlined />} />
        <Button icon={<StrikethroughOutlined />} />
        <Button icon={<CodeOutlined />} />
      </Flex>
      <Divider />
    </div>
  )
}

export default TiptapMenu
