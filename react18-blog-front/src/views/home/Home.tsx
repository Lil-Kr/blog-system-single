import React, { useState } from 'react'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import useToken from 'antd/es/theme/useToken'
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
import Search from 'antd/es/input/Search'
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  FlexProps,
  Layout,
  Menu,
  Pagination,
  PaginationProps,
  Row,
  Segmented,
  SegmentedProps,
  Skeleton,
  Space,
  Image,
  theme,
  Upload,
  ConfigProvider,
  Divider,
  Tag,
  Typography,
  Carousel,
  List
} from 'antd'
import { Headers } from '@/layout/header'
const { Title, Paragraph, Text, Link } = Typography

// css
import homeStyle from '@/views/home/css/home.module.scss'

const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']
const alignOptions = ['flex-start', 'center', 'flex-end']

const cardStyle: React.CSSProperties = {
  width: '90%'
}

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 200
}

const gridStyle: React.CSSProperties = {
  width: '50%',
  textAlign: 'center'
}

/**
 * 图片轮播
 */
const contentStyle: React.CSSProperties = {
  height: '600px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
}

const data = [
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
    coverImageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
  },
  {
    title: 'Title 4',
    content: 'content',
    coverImageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
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

const dataList = Array.from({ length: 23 }).map((_, i) => ({
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

const Home = () => {
  const [colorBgContainer] = useToken()
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>
    }
    if (type === 'next') {
      return <a>Next</a>
    }
    return originalElement
  }

  const [justify, setJustify] = useState<FlexProps['justify']>(justifyOptions[1])
  const [alignItem, setAlignItems] = useState<FlexProps['align']>(alignOptions[1])

  return (
    <Layout className={homeStyle.homeWarpper}>
      <Header className={'header-warpper'}>
        <Flex vertical={false} gap={'large'}>
          <div>ababa</div>
          <div>ababa</div>
          <div>ababa</div>
          <div>ababa</div>
        </Flex>
      </Header>
      {/* <Headers /> */}
      <Content
        className='content-warpper'
        style={{ marginLeft: '15%', marginRight: '15%', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Row className='content-main' style={{ width: '100%', flexGrow: 1 }}>
          {/* 左侧栏 */}
          <Col className='content-main-right' span={6} style={{ backgroundColor: '#d9f7be', alignItems: 'center' }}>
            <Flex gap='large' vertical={true} style={{ width: '80%', backgroundColor: '#d6e4ff' }}>
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
                  <Flex gap={'large'} justify={justify} align={alignItem}>
                    <GithubFilled style={{ fontSize: '16pt' }} />
                    <WechatFilled style={{ fontSize: '16pt' }} />
                    <MailFilled style={{ fontSize: '16pt' }} />
                  </Flex>
                </Flex>
              </Card>
              {/* <Divider type='horizontal' /> */}

              {/* 最新文章 */}
              <Card title='最新文章' style={{ width: '100%' }} extra={<a href='#'>更多</a>}>
                <li>Card content</li>
                <li>Card content</li>
                <li>Card content</li>
              </Card>
              <Card title='分类' style={{ width: '100%' }} extra={<a href='#'>更多</a>}>
                <Flex wrap='wrap' gap='small'>
                  <Tag color='magenta'>magenta</Tag>
                  <Tag color='red'>red</Tag>
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
              </Card>
            </Flex>
          </Col>

          {/* 左侧 */}
          <Col className='content-main-left' span={18} style={{ backgroundColor: '#efdbff' }}>
            <List
              grid={{ gutter: 18, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
              dataSource={data}
              renderItem={(item, zIndex) => (
                <List.Item>
                  <Card
                    // style={{ width: '400px', height: '400px' }}
                    // title={item.title}
                    // extra={<a href='#'>查看全部</a>}
                    // className={''}
                    size={'small'}
                    hoverable
                    cover={<img width={100} height={300} alt='example' src={item.coverImageUrl} />}
                  >
                    {/* <Meta title='Card title' description='This is the description' /> */}
                    <Flex vertical={true} gap={'small'}>
                      <div>
                        <a href='#' style={{ fontSize: '20pt', color: '#531dab' }}>
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
              dataSource={dataList}
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
          </Col>
        </Row>
      </Content>
      <Footer>
        <Pagination total={500} itemRender={itemRender} />
      </Footer>
    </Layout>
  )
}

export default Home
