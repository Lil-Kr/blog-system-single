import React, { useRef, useState } from 'react'
import { Button, Flex, Radio, Slider, Space } from 'antd'
import { BlogContenType } from '@/types/entity/blog'
import { useForm } from 'antd/es/form/Form'
import { BaseModal, FullScreenModal } from '@/components/modal'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { LabelApi } from '@/types/apis/blog/label'
import labelApi from '@/apis/blog/label'

const Blogs = () => {
  const [blogsForm] = useForm()

  const blogsRef = useRef<{
    open: (
      requestParams: IModalRequestAction,
      params: IModalParams,
      type: IAction,
      items: ModalType.InputType[],
      data?: any
    ) => void
  }>()

  /**
   * 创建博客, 打开modal
   */
  const createBlog = () => {
    let param = blogsRef.current?.open(
      { api: labelApi },
      { title: '创建博客' },
      { action: 'create', open: true },
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

  const deleteBlog = () => {}

  return (
    <div className='blogs-publish-index-warpper'>
      <Flex gap='small' align='flex-start' vertical>
        <Flex gap='small'>
          <Button type='primary' onClick={createBlog}>
            新建博客
          </Button>
          <Button type='primary' danger onClick={deleteBlog}>
            删除博客
          </Button>
        </Flex>
      </Flex>
      <FullScreenModal mRef={blogsRef} update={() => {}} />
    </div>
  )
}

export default Blogs
