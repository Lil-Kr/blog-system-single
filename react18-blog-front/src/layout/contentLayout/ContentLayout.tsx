import React from 'react'
import { Content } from 'antd/es/layout/layout'
import { Card, Col, Flex, Row, Image, Button, Tag, List, Space } from 'antd'
import {
  EditOutlined,
  EllipsisOutlined,
  GithubFilled,
  GithubOutlined,
  MailFilled,
  SettingOutlined,
  StarOutlined,
  MessageOutlined,
  LikeOutlined,
  StarTwoTone,
  WechatFilled
} from '@ant-design/icons'

// css
import mainLayout from '@/layout/css/index.module.scss'
import ImageCarousel from './ImageCarousel'

const gridStyle: React.CSSProperties = {
  width: '50%',
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

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const ContentLayout = () => {
  return (
    <Content
      className={mainLayout.contentWapper}
      style={{
        display: 'flex',
        marginLeft: '8%',
        marginRight: '8%',
        flexDirection: 'column',
        height: '100%'
        // backgroundColor: '#ffffff'
      }}
    >
      <Row className='content-row' style={{ width: '100%' }}>
        <Col className='content-main-left' span={6}>
          <Flex justify='center' align='center'>
            {/* 左侧栏的内容 */}
            <Flex gap='large' vertical={true} style={{ width: '80%', minHeight: '100hv' }}>
              <Card>
                <Flex gap={'large'} align='center' vertical={true}>
                  <Image
                    className='home-avatar'
                    width={'80%'}
                    preview={false}
                    style={{ borderRadius: '20%', marginTop: '10%' }}
                    // wrapperStyle={{ display: 'none' }}
                    src='http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg'
                  />
                  <Flex gap={'large'} justify={'center'} align={'center'}>
                    <GithubFilled style={{ fontSize: '16pt' }} />
                    <WechatFilled style={{ fontSize: '16pt' }} />
                    <MailFilled style={{ fontSize: '16pt' }} />
                  </Flex>
                </Flex>
              </Card>

              {/* 最新文章 */}
              <Card title='最新文章' style={{ width: '100%' }} extra={<a href='#'>更多</a>}>
                <li>Card content</li>
                <li>Card content</li>
                <li>Card content</li>
              </Card>

              <Card title='分类' style={{ width: '100%' }} extra={<a href='#'>更多</a>}>
                <Flex wrap='wrap' gap='small'>
                  <Tag color='magenta'>Java后端</Tag>
                  <Tag color='red'>操作系统</Tag>
                  <Tag color='volcano'>volcano</Tag>
                  <Tag color='orange'>orange</Tag>
                  <Tag color='gold'>gold</Tag>
                  <Tag color='lime'>lime</Tag>
                  <Tag color='green'>green</Tag>
                  <Tag color='cyan'>cyan</Tag>
                  <Tag color='blue'>blue</Tag>
                  <Tag color='geekblue'>geekblue</Tag>
                  <Tag color='purple'>purple</Tag>
                </Flex>
              </Card>

              <Card title='标签' style={{ width: '100%' }} extra={<a href='#'>更多</a>}>
                <Flex wrap='wrap' gap='small'>
                  <Tag color='#f50'>#f50</Tag>
                  <Tag color='#2db7f5'>#2db7f5</Tag>
                  <Tag color='#87d068'>#87d068</Tag>
                  <Tag color='#108ee9'>#108ee9</Tag>
                </Flex>
              </Card>

              <Card title='归档' style={{ width: '100%' }} extra={<a href='#'>更多</a>}>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
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
            <List
              grid={{ gutter: 18, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
              dataSource={dataCardList}
              renderItem={(item, zIndex) => (
                <List.Item>
                  <Card
                    // style={{ width: '100px', height: '300px' }}
                    // title={item.title}
                    // extra={<a href='#'>查看全部</a>}
                    // className={''}
                    size={'small'}
                    hoverable
                    cover={<img width={100} height={400} alt='example' src={item.coverImageUrl} />}
                  >
                    {/* <Meta title='Card title' description='This is the description' /> */}
                    <Flex vertical={true} gap={'small'}>
                      <div>
                        <a href='#' style={{ fontSize: '16pt', color: '#531dab' }}>
                          {item.title}
                        </a>
                      </div>
                      <div>
                        <Tag color='geekblue'>Java</Tag>
                        <Tag color='purple'>后端</Tag>
                      </div>
                    </Flex>
                  </Card>
                </List.Item>
              )}
            />

            <List
              itemLayout='vertical'
              size='small'
              dataSource={cardDataList}
              renderItem={(item, zIndex) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText icon={StarTwoTone} text='156' key='list-vertical-star-o' />,
                    <IconText icon={LikeOutlined} text='156' key='list-vertical-like-o' />,
                    <IconText icon={MessageOutlined} text='2' key='list-vertical-message' />
                  ]}
                  extra={
                    <img
                      width={200}
                      height={150}
                      // alt='logo'
                      src='http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg'
                    />
                  }
                >
                  <List.Item.Meta
                    // avatar={<Avatar src={item.avatar} />} // 头像
                    // avatar={
                    //   <img
                    //     width={200}
                    //     height={150}
                    //     src={'http://localhost:8089/upload/image/微信图片_20240424184905_1784582176919130112.jpg'}
                    //   />
                    // } // 头像
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description} // 描述
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </Flex>
        </Col>
      </Row>
    </Content>
  )
}

export default ContentLayout
