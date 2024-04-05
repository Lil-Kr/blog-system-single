import React, { useRef, useState } from 'react'
import { Button, Flex, Radio, Slider, Space } from 'antd'
import { BlogContenType } from '@/types/entity/blog'
import { useForm } from 'antd/es/form/Form'
import { FullScreenModal } from '@/components/modal'
import { IAction, IModalParams, IModalRequestAction } from '@/types/modal'
import { LabelApi } from '@/types/apis/blog/label'
import labelApi from '@/apis/blog/label'

const Blogs = () => {
  const [blogsForm] = useForm()

  const blogsRef = useRef<{
    open: (
      requestParams: IModalRequestAction<LabelApi>,
      params: IModalParams,
      type: IAction,
      data: BlogContenType.BlogContentShow
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
      { key: 'sss', number: 'sss', name: 'sss', remark: 'sss' }
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

        <Flex gap='small' className='site-button-ghost-wrapper'>
          {/* <Button type='primary'>测试按钮</Button> */}
          <FullScreenModal mRef={blogsRef} />
        </Flex>
      </Flex>
    </div>
  )
}

export default Blogs
