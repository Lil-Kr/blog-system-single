import React, { useEffect, useImperativeHandle, useState } from 'react'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { Modal, Form, Input, InputNumber, Select } from 'antd/lib'
const { TextArea } = Input
import { OptionType, transformTypeToSeletor } from '@/types/apis'
import { AclModuleAddReq, AclModuleEditReq } from '@/types/apis/sys/acl/aclType'
import { useAclModuleStore, useDictDetailStore } from '@/store/global/initDictStore'
import { DictMapType } from '@/types/apis/sys/dict/dictType'
import { useMessage } from '@/components/message/MessageProvider'
import { useAclModuleModalStore } from '@/store/sys/aclStore'

const AclModuleModal = (props: ModalType.CustomModal) => {
  const messageApi = useMessage()
  const [modalForm] = Form.useForm()
  const { update } = props
  const { aclModuleSelector } = useAclModuleStore()
  const {
    api,
    title,
    action,
    openModal,
    modalStyle,
    setOpenModal,
    data,
    inputDisabled,
    setInputDisabled,
    modalSelector,
    setModalSelector
  } = useAclModuleModalStore()
  const { dictMap, dictStatues } = useDictDetailStore()

  /**
   * 初始化modal框
   */
  useEffect(() => {
    if (openModal) {
      initData()
    }
  }, [openModal])

  // 初始化数据
  const initData = () => {
    modalForm.resetFields()
    if (action === 'create') {
      // 绑定父级权限模块初始值
      const aclModule = aclModuleSelector.find(item => item.label === '-')
      const parentAclModuleInfo: OptionType = {
        label: aclModule?.label ?? '',
        value: aclModule?.value ?? ''
      }

      // 绑定状态初始值
      const statues = dictStatues.find(item => item.label === '正常')
      const statusInfo: OptionType = {
        value: statues?.value ?? '',
        label: statues?.label ?? ''
      }

      modalForm.setFieldsValue({
        parentAclModuleInfo: parentAclModuleInfo,
        statusInfo: statusInfo
      })
      setModalSelector(parentAclModuleInfo, statusInfo)
    } else if (action === 'edit') {
      const statusInfo: OptionType = {
        value: data?.status?.toString() ?? '',
        label: dictStatues.find(item => item.value === data?.status?.toString())?.label ?? ''
      }
      modalForm.setFieldsValue({
        ...data,
        statusInfo: statusInfo
      })
      setModalSelector(data?.parentAclModuleInfo ?? { label: '', value: '' }, statusInfo)
    }
  }

  /**
   * 点击保存按钮事件
   * @returns
   */
  const handleOk = async () => {
    // 校验表单数据是否合法
    const valid = await modalForm.validateFields()

    // 获取表单数据
    const params = modalForm.getFieldsValue()
    if (!valid) {
      return
    }
    if (action === 'create') {
      const addReq: AclModuleAddReq = {
        name: params.name,
        parentSurrogateId: modalSelector?.parentAclModuleInfo?.value ?? '0',
        seq: params.seq,
        status: Number.parseInt(modalSelector?.statusInfo.value ?? '0'),
        remark: params.remark
      }
      const res = await api.add!(addReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else if (action === 'edit') {
      const editReq: AclModuleEditReq = {
        surrogateId: params.key,
        name: params.name,
        parentSurrogateId: modalSelector?.parentAclModuleInfo?.value ?? '0',
        seq: params.seq,
        status: Number.parseInt(modalSelector?.statusInfo.value ?? '0'),
        remark: params.remark
      }
      const res = await api.edit!(editReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else {
      return
    }
    handleCancel()
    update()
  }

  /**
   * 选择状态时触发
   * @param value
   */
  const handleChangeStatus = (value: string) => {
    const statusInfo = dictStatues.find(item => item.value === value) ?? {
      value: '',
      label: ''
    }
    setModalSelector(
      modalSelector?.parentAclModuleInfo ?? {
        value: '',
        label: ''
      },
      statusInfo
    )
  }

  /**
   * 选择父级权限模块时触发
   * @param value
   */
  const handleParentAclModuleChange = (value: string) => {
    const parentAclModuleInfo = aclModuleSelector.find(item => item.value === value) ?? {
      value: '',
      label: ''
    }
    setModalSelector(
      parentAclModuleInfo,
      modalSelector?.statusInfo ?? {
        value: '',
        label: ''
      }
    )
  }

  /**
   * 点击取消按钮事件
   */
  const handleCancel = () => {
    setOpenModal(false)
    setInputDisabled(false)
    modalForm.resetFields()
  }

  return (
    <div className='baseModal'>
      <Modal
        style={modalStyle}
        title={title}
        // width={} // 宽度
        okText={'确定'}
        cancelText={'取消'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={false}
        // confirmLoading={confirmLoading}
        // afterClose={resetForm}
        // forceRender={true} // 强制渲染
        maskClosable={false}
      >
        <Form form={modalForm} disabled={inputDisabled} labelCol={{ flex: '100px' }}>
          <Form.Item name={'key'} hidden>
            <Input />
          </Form.Item>
          <Form.Item
            key={2}
            name={'parentAclModuleInfo'}
            label={'父级权限模块'}
            rules={[{ required: true, message: '权限模块不能为空' }]}
          >
            <Select
              onChange={value => handleParentAclModuleChange(value)}
              showSearch={true}
              placeholder={'父级权限模块必填'}
              optionFilterProp='children'
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={aclModuleSelector}
            />
          </Form.Item>
          <Form.Item
            key={1}
            name={'name'}
            label={'权限模块名'}
            rules={[{ required: true, message: '权限模块名称不能为空' }]}
          >
            <Input placeholder={'权限模块名称必填'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item key={3} name={'seq'} label={'顺序'} rules={[{ required: true, message: '顺序不能为空' }]}>
            <InputNumber placeholder={'顺序必填'} style={{ width: '100%' }} min={0} max={10000} />
          </Form.Item>
          <Form.Item key={4} name={'statusInfo'} label={'状态'} rules={[{ required: true, message: '状态不能为空' }]}>
            <Select
              onChange={value => handleChangeStatus(value)}
              showSearch={true}
              placeholder={'状态'}
              optionFilterProp='children'
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={dictStatues}
            />
          </Form.Item>
          <Form.Item
            key={5}
            name={'remark'}
            label={'备注'}
            rules={[{ required: false, message: '备注不超过200个字符' }]}
          >
            <TextArea rows={4} placeholder='备注不超过200个字符' style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AclModuleModal
