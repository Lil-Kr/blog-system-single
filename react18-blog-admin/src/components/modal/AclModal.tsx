import React, { useImperativeHandle, useState } from 'react'
import { OptionType } from '@/types/apis'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import TextArea from 'antd/es/input/TextArea'
import { Form, Input, InputNumber, message, Modal, Select } from 'antd/lib'
import { aclModuleApi } from '@/apis/sys'
import { AclAddReq, AclEditReq, AclModalType } from '@/types/apis/sys/acl/aclType'
import { dictApi } from '@/apis/sys/dictApi'

const AclModal = (props: ModalType.CustomModal) => {
  const { mRef, update } = props
  const [modalForm] = Form.useForm()
  const [action, setAction] = useState('create')
  const [title, setTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [inputDisabled, setInputDisabled] = useState<boolean>(false)
  const [modalStyle, setmdalStyle] = useState<IModalStyle>()
  const [requestParams, setRequestParams] = useState<IModalRequestAction>({
    api: {}
  })
  const [aclModuleList, setAclModuleList] = useState<OptionType[]>([])
  const [aclTypeList, setAclTypeList] = useState<OptionType[]>([])
  const [selectedValue, setSelectedValue] = useState<{
    aclModuleInfo?: OptionType
    status?: OptionType
    aclType?: OptionType
  }>()
  const [status, setStatus] = useState<OptionType[]>([
    { label: '正常', value: '0' },
    { label: '冻结', value: '1' },
    { label: '其他', value: '2' }
  ])

  useImperativeHandle(mRef, () => ({
    form: modalForm,
    open
  }))

  /**
   * load all list
   * @returns
   */
  const setSelectorValueComp = async () => {
    retrieveAclModuleList()
    retrieveDictDetail()
  }

  const retrieveDictDetail = async () => {
    const res = await dictApi.dictDetail({ dictSurrogateId: '1334038283956654080' })
    const { code, data } = res
    if (code !== 200) {
      setAclTypeList([])
      return
    }

    let dictDetails: OptionType[] = data.dictDetailVOList.map(({ surrogateId, name }) => ({
      value: surrogateId,
      label: name
    }))
    setAclTypeList(dictDetails)
  }

  const retrieveAclModuleList = async () => {
    const aclModules = await aclModuleApi.aclModuleList({})
    const { code, data } = aclModules
    if (code !== 200) {
      setAclModuleList([])
      return
    }

    let aclModuleList: OptionType[] = data.map(({ surrogateId, name }) => ({
      value: surrogateId,
      label: name
    }))
    aclModuleList.push({
      value: '0',
      label: '顶级'
    })
    setAclModuleList(aclModuleList)
  }

  const open = (
    requestParams: IModalRequestAction,
    params: IModalParams,
    type: IAction,
    modalStyle: IModalStyle,
    data?: AclModalType
  ) => {
    // load all org list
    setSelectorValueComp()

    const { action, open } = type
    const { title } = params

    if (action === 'create') {
      modalForm.resetFields()
      const aclModuleInfo: OptionType = {
        value: data?.aclModuleId ?? '',
        label: data?.aclModuleName ?? ''
      }
      const statusInfo: OptionType = {
        value: data?.status?.toString() ?? '',
        label: status[0].label ?? ''
      }
      // 绑定当前选中的树节点的值
      modalForm.setFieldsValue({
        aclModuleInfo,
        statusInfo
      })

      setSelectedValue({ aclModuleInfo: aclModuleInfo, status: statusInfo })
    } else if (action === 'edit') {
      const aclModuleInfo: OptionType = {
        value: data?.aclModuleId ?? '',
        label: data?.aclModuleName ?? ''
      }
      const aclTypeInfo: OptionType = {
        value: data?.aclTypeId ?? '',
        label: data?.aclTypeName ?? ''
      }
      const statusInfo: OptionType = {
        value: data?.status?.toString() ?? '',
        label: status.find(item => item.value === data?.status?.toString())?.label ?? ''
      }
      modalForm.setFieldsValue({
        aclModuleInfo,
        aclTypeInfo,
        statusInfo,
        ...data
      })

      setSelectedValue({ aclModuleInfo: aclModuleInfo, status: statusInfo, aclType: aclTypeInfo })
    } else {
      const aclModuleInfo: OptionType = {
        value: data?.aclModuleId ?? '',
        label: data?.aclModuleName ?? ''
      }
      const aclTypeInfo: OptionType = {
        value: data?.aclTypeId ?? '',
        label: data?.aclTypeName ?? ''
      }
      const statusInfo: OptionType = {
        value: data?.status?.toString() ?? '',
        label: status.find(item => item.value === data?.status?.toString())?.label ?? ''
      }
      modalForm.setFieldsValue({
        aclModuleInfo,
        aclTypeInfo,
        statusInfo,
        ...data
      })
      setInputDisabled(true)
    }

    setOpenModal(open)
    setAction(action)
    setTitle(title)
    setRequestParams(requestParams)
    setmdalStyle(modalStyle)
  }

  /**
   * 点击确定
   * @returns
   */
  const handleOk = async () => {
    const valid = await modalForm.validateFields()
    const { api } = requestParams
    const params = modalForm.getFieldsValue()
    if (!valid) {
      return
    }

    if (action === 'create') {
      const addReq: AclAddReq = {
        aclModuleId: params.aclModuleInfo.value,
        ...params
      }
      const res = await api.add!(addReq)
      const { code, msg } = res
      if (code !== 200) {
        message.error(msg)
        return
      }
      message.info(msg)
    } else if (action === 'edit') {
      const editReq: AclEditReq = {
        surrogateId: params.key,
        aclModuleId: selectedValue?.aclModuleInfo?.value,
        status: selectedValue?.status?.value,
        aclTypeId: selectedValue?.aclType?.value,
        ...params
      }
      const res = await api.edit!(editReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      message.info(msg)
    }

    handleCancel()
    update()
  }

  const handleCancel = () => {
    setOpenModal(false)
    setInputDisabled(false)
    modalForm.resetFields()
  }

  const handleChangeAclModule = (value: string) => {
    setSelectedValue(prevState => ({
      ...prevState,
      aclModuleInfo: { label: prevState?.aclModuleInfo?.label, value: value }
    }))
  }

  const handleChangeStatus = (value: string) => {
    setSelectedValue(prevState => ({
      ...prevState,
      status: { label: prevState?.status?.label, value: value }
    }))
  }
  const handleChangeAcl = (value: string) => {
    setSelectedValue(prevState => ({
      ...prevState,
      aclType: { label: prevState?.aclType?.label, value: value }
    }))
  }

  return (
    <div className='baseModal'>
      <Modal
        style={{ maxWidth: '30vw' }}
        title={title}
        width={'100vw'}
        okText={'确定'}
        cancelText={'取消'}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        // confirmLoading={confirmLoading}
        destroyOnClose={false}
        // afterClose={resetForm}
        // forceRender={true} // 强制渲染
        maskClosable={false}
      >
        <Form form={modalForm} disabled={inputDisabled} labelCol={{ flex: '100px' }}>
          <Form.Item name={'key'} hidden>
            <Input />
          </Form.Item>
          <Form.Item
            key={1}
            name={'aclModuleInfo'}
            label={'所属权限模块'}
            rules={[{ required: true, message: '权限模块不能为空' }]}
          >
            <Select
              onChange={value => handleChangeAclModule(value)}
              showSearch={true}
              placeholder={'所属权限模块必填'}
              optionFilterProp='children'
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={aclModuleList}
            />
          </Form.Item>
          <Form.Item key={2} name={'name'} label={'权限名称'} rules={[{ required: true, message: '权限名称不能为空' }]}>
            <Input placeholder={'权限名称必填'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item key={3} name={'url'} label={'访问url'} rules={[{ required: true, message: '访问url不能为空' }]}>
            <Input placeholder={'访问url必填'} style={{ width: '100%' }} />
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
              options={status}
            />
          </Form.Item>
          <Form.Item
            key={6}
            name={'aclTypeId'}
            label={'权限类型'}
            rules={[{ required: true, message: '权限类型不能为空' }]}
          >
            <Select
              onChange={value => handleChangeAcl(value)}
              showSearch={true}
              placeholder={'权限类型'}
              optionFilterProp='children'
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={aclTypeList}
            />
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
