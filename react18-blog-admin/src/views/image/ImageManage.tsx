import { PlusOutlined } from '@ant-design/icons'
import { Flex, Tabs } from 'antd'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import type { Tab } from 'node_modules/rc-tabs/lib/interface'
import { GetImageCategoryReq, ImageCategoryReq, ImageCategory, ImageCategoryVO } from '@/types/apis/image/imageType'
import { CardActionProps } from '@/types/component/card'
import { PageData } from '@/types/base/response'
import ImageUploadModal from './ImageUploadModal'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { ListCardPage } from '@/components/blog/imageManage/indext'
import { AddImageButtonAcl } from './auth/authImageButton'
import { UploadImageModalState, useUploadImageModalStateStore } from '@/store/blog/imageStore'

// api
import imageCategoryApi from '@/apis/image/imageCategoryApi'

const ImageManage = () => {
  const { btnSize, tableSize } = useGlobalStyleStore()
  const [activeKey, setActiveKey] = useState<string>('')
  const [tabsItem, setTabsItem] = useState<Tab[]>([])
  const { setUploadImageModalState } = useUploadImageModalStateStore()

  const create = () => {
    const modalReq: UploadImageModalState = {
      api: imageCategoryApi,
      openModal: true,
      title: '图片上传',
      fileList: [],
      modalReq: { imageCategoryId: activeKey },
      update: () => {
        imageCategoryDetial({ surrogateId: activeKey })
      }
    }
    setUploadImageModalState(modalReq)
  }

  useEffect(() => {
    initTabs()
  }, [])

  const initTabs = async () => {
    const tabsData = await retrieveImageCategoryList({})
    // 默认选中第一个
    const tabKey = tabsData[0].key
    setActiveKey(tabKey)

    await imageCategoryDetial({ surrogateId: tabKey })
  }

  /**
   * click tabs change
   * @param activeKey
   * @param e
   */
  const tabOnClick = (activeKey: string, e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => {
    // 处理 tab 点击事件, 这里可以根据 activeKey 和事件类型 e 进行相应逻辑处理
    setActiveKey(activeKey)
    imageCategoryDetial({ surrogateId: activeKey })
  }

  /**
   * 加载图片分类列表, 用于 tab 切换时调用
   * @param req
   * @returns
   */
  const retrieveImageCategoryList = async (req: ImageCategoryReq): Promise<Tab[]> => {
    const imageCategoryList = await imageCategoryApi.nameList({ ...req })
    const { code, data } = imageCategoryList
    if (code !== 200) {
      return []
    }

    const tabsData: Tab[] = data.map(({ surrogateId, name, ...rest }) => ({
      key: surrogateId,
      label: name,
      ...rest
    }))
    setTabsItem(tabsData)
    return tabsData
  }

  /**
   * 加载图片明细
   * @param req
   * @returns
   */
  const imageCategoryDetial = async (req: GetImageCategoryReq): Promise<ImageCategoryVO> => {
    const imageCategoryDetial = await imageCategoryApi.get({ ...req })
    const { code, data } = imageCategoryDetial

    if (code !== 200) {
      return {} as ImageCategory
    }

    const cardActionList: CardActionProps[] = (data.imageInfo?.list ?? []).map(({ surrogateId, name, imageUrl }) => ({
      id: surrogateId,
      imageName: name,
      imageUrl
    }))
    const ListCardPageItem: PageData<CardActionProps> = {
      list: cardActionList,
      total: data.imageInfo?.total ?? 0
    }

    setTabsItem(pre =>
      pre.map(item =>
        item.key === req.surrogateId ? { ...item, children: <ListCardPage data={ListCardPageItem} /> } : item
      )
    )
    return data
  }

  return (
    <>
      <Flex gap={'middle'} vertical={true}>
        <Flex className='operation-btn' vertical={false} gap='small'>
          <AddImageButtonAcl text={'添加'} size={btnSize} type='primary' icon={<PlusOutlined />} onClick={create} />
        </Flex>
        <Tabs
          activeKey={activeKey}
          type='card'
          tabPosition={'left'}
          // onChange={onTabChange}
          onTabClick={tabOnClick}
          items={tabsItem}
        />
      </Flex>
      <ImageUploadModal />
    </>
  )
}

export default ImageManage
