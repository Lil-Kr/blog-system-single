import React, { useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import { Card, Col, Flex, Row, Image, Button, Tag, List, Space, Typography, TabsProps, Tabs } from 'antd'
import {
  AppstoreAddOutlined,
  BookOutlined,
  CalendarOutlined,
  EditOutlined,
  GithubFilled,
  LikeOutlined,
  MailFilled,
  MessageOutlined,
  StarTwoTone,
  TagsOutlined,
  WechatFilled
} from '@ant-design/icons'
import ImageCarousel from './ImageCarousel'

// css
import contentLayoutStyle from './css/contentlayout.module.scss'
import { PaginationAlign, PaginationPosition } from 'antd/es/pagination/Pagination'

const gridStyle: React.CSSProperties = {
  width: '50%'
}
const gridCategoryStyle: React.CSSProperties = {
  width: '100%',
  height: '20%',
  textAlign: 'center'
}

const dataCardList = [
  {
    title: 'react18+antd5+ts+vite',
    content: 'content',
    coverImageUrl: 'http://localhost:8089/upload/image/微信图片_202404241849052.jpg'
  },
  {
    title: 'Title 2',
    content: 'content',
    coverImageUrl: 'http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg'
  },
  {
    title: 'Title 3',
    content: 'content',
    coverImageUrl: 'http://localhost:8089/upload/image/Jay1_20240422212922.png'
  },
  {
    title: 'Title 4',
    content: 'content',
    coverImageUrl: 'http://localhost:8089/upload/image/bak.webp'
  },
  {
    title: 'Title 5',
    content: 'content',
    coverImageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
  },
  {
    title: 'Title 6',
    content: 'content',
    coverImageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
  }
]

const cardDataList = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
}))

// 分类
const dataType = [
  '聊一聊如何学习前端?',
  '云原生架构下SpringCloud会不会被替代?',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.'
]

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const tabsItems: TabsProps['items'] = [
  {
    key: '1',
    label: '首页'
  },
  {
    key: '2',
    label: 'Java后端'
  },
  {
    key: '3',
    label: 'ReactJS'
  }
]

const ContentLayout = () => {
  const [position, setPosition] = useState<PaginationPosition>('bottom')
  const [align, setAlign] = useState<PaginationAlign>('center')

  return (
    <div className={contentLayoutStyle.contentWapper}>
      <Content className={'content-main'}>
        <Row className={'content-main-row'}>
          <Col className='content-main-left' span={6}>
            <Flex justify='center' align='center'>
              {/* 左侧栏的内容 */}
              <Flex className={'column-left'} gap={'large'} vertical={true}>
                <Card className={'card-column-avatar-info'}>
                  <Flex gap={'large'} align='center' vertical={true}>
                    <Image
                      className='home-avatar'
                      width={'80%'}
                      preview={false}
                      src='http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg'
                    />
                    <Flex gap={'large'} justify={'center'} align={'center'}>
                      <GithubFilled className='card-avatar-about' />
                      <WechatFilled className='card-avatar-about' />
                      <MailFilled className='card-avatar-about' />
                    </Flex>
                  </Flex>
                </Card>

                {/* 最新文章 */}
                <Card
                  className={'card-column-new-article'}
                  title={
                    <Flex vertical={false} gap={'middle'}>
                      <BookOutlined className='card-icon' />
                      <span className='card-title'>最新文章</span>
                    </Flex>
                  }
                  extra={
                    <a className='card-more' href='#'>
                      更多
                    </a>
                  }
                >
                  <List
                    dataSource={dataType}
                    // size='small'
                    renderItem={item => (
                      <List.Item>
                        <a>{item}</a>
                      </List.Item>
                    )}
                  />
                </Card>

                {/* 分类 */}
                <Card
                  className={'card-column-category'}
                  title={
                    <Flex vertical={false} gap={'middle'}>
                      <AppstoreAddOutlined className='card-icon' />
                      <span className='card-title'>分类</span>
                    </Flex>
                  }
                  extra={
                    <a className='card-more' href='#'>
                      更多
                    </a>
                  }
                >
                  <Card.Grid style={gridCategoryStyle}>Content</Card.Grid>
                  <Card.Grid style={gridCategoryStyle}>Content</Card.Grid>
                  <Card.Grid style={gridCategoryStyle}>Content</Card.Grid>
                </Card>

                {/* 标签 */}
                <Card
                  className={'card-column-tags'}
                  title={
                    <Flex vertical={false} gap={'middle'}>
                      <TagsOutlined className='card-icon' />
                      <span className='card-title'>标签</span>
                    </Flex>
                  }
                  extra={
                    <a className='card-more' href='#'>
                      更多
                    </a>
                  }
                >
                  <Flex wrap='wrap' gap='middle'>
                    <Tag bordered={false} color='magenta'>
                      Java后端
                    </Tag>
                    <Tag bordered={false} color='red'>
                      操作系统
                    </Tag>
                    <Tag bordered={false} color='volcano'>
                      volcano
                    </Tag>
                    <Tag bordered={false} color='orange'>
                      orange
                    </Tag>
                    <Tag bordered={false} color='gold'>
                      gold
                    </Tag>
                    <Tag bordered={false} color='lime'>
                      lime
                    </Tag>
                    <Tag bordered={false} color='green'>
                      green
                    </Tag>
                    <Tag bordered={false} color='cyan'>
                      cyan
                    </Tag>
                    <Tag bordered={false} color='blue'>
                      blue
                    </Tag>
                    <Tag bordered={false} color='geekblue'>
                      geekblue
                    </Tag>
                    <Tag bordered={false} color='purple'>
                      purple
                    </Tag>
                  </Flex>
                </Card>

                {/* 归档 */}
                <Card
                  className={'card-column-archive'}
                  title={
                    <Flex vertical={false} gap={'small'}>
                      <CalendarOutlined className='card-icon' />
                      <span className='card-title'>{'归档'}</span>
                    </Flex>
                  }
                  extra={
                    <a className='card-more' href='#'>
                      更多
                    </a>
                  }
                >
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                  <Card.Grid style={gridStyle}>Content</Card.Grid>
                </Card>
              </Flex>
            </Flex>
          </Col>

          <Col className='content-main-right' span={18}>
            <Flex gap={'large'} vertical={true}>
              <ImageCarousel />
              <Tabs defaultActiveKey='1' items={tabsItems} onChange={() => {}} />
              <List
                grid={{ gutter: 20, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                dataSource={dataCardList}
                pagination={{ position, align }}
                renderItem={(item, zIndex) => (
                  <List.Item>
                    <Card
                      // style={{ width: '100px', height: '300px' }}
                      // title={item.title}
                      // extra={<a href='#'>查看全部</a>}
                      // className={''}
                      hoverable
                      size={'small'}
                      cover={<img width={100} height={400} alt='example' src={item.coverImageUrl} />}
                    >
                      <Flex vertical={true} gap={'small'}>
                        <div>
                          <a href='#' style={{ fontSize: '16pt', color: '#531dab' }}>
                            {item.title}
                          </a>
                        </div>
                        <div>
                          <Tag bordered={false} color='geekblue'>
                            Java
                          </Tag>
                          <Tag bordered={false} color='purple'>
                            后端
                          </Tag>
                        </div>
                        <div>
                          <span>2023-12-26</span>
                        </div>
                      </Flex>
                    </Card>
                  </List.Item>
                )}
              />
            </Flex>
          </Col>
        </Row>
      </Content>
    </div>
  )
}

export default ContentLayout
