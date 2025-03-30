import { PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Tabs } from 'antd'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import type { Tab } from 'node_modules/rc-tabs/lib/interface'
import { GetImageCategoryReq, ImageCategoryReq, ImageCategory, ImageCategoryVO } from '@/types/apis/image/imageType'
import { IAction, IModalParams, IModalRequestAction } from '@/types/component/modal'
import { ImageInfoUploadReq } from '@/apis/image/imageInfoApi'
import { CardActionProps } from '@/types/component/card'
import { PageData } from '@/types/base/response'
import ImageUploadModal from './ImageUploadModal'
import { useGlobalStyleStore } from '@/store/global/globalStore'
import { ListCardPage } from '@/components/blog/imageManage/indext'

// api
import imageCategoryApi from '@/apis/image/imageCategoryApi'

const ImageManage = () => {
  const { btnSize, tableSize } = useGlobalStyleStore()
  const [activeKey, setActiveKey] = useState<string>('')
  const [tabsItem, setTabsItem] = useState<Tab[]>([])

  const uploadImageRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      // modalStyle: IModalStyle,
      // items: ModalType.InputType[],
      data: ImageInfoUploadReq
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

  /**
   *
   */
  const fetchData = useCallback(async (key: string) => {
    const imageCategory = await imageCategoryDetial({ surrogateId: key })
    const cardActionList: CardActionProps[] = (imageCategory.imageInfo?.list ?? []).map(
      ({ surrogateId, name, imageUrl }) => ({
        id: surrogateId,
        imageName: name,
        imageUrl
      })
    )
    const ListCardPageItem: PageData<CardActionProps> = {
      list: cardActionList,
      total: imageCategory.imageInfo?.total ?? 0
    }

    setTabsItem(pre =>
      pre.map(item => (item.key === key ? { ...item, children: <ListCardPage data={ListCardPageItem} /> } : item))
    )
  }, [])

  /**
   * click tabs change
   * @param activeKey
   * @param e
   */
  const tabOnClick = (activeKey: string, e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => {
    // 处理 tab 点击事件, 这里可以根据 activeKey 和事件类型 e 进行相应逻辑处理
    setActiveKey(activeKey)
    fetchData(activeKey)
  }

  useEffect(() => {
    if (activeKey) {
      fetchData(activeKey)
    } else {
      const fristFetch = async () => {
        const tabs = await imageCategoryList({})
        setTabsItem(tabs)
        // 默认选中第一个
        setActiveKey(tabs[0].key)
      }
      fristFetch()
    }
  }, [activeKey, fetchData])

  /**
   * 加载图片分类列表
   * @param req
   * @returns
   */
  const imageCategoryList = async (req: ImageCategoryReq): Promise<Tab[]> => {
    const imageCategoryList = await imageCategoryApi.imageCategoryList({ ...req })
    const { code, data } = imageCategoryList
    if (code !== 200) {
      return []
    }

    const tabsData: Tab[] = data.list.map(({ surrogateId, name, ...rest }) => ({
      key: surrogateId,
      label: name,
      ...rest
    }))
    return tabsData
  }

  /**
   * 加载图片明细
   * @param params
   * @returns
   */
  const imageCategoryDetial = async (params: GetImageCategoryReq): Promise<ImageCategoryVO> => {
    const imageCategoryDetial = await imageCategoryApi.get({ ...params })
    const { code, data } = imageCategoryDetial

    if (code !== 200) {
      return {} as ImageCategory
    }
    return data
  }

  const onTabChange = (activeKey: string) => {}

  return (
    <>
      <Flex gap={'middle'} vertical={true}>
        <Flex className='operation-btn' vertical={false} gap='small'>
          <Button size={btnSize} type='primary' icon={<PlusOutlined />} onClick={() => create(activeKey as string)}>
            {'添加'}
          </Button>
        </Flex>
        <Tabs
          activeKey={activeKey}
          type='card'
          tabPosition={'left'}
          onChange={onTabChange}
          onTabClick={tabOnClick}
          items={tabsItem}
        />
      </Flex>
      <ImageUploadModal
        mRef={uploadImageRef}
        update={() => {
          fetchData(activeKey)
        }}
      />
    </>
  )
}

export default ImageManage
