import { CardAction } from '@/components/card'
import ListCard from '@/components/list/ListCard'
import { TabType } from '@/types/common'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Tabs } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useEffect, useState } from 'react'
import type { Tab, TabPosition } from 'node_modules/rc-tabs/lib/interface'
import { ImageCategoryReqParams, ImageInfoReqParams } from '@/types/apis/image/image'

// api
import imageCategoryApi from '@/apis/image'
import imageInfoApi from '@/apis/image/imageInfo'

// const tabsItem: Tab[] = [
//   {
//     key: '1',
//     label: '博客封面'
//   },
//   {
//     key: '2',
//     label: '专辑图片'
//   },
//   {
//     key: '3',
//     label: '文章图片'
//   }
// ]

const ImageManage = () => {
  const [tabPosition, setTabPosition] = useState<TabPosition>('left')
  const [btnSize] = useState<SizeType>('middle')
  const [activeKey, setActiveKey] = useState<string>()
  const [tabsItem, setTabsItem] = useState<Tab[]>()

  const create = () => {}

  const deleteBatch = () => {}

  const tabClick = (activeKey: string, e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => {
    // 处理 tab 点击事件，这里可以根据 activeKey 和事件类型 e 进行相应逻辑处理
    console.log('--> ', { activeKey })
    // todo: 根据key请求后端接口
    getImageInfo({ surrogateId: activeKey })
    // setActiveKey(activeKey)
  }

  useEffect(() => {
    imageCategoryList({})
  }, [])

  const imageCategoryList = async (params: ImageCategoryReqParams) => {
    const imageCategoryList = await imageCategoryApi.imageCategoryList({ ...params })
    const { code, data, msg } = imageCategoryList
    if (code !== 200) {
      return []
    }

    const tabsData = data.list.map(
      ({ surrogateId, number, name, imageUrl, status, createTime, updateTime, remark }) => ({
        key: surrogateId,
        label: name
        // number,
        // name,
        // imageUrl,
        // status,
        // createTime,
        // updateTime,
        // remark
      })
    )

    setTabsItem(tabsData)
    getImageInfo({ surrogateId: tabsData[0].key })
  }

  const getImageInfo = async (params: ImageInfoReqParams) => {
    const imageInfo = await imageInfoApi.get({ ...params })
    const { code, data, msg } = imageInfo

    tabsItem?.map((item, index) => {
      if (item.key === params.surrogateId) {
        item.children = JSON.stringify(imageInfo)
      }
    })

    // console.log('--> tabsItem: ', tabsItem)
    setTabsItem(tabsItem)
    setActiveKey(params.surrogateId)
  }

  return (
    <Flex gap={'middle'} vertical={true}>
      <Flex className='operation-btn' vertical={false} gap='small'>
        <Button size={btnSize} type='primary' icon={<PlusOutlined />} onClick={create}>
          添加
        </Button>
        <Button size={btnSize} type='primary' icon={<DeleteOutlined />} danger onClick={deleteBatch}>
          删除
        </Button>
      </Flex>
      <Tabs activeKey={activeKey} type='card' tabPosition={'left'} onTabClick={tabClick} items={tabsItem} />
    </Flex>
  )
}

export default ImageManage
