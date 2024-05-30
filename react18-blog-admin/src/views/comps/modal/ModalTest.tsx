import React, { useRef, useState } from 'react'
import { Button, Divider, Flex, Radio, Slider, Space } from 'antd'
import { BlogContenType } from '@/types/entity/blog'
import { useForm } from 'antd/es/form/Form'
import { BaseModal, FullScreenModal } from '@/components/modal'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import labelApi from '@/apis/blog/label'

const ModalTest = () => {
  const [baseModalTestForm] = useForm()

  const baseModalTestRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      modalStyle: IModalStyle,
      items: ModalType.InputType[],
      data: BlogContenType.BlogContentShow
    ) => void
  }>()

  const fullScreenModalTestRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      items: ModalType.InputType[],
      data: BlogContenType.BlogContentShow
    ) => void
  }>()

  /**
   * 打开基础款modal
   */
  const openBaseModal = () => {
    let param = baseModalTestRef.current?.open(
      { api: labelApi },
      { title: '创建博客' },
      { action: 'create', open: true }, // create | edit | look
      { style: { maxWidth: '30vw' } },
      [
        {
          name: 'number',
          label: '编号',
          textValue: '编号, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '编号不能为空' }]
        },
        {
          name: 'name',
          label: '姓名',
          textValue: '姓名, 必填',
          style: { width: '100%' }
        },
        {
          name: 'remark',
          label: '备注',
          textValue: '备注, 必填',
          style: { width: '100%' }
        }
      ],
      { key: '1', number: '007', name: 'cy', remark: '备注' }
    )
  }

  /**
   * 打开全屏modal
   */
  const openFullScreenModal = () => {
    let param = fullScreenModalTestRef.current?.open(
      { api: labelApi },
      { title: '创建博客' },
      { action: 'create', open: true }, // create | edit | look
      [
        {
          name: 'number',
          label: '编号',
          textValue: '编号, 必填',
          style: { width: '100%' },
          rules: [{ required: true, message: '编号不能为空' }]
        },
        {
          name: 'name',
          label: '姓名',
          textValue: '姓名, 必填',
          style: { width: '100%' }
        },
        {
          name: 'remark',
          label: '备注',
          textValue: '备注, 必填',
          style: { width: '100%' }
        }
      ],
      { key: '1', number: '007', name: 'cy', remark: '备注' }
    )
  }

  return (
    <div className='blogs-publish-index-warpper' style={{ maxWidth: '100vw' }}>
      <Flex gap='small' align='flex-start' vertical>
        <Flex>
          <Divider orientation='right' plain>
            这是Model组件的封装
          </Divider>
        </Flex>
        <Flex gap='small'>
          <Button type='primary' onClick={openBaseModal}>
            打开自定义Modal, 可禁用输入框
          </Button>
          <Button type='primary' danger onClick={openFullScreenModal}>
            打开全屏Modal, 可禁用输入框
          </Button>
        </Flex>

        <Flex gap='small' className='site-button-ghost-wrapper'>
          {/* <Button type='primary'>测试按钮</Button> */}
          <FullScreenModal mRef={fullScreenModalTestRef} />
          <BaseModal
            mRef={baseModalTestRef}
            innerComponent={'all-input'}
            update={() => {
              console.log('--> 关闭modal的回调')
            }}
          />
        </Flex>
      </Flex>
    </div>
  )
}

export default ModalTest
