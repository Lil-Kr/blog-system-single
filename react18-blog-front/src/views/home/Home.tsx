import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Layout,
  Menu,
  Pagination,
  PaginationProps,
  Row,
  Skeleton,
  Space,
  theme
} from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import React from 'react'

import homeStyle from '@/views/home/css/home.module.scss'
import useToken from 'antd/es/theme/useToken'
import Meta from 'antd/es/card/Meta'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

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

  return (
    <Layout className={homeStyle.homeWarpper}>
      {/* <Row className='header-warpper' style={{ display: 'flex', height: '100px', background: '#fa541c' }}></Row> */}

      <Header
        className='header-warpper'
        style={{
          display: 'flex',
          height: '100px',
          background: '#fa541c',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          alignItems: 'center'
        }}
      ></Header>

      <Content
        className='content-warpper'
        style={{ marginLeft: '15%', marginRight: '15%', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div
          style={{
            display: 'flex',
            flexGrow: 1 // 让子元素撑满剩余空间
          }}
        >
          <Flex vertical={false} style={{ width: '100%', background: '#531dab' }}>
            {/* 侧边栏方式别的东西 */}
            <Col span={6} style={{ backgroundColor: '#389e0d' }}>
              left
            </Col>

            <Col span={18} style={{ backgroundColor: '#b37feb' }}>
              {/* 博客引导 */}
              <Flex vertical={true} gap={'middle'}>
                <Row gutter={24} style={{ height: '400px' }}>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                </Row>
                <Row gutter={24} style={{ height: '400px' }}>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                </Row>
                <Row gutter={24} style={{ height: '400px' }}>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                </Row>
                <Row gutter={24} style={{ height: '400px' }}>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                </Row>
                <Row gutter={24} style={{ height: '400px' }}>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card hoverable title='Card title' bordered={false} style={{ height: '100%' }}>
                      <Meta title='Europe Street beat' description='www.instagram.com' />
                    </Card>
                  </Col>
                </Row>
              </Flex>
            </Col>
          </Flex>
        </div>
      </Content>
      <Footer>
        <Pagination total={500} itemRender={itemRender} />
      </Footer>
    </Layout>
  )
}

export default Home
