import { PlusOutlined } from '@ant-design/icons'
import { Flex, Tabs } from 'antd/lib'
import React, { useEffect, useState } from 'react'
import type { Tab } from 'node_modules/rc-tabs/lib/interface'
import { GetImageCategoryReq, ImageCategoryReq } from '@/types/apis/image/imageType'
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
  const { btnSize } = useGlobalStyleStore()
  const [activeKey, setActiveKey] = useState<string>('')
  const [tabsItem, setTabsItem] = useState<Tab[]>([])
  const { setUploadImageModalState } = useUploadImageModalStateStore()

  const create = () => {
    const modalReq: UploadImageModalState = {
      api: imageCategoryApi,
      openModal: true,
      title: '图片上传',
      fileList: [],
      uploadFiles: [],
      modalReq: { imageCategoryId: activeKey },
      update: () => {
        retireveImageCategoryDetial({ surrogateId: activeKey })
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

    await retireveImageCategoryDetial({ surrogateId: tabKey })
  }

  /**
   * click tabs change
   * @param activeKey
   * @param e
   */
  const tabOnClick = (activeKey: string, e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => {
    // 处理 tab 点击事件, 这里可以根据 activeKey 和事件类型 e 进行相应逻辑处理
    setActiveKey(activeKey)
    retireveImageCategoryDetial({ surrogateId: activeKey })
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

    const tabs: Tab[] = data.map(({ surrogateId, name, ...rest }) => ({
      key: surrogateId,
      label: name,
      ...rest
    }))
    setTabsItem(tabs)
    return tabs
  }

  /**
   * 刷新图片列表
   */
  const refreshImageList = async () => {
    await retireveImageCategoryDetial({ surrogateId: activeKey })
  }

  /**
   * 加载图片明细
   * @param req
   * @returns
   */
  const retireveImageCategoryDetial = async (req: GetImageCategoryReq) => {
    const imageCategoryDetial = await imageCategoryApi.get({ ...req })
    const { code, data } = imageCategoryDetial
    if (code !== 200) {
      return {} as PageData<CardActionProps>
    }

    const cardActionList: CardActionProps[] = (data.imageInfo?.list ?? []).map(({ surrogateId, name, imageUrl }) => ({
      id: surrogateId,
      imageName: name,
      imageUrl
    }))
    const listCardPageItem: PageData<CardActionProps> = {
      list: cardActionList,
      total: data.imageInfo?.total ?? 0
    }

    setTabsItem(pre =>
      pre.map(item =>
        item.key === req.surrogateId
          ? {
              ...item,
              children: <ListCardPage data={listCardPageItem} update={() => refreshImageList()} />
            }
          : item
      )
    )
  }

  return (
    <>
      <Flex gap={8} vertical={true}>
        <Flex className='operation-btn' vertical={false} gap={10}>
          <AddImageButtonAcl text={'添加'} size={btnSize} type='primary' icon={<PlusOutlined />} onClick={create} />
        </Flex>
        <Tabs activeKey={activeKey} type='card' tabPosition={'left'} onTabClick={tabOnClick} items={tabsItem} />
      </Flex>
      <ImageUploadModal />
    </>
  )
}

export default ImageManage
