import React, { useEffect, useRef, useState } from 'react'
import {
  Col,
  ConfigProvider,
  Flex,
  Input,
  Menu,
  MenuProps,
  Row,
  Tabs,
  Space,
  Button,
  Switch,
  Tag,
  InputRef,
  Tooltip
} from 'antd'
import { Header } from 'antd/es/layout/layout'

import Search from 'antd/es/input/Search'

// css
import mainLayout from '@/layout/css/index.module.scss'
import {
  AppstoreOutlined,
  DownloadOutlined,
  MailOutlined,
  MoonFilled,
  SearchOutlined,
  SettingOutlined,
  SunFilled
} from '@ant-design/icons'
// import MenuItem from 'antd/es/menu/MenuItem'

const baseStyle: React.CSSProperties = {
  // display: 'block',
  width: '25%',
  height: '60%'
}

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    label: '首页',
    key: 'mail',
    icon: <MailOutlined />
  },
  {
    label: '随笔',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: false // false
  },
  {
    label: '系列文章',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      { label: '操作系统', key: 'setting:1' },
      { label: 'MIT CS-618', key: 'setting:2' },
      { label: 'SpringBoot', key: 'setting:3' },
      { label: 'SpringCloud', key: 'setting:4' }
      // {
      //   type: 'group',
      //   label: 'Item 1',
      //   children: [
      //     { label: 'Option 1', key: 'setting:1' },
      //     { label: 'Option 2', key: 'setting:2' }
      //   ]
      // },
      // {
      //   type: 'group',
      //   label: 'Item 2',
      //   children: [
      //     { label: 'Option 3', key: 'setting:3' },
      //     { label: 'Option 4', key: 'setting:4' }
      //   ]
      // }
    ]
  },
  {
    key: 'alipay',
    label: (
      // <a href='https://ant.design' target='_blank' rel='noopener noreferrer'>
      <a href='#' target='_blank' rel='noopener noreferrer'>
        关于我
      </a>
    )
  },
  {
    key: 'alipay2',
    label: (
      // <a href='https://ant.design' target='_blank' rel='noopener noreferrer'>
      <a href='#' target='_blank' rel='noopener noreferrer'>
        关于我
      </a>
    )
  },
  {
    key: 'alipay3',
    label: (
      // <a href='https://ant.design' target='_blank' rel='noopener noreferrer'>
      <a href='#' target='_blank' rel='noopener noreferrer'>
        关于我
      </a>
    )
  },
  {
    key: 'alipay4',
    label: (
      // <a href='https://ant.design' target='_blank' rel='noopener noreferrer'>
      <a href='#' target='_blank' rel='noopener noreferrer'>
        关于我
      </a>
    )
  }
]

const Headers = () => {
  const [current, setCurrent] = useState('mail')
  const onSearch = () => {}
  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  const inputRef = useRef<InputRef>(null)

  const PopupKeyUp = (e: KeyboardEvent) => {
    console.log('keyup: ', e.code)
    if (e.ctrlKey && e.code === 'KeyK') {
      console.log('--> 按了esc', e.ctrlKey)
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', PopupKeyUp, false)
    return () => {
      //销毁键盘事件
      document.removeEventListener('keyup', PopupKeyUp, false)
    }
  }, [])

  return (
    <Flex
      // gap={'large'}
      vertical={false}
      className={'header-warpper'}
      // justify={'center'}
      align={'center'}
      style={{
        display: 'flex',
        width: '100%',
        height: '4rem',
        background: '#ffffff', // ffffff d6e4ff
        position: 'sticky',
        borderBottom: '1px solid #f6f6f6', //
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        top: 0,
        zIndex: 1
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              activeBarBorderWidth: 0, // 菜单项指示条边框宽度
              activeBarHeight: 0 // 菜单项指示条高度
              // groupTitleFontSize: 140
              // itemHeight: 100
            },
            Input: {},
            Button: {
              defaultBorderColor: '#ffffff', // 按钮默认边框颜色
              defaultHoverBg: '#efdbff', // 按钮悬停时的背景色
              defaultHoverBorderColor: '#ffffff', // 按钮悬停时的边框颜色
              defaultShadow: '#ffffff' // 按钮阴影
            }
          }
        }}
      >
        <Row
          justify={'center'}
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <Col span={4}></Col>
          <Col span={6}>
            <Flex justify={'flex-start'} align={'center'} style={{ height: '100%' }}>
              <Space.Compact size='large'>
                <Input
                  ref={inputRef}
                  addonBefore={<SearchOutlined />}
                  placeholder='想搜点什么...'
                  variant={'borderless'}
                  suffix={<Tag className={mainLayout.headerSearchSuffix}>Ctrl K</Tag>}
                />
              </Space.Compact>
            </Flex>
          </Col>
          {/*  */}
          <Col span={10}>
            <Menu
              style={{ height: '100%', alignItems: 'center', fontSize: '1.2rem' }}
              onClick={onClick}
              selectedKeys={[current]}
              mode={'horizontal'} // inline
              items={items}
            />
          </Col>
          <Col span={2}>
            <Flex gap={'large'} justify={'flex-start'} align={'center'} style={{ height: '100%' }}>
              {/* Button 做为中英文切换 */}
              <Tooltip placement='bottom' title={'中文 / English'} arrow={true}>
                <Button size='middle'>这里有个按钮</Button>
              </Tooltip>
              {/* Switch 颜色样式可能需要单独写css样式纠正, 夜间模式 */}
              <Switch
                checkedChildren={<MoonFilled />}
                unCheckedChildren={<SunFilled />}
                defaultChecked={false}
                size='default'
                onClick={() => {}} // 切换主题
              />
            </Flex>
          </Col>
          <Col span={2}></Col>
        </Row>
      </ConfigProvider>
    </Flex>
  )
}

export default Headers
