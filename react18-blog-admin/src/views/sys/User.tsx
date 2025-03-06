import React, { useState } from 'react'
import { CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Row, Select, Tooltip, Tree } from 'antd/lib'
import type { TreeDataNode } from 'antd'

const treeData: TreeDataNode[] = [
  {
    title: 'xx科技公司',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            icon: <CarryOutOutlined />
          },
          {
            title: (
              <>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <CarryOutOutlined />
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
            icon: <CarryOutOutlined />
          }
        ]
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
            icon: <CarryOutOutlined />
          }
        ]
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
            icon: <CarryOutOutlined />
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />
          }
        ]
      }
    ]
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-1-0-0',
            icon: <CarryOutOutlined />
          },
          {
            title: 'leaf',
            key: '0-1-0-1',
            icon: <CarryOutOutlined />,
            disabled: true
          }
        ]
      }
    ]
  }
]

const MemoTooltip = Tooltip || React.memo(Tooltip)

const User = () => {
  return (
    <Row gutter={4} style={{ height: '100%' }}>
      <Col span={4} style={{ width: '100%', height: '100%' }}>
        {/* 当Tree向右展开超出右边界时, 出现水平滚动条 */}
        <Card
          bordered={false}
          style={{ height: '100%', overflowY: 'auto', overflowX: 'auto', whiteSpace: 'nowrap', flex: '1 1 0' }}
        >
          <Tree
            showLine={true}
            showIcon={false}
            checkable={false}
            blockNode={true} // 是否节点占据一行
            treeData={treeData}
            defaultExpandAll
            titleRender={item => {
              const title = item.title as React.ReactNode
              return <MemoTooltip title={title}>{title}</MemoTooltip>
            }}
            onSelect={(key, info) => {
              // 点击树节点触发
              // console.log('--> abc: ', info.selected)
            }}
          />
        </Card>
      </Col>
      <Col span={20}>
        <Card bordered={true} style={{ textAlign: 'center', height: '100%' }}>
          {'右侧列(8份)'}
        </Card>
      </Col>
    </Row>
  )
}

export default User
