import { ListCardPage } from '@/components/list'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Tabs } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import type { Tab } from 'node_modules/rc-tabs/lib/interface'
import {
  GetImageCategoryReq,
  ImageCategoryReqParams,
  ImageCategoryType,
  ImageCategoryVO
} from '@/types/apis/image/image'
import { IAction, IModalParams, IModalRequestAction } from '@/types/component/modal'

// api
import imageCategoryApi from '@/apis/image'
import { imageInfoApi, ImageInfoUploadParams, ImageInfoVO } from '@/apis/image/imageInfo'
import { CardActionProps } from '@/types/component/card'
import { PageData } from '@/types/base/response'
import ImageUploadModal from './ImageUploadModal'

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
   *
   */
  const fetchData = useCallback(async (key: string) => {
    const imageCategory = await imageCategoryDetial({ surrogateId: key })
    const cardActionList: CardActionProps[] = (imageCategory.imageInfo?.list ?? []).map(
      ({ surrogateId, imageCategoryId, imageCategoryName, number, name, imageOriginalName, imageType, imageUrl }) => ({
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
  const tabClick = (activeKey: string, e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>) => {
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
        setActiveKey(tabs[0].key)
      }
      fristFetch()
    }
  }, [activeKey, fetchData])

  const imageCategoryList = async (params: ImageCategoryReqParams): Promise<Tab[]> => {
    const imageCategoryList = await imageCategoryApi.imageCategoryList({ ...params })
    const { code, data, msg } = imageCategoryList
    if (code !== 200) {
      return []
    }

    const tabsData: Tab[] = data.list.map(
      ({ surrogateId, number, name, imageUrl, status, createTime, updateTime, remark }) => ({
        key: surrogateId ? surrogateId : '',
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

  const imageCategoryDetial = async (params: GetImageCategoryReq): Promise<ImageCategoryVO> => {
    const imageCategoryDetial = await imageCategoryApi.get({ ...params })
    const { code, data, msg } = imageCategoryDetial

    if (code !== 200) {
      return {} as ImageCategoryType
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
