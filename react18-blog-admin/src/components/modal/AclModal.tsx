import React, { useEffect } from 'react'
import { OptionType } from '@/types/apis'
import { ModalType } from '@/types/component/modal'
import { Form, Input, InputNumber, Modal, Select } from 'antd/lib'
const { TextArea } = Input
import { AclAddReq, AclEditReq } from '@/types/apis/sys/acl/aclType'
import { DictMapType } from '@/types/apis/sys/dict/dictType'
import { useAclModuleStore } from '@/store/global/initDictStore'
import { useDictDetailStore } from '@/store/sys/dictStore'
import { useMessage } from '@/components/message/MessageProvider'
import { useAclModalStore } from '@/store/sys/aclStore'

const AclModal = (props: ModalType.CustomModal) => {
  const messageApi = useMessage()
  const { update } = props
  const [modalForm] = Form.useForm()

  const { dictStatues, aclTypes } = useDictDetailStore()
  const { aclModuleSelector } = useAclModuleStore()
  const {
    title,
    api,
    action,
    openModal,
    setOpenModal,
    modalSelector,
    setModalSelector,
    data,
    inputDisabled,
    setInputDisabled,
    isMenu,
    setIsMenu,
    isBtn,
    setIsBtn
  } = useAclModalStore()

  useEffect(() => {
    if (openModal) {
      initAclData()
    }
  }, [openModal])

  /**
   * 初始化数据
   */
  const initAclData = () => {
    modalForm.resetFields()
    if (action === 'create') {
      // 绑定父级权限模块初始值
      const aclModuleInfo: OptionType = {
        value: data?.aclModuleId ?? '',
        label: data?.aclModuleName ?? ''
      }

      // 绑定状态初始值, 默认 '正常'
      const statues = dictStatues.find(item => item.label === '正常')
      const statusInfo: OptionType = {
        value: statues?.value ?? '',
        label: statues?.label ?? ''
      }

      // 默认按钮类型
      const aclType = aclTypes.find(item => item.label === '按钮')
      const aclTypeInfo: OptionType = {
        value: aclType?.value?.toString() ?? '',
        label: aclType?.label ?? ''
      }

      // 绑定初始值
      modalForm.setFieldsValue({
        aclModuleInfo,
        statusInfo,
        aclTypeInfo
      })
      setModalSelector(aclModuleInfo, statusInfo, aclTypeInfo)
    } else if (action === 'edit') {
      const aclModuleInfo: OptionType = {
        value: data?.aclModuleId ?? '',
        label: data?.aclModuleName ?? ''
      }

      const aclTypeInfo: OptionType = {
        value: data?.type?.toString() ?? '',
        label: aclTypes.find(item => item.value === data?.type?.toString())?.label ?? ''
      }

      /** 菜单类型需要显示明细 */
      if (aclTypeInfo.value === '1') {
        // 菜单类型
        setIsMenu(true)
        setIsBtn(false)
        modalForm.setFieldsValue({
          menuName: data?.menuName ?? '',
          menuUrl: data?.menuUrl ?? ''
        })
      } else if (aclTypeInfo.value === '2') {
        // 按钮类型
        setIsMenu(false)
        setIsBtn(true)
        modalForm.setFieldsValue({
          btnSign: data?.btnSign ?? ''
        })
      } else {
        setIsMenu(false)
        setIsBtn(false)
      }

      const statusInfo: OptionType = {
        value: data?.status?.toString() ?? '',
        label: dictStatues.find(item => item.value === data?.status?.toString())?.label ?? ''
      }

      // 绑定初始值
      modalForm.setFieldsValue({
        aclModuleInfo,
        aclTypeInfo,
        statusInfo,
        ...data
      })
      setModalSelector(aclModuleInfo, statusInfo, aclTypeInfo)
    }
  }

  /**
   * 点击确定
   * @returns
   */
  const handleOk = async () => {
    const valid = await modalForm.validateFields()
    const params = modalForm.getFieldsValue()
    if (!valid) {
      return
    }
    if (action === 'create') {
      const addReq: AclAddReq = {
        aclModuleId: modalSelector?.aclModuleInfo?.value,
        status: modalSelector?.statusInfo?.value,
        type: modalSelector?.aclTypeInfo?.value,
        ...params
      }
      const res = await api.add(addReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else if (action === 'edit') {
      const editReq: AclEditReq = {
        surrogateId: params.key,
        aclModuleId: modalSelector?.aclModuleInfo?.value,
        status: modalSelector?.statusInfo?.value,
        type: modalSelector?.aclTypeInfo?.value,
        ...params
      }
      const res = await api.edit(editReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.success(msg)
    } else {
      return
    }

    /**
     * 回调
     */
    const aclModuleId = modalSelector?.aclModuleInfo?.value ?? ''
    await update({ aclModuleId })
    handleCancel()
  }

  /**
   * 关闭Modal框执行
   */
  const handleCancel = () => {
    setOpenModal(false)
    setInputDisabled(false)
    modalForm.resetFields()
  }

  /**
   * 选择权限模块时触发
   * @param value
   */
  const handleChangeAclModule = (value: string) => {
    const aclModuleInfo = aclModuleSelector.find(item => item.value === value) ?? {
      value: '',
      label: ''
    }
    setModalSelector(
      aclModuleInfo,
      modalSelector?.statusInfo ?? { value: '', label: '' },
      modalSelector?.aclTypeInfo ?? { value: '', label: '' }
    )
  }

  /**
   * 选择状态时更新
   * @param value
   */
  const handleChangeStatus = (value: string) => {
    const statusInfo = dictStatues.find(item => item.value === value) ?? {
      value: '',
      label: ''
    }
    setModalSelector(
      modalSelector?.statusInfo ?? { value: '', label: '' },
      statusInfo,
      modalSelector?.aclTypeInfo ?? { value: '', label: '' }
    )
  }

  /**
   * 选择权限类型时触发
   * @param value
   */
  const handleChangeAcl = (value: string) => {
    const aclTypeInfo = aclTypes.find(item => item.value === value) ?? {
      value: '',
      label: ''
    }
    setModalSelector(
      modalSelector?.aclModuleInfo ?? { value: '', label: '' },
      modalSelector?.statusInfo ?? { value: '', label: '' },
      aclTypeInfo
    )

    if (aclTypeInfo.value === '1') {
      // 菜单类型
      setIsMenu(true)
      setIsBtn(false)
    } else if (aclTypeInfo.value === '2') {
      // 按钮类型
      setIsMenu(false)
      setIsBtn(true)
      if (action === 'create') {
        modalForm.setFieldsValue({
          menuName: '',
          menuUrl: ''
        })
      }
    } else {
      // 其他
      setIsMenu(false)
      setIsBtn(false)
    }
  }

  return (
    <div className='baseModal'>
      <Modal
        title={title}
        width={'40vw'}
        okText={'确定'}
        cancelText={'取消'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={false}
        maskClosable={false}
        // confirmLoading={confirmLoading}
        // afterClose={resetForm}
        // forceRender={true} // 强制渲染
      >
        <Form form={modalForm} disabled={inputDisabled} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <Form.Item name={'key'} hidden>
            <Input />
          </Form.Item>
          <Form.Item
            key={1}
            name={'aclModuleInfo'}
            label={'权限模块'}
            rules={[{ required: true, message: '权限模块不能为空' }]}
          >
            <Select
              onChange={value => handleChangeAclModule(value)}
              showSearch={true}
              placeholder={'权限模块必填'}
              optionFilterProp='children'
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={aclModuleSelector}
            />
          </Form.Item>
          <Form.Item key={2} name={'name'} label={'权限名称'} rules={[{ required: true, message: '权限名称不能为空' }]}>
            <Input placeholder={'权限名称必填'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item key={4} name={'seq'} label={'顺序'} rules={[{ required: true, message: '顺序不能为空' }]}>
            <InputNumber placeholder={'顺序必填'} style={{ width: '100%' }} min={0} max={10000} />
          </Form.Item>
          <Form.Item key={5} name={'statusInfo'} label={'状态'} rules={[{ required: true, message: '状态不能为空' }]}>
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
            key={6}
            name={'aclTypeInfo'}
            label={'权限类型'}
            rules={[{ required: true, message: '权限类型不能为空' }]}
          >
            <Select
              onChange={value => handleChangeAcl(value)}
              showSearch={true}
              placeholder={'权限类型'}
              optionFilterProp='children'
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={aclTypes}
            />
          </Form.Item>
          {/* 按钮选项配置 */}
          {isBtn && (
            <Form.Item
              key={10}
              name={'btnSign'}
              label={'按钮标记'}
              rules={[{ required: true, message: '按钮标记不能为空' }]}
            >
              <Input placeholder={'按钮标记必填, 格式: _add_user'} style={{ width: '100%' }} />
            </Form.Item>
          )}
          {/* 菜单选项配置 */}
          {isMenu && (
            <div>
              <Form.Item
                key={8}
                name={'menuName'}
                label={'菜单名'}
                rules={[{ required: true, message: '菜单名不能为空' }]}
              >
                <Input placeholder={'菜单名必填'} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                key={9}
                name={'menuUrl'}
                label={'路由url'}
                rules={[{ required: true, message: '路由url不能为空' }]}
              >
                <Input placeholder={'路由url必填'} style={{ width: '100%' }} />
              </Form.Item>
            </div>
          )}
          <Form.Item key={3} name={'url'} label={'服务端API'} rules={[{ required: true, message: '访问url不能为空' }]}>
            <Input placeholder={'服务端API必填(全路径)'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            key={7}
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

export default AclModal
