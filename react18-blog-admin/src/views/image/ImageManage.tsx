import { CardAction } from '@/components/card'
import { ListCardPage } from '@/components/list'
import { TabType } from '@/types/common'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Tabs } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useEffect, useRef, useState } from 'react'
import type { Tab, TabPosition } from 'node_modules/rc-tabs/lib/interface'
import { ImageCategoryReqParams, ImageCategoryVO, ImageInfoVO } from '@/types/apis/image/image'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'

// api
import imageCategoryApi from '@/apis/image'
import imageInfoApi, { ImageInfoPageReqParams, ImageInfoUploadParams } from '@/apis/image/imageInfo'
import { CardActionProps } from '@/types/component/card'
import { PageData } from '@/types/base/response'
import { ImageUploadModal } from '@/components/modal'

const ImageManage = () => {
  const [btnSize] = useState<SizeType>('middle')
  const [activeKey, setActiveKey] = useState<string>('')
  const [tabsItem, setTabsItem] = useState<Tab[]>([])

  const uploadImageRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      // modalStyle: IModalStyle,
      // items: ModalType.InputType[],
      data: ImageInfoUploadParams
    ) => void
  }>()

  const create = (activeKey: string) => {
    uploadImageRef.current?.open(
      { api: imageCategoryApi },
      { title: '上传图片' },
      { action: 'create', open: true },
      { imageCategoryId: activeKey }
    )
  }

  const deleteBatch = () => {}

  /**
   * click tabs change
   * @param activeKey
   * @param e
   */
  const tabClick = (activeKey: string, e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => {
    // 处理 tab 点击事件, 这里可以根据 activeKey 和事件类型 e 进行相应逻辑处理
    setActiveKey(activeKey)
    const fetchData = async () => {
      const imageInfo = await getImageInfo({ imageCategoryId: activeKey, currentPageNum: 1, pageSize: 10 })
      const cardActionList: CardActionProps[] = imageInfo.list.map(
        ({
          surrogateId,
          imageCategoryId,
          imageCategoryName,
          number,
          name,
          imageOriginalName,
          imageType,
          imageUrl
        }) => ({
          imageName: name,
          imageUrl
        })
      )

      const updatedTabsItem = tabsItem?.map((item, index) => {
        if (item.key === activeKey) {
          return { ...item, children: <ListCardPage data={cardActionList} /> }
        } else {
          return item
        }
      })
      setTabsItem(updatedTabsItem)
    }

    fetchData()
  }

  useEffect(() => {
    const fetchData = async () => {
      const tabs = await imageCategoryList({})
      setActiveKey(tabs[0].key)
      const imageInfo = await getImageInfo({ imageCategoryId: tabs[0].key, currentPageNum: 1, pageSize: 10 })

      const cardActionList: CardActionProps[] = imageInfo.list.map(
        ({
          surrogateId,
          imageCategoryId,
          imageCategoryName,
          number,
          name,
          imageOriginalName,
          imageType,
          imageUrl
        }) => ({
          imageName: name,
          imageUrl
        })
      )

      const updatedTabsItem = await tabs.map((item, index) => {
        if (item.key === tabs[0].key) {
          return { ...item, children: <ListCardPage data={cardActionList} /> }
        } else {
          return item
        }
      })
      setTabsItem(updatedTabsItem)
    }

    fetchData()
  }, [])

  const imageCategoryList = async (params: ImageCategoryReqParams): Promise<Tab[]> => {
    const imageCategoryList = await imageCategoryApi.imageCategoryList({ ...params })
    const { code, data, msg } = imageCategoryList
    if (code !== 200) {
      return []
    }

    const tabsData: Tab[] = data.list.map(
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
    return tabsData
  }

  const getImageInfo = async (params: ImageInfoPageReqParams): Promise<PageData<ImageInfoVO>> => {
    const imageInfo = await imageInfoApi.imageInfoPageList({ ...params })
    const { code, data, msg } = imageInfo

    if (code !== 200) {
      return { list: [], total: 0 }
    } else {
      return data
    }
  }

  return (
    <>
      <Flex gap={'middle'} vertical={true}>
        <Flex className='operation-btn' vertical={false} gap='small'>
          <Button size={btnSize} type='primary' icon={<PlusOutlined />} onClick={() => create(activeKey as string)}>
            添加
          </Button>
          <Button size={btnSize} type='primary' icon={<DeleteOutlined />} danger onClick={deleteBatch}>
            删除
          </Button>
        </Flex>
        <Tabs activeKey={activeKey} type='card' tabPosition={'left'} onTabClick={tabClick} items={tabsItem} />
      </Flex>
      <ImageUploadModal mRef={uploadImageRef} update={() => {}} />
    </>
  )
}

export default ImageManage
