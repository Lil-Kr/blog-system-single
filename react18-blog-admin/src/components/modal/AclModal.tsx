import React, { useImperativeHandle, useState } from 'react'
import { OptionType, transformTypeToSeletor } from '@/types/apis'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { Form, Input, InputNumber, message, Modal, Select } from 'antd/lib'
const { TextArea } = Input
import { aclModuleApi } from '@/apis/sys'
import { AclAddReq, AclEditReq, AclModalType } from '@/types/apis/sys/acl/aclType'
import { DictMapType } from '@/types/apis/sys/dict/dictType'
import useDictDetailStore from '@/store/global/dictStore'

type CallBackType = {
  aclModuleId: string
}

const AclModal = (props: ModalType.CustomModal) => {
  const [messageApi, contextHolder] = message.useMessage()
  const { mRef, update } = props
  const [modalForm] = Form.useForm()
  const [action, setAction] = useState('create')
  const [title, setTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [inputDisabled, setInputDisabled] = useState<boolean>(false)
  const [requestParams, setRequestParams] = useState<IModalRequestAction>({
    api: {}
  })

  // 设置回调参数
  const [callBack, setCallBack] = useState<CallBackType>({ aclModuleId: '' })
  const [aclModuleList, setAclModuleList] = useState<OptionType[]>([])
  const [aclTypeList, setAclTypeList] = useState<OptionType[]>([])
  const [selectedValue, setSelectedValue] = useState<{
    aclModuleInfo?: OptionType
    status?: OptionType
    aclType?: OptionType
  }>()
  const [status, setStatus] = useState<OptionType[]>([])
  const { setDictMap, dictMap } = useDictDetailStore()

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
    /**
     * 初始化[权限点类型]下拉列表数据
     */
    const aclTypes: DictMapType[] = dictMap.get('权限点类型') ?? []
    const aclTypeSelecor = transformTypeToSeletor(aclTypes)
    setAclTypeList(aclTypeSelecor)

    /**
     * 初始化[状态类型]下拉列表数据
     */
    const statusTypes: DictMapType[] = dictMap.get('状态类型') ?? []
    const statusTypeSelecor = transformTypeToSeletor(statusTypes)
    setStatus(statusTypeSelecor)
  }

  /**
   *
   * @returns
   */
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
      label: '顶层'
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
      // 打开modal是绑定第一个
      const statusTypes: DictMapType[] = dictMap.get('状态类型') ?? []
      const statusInfo: OptionType = {
        value: statusTypes[0]?.type.toString() ?? '',
        label: statusTypes[0]?.name
      }

      const aclTypes: DictMapType[] = dictMap.get('权限点类型') ?? []
      const aclTypeInfo: OptionType = {
        value: aclTypes[0]?.type.toString() ?? '',
        label: aclTypes[0]?.name
      }

      // 绑定当前选中的树节点的值
      modalForm.setFieldsValue({
        aclModuleInfo: data?.aclModuleId ?? '',
        statusInfo: statusTypes[0]?.type.toString() ?? '',
        aclTypeInfo: aclTypes[0]?.type.toString() ?? ''
      })

      setSelectedValue({ aclModuleInfo: aclModuleInfo, status: statusInfo, aclType: aclTypeInfo })
    } else if (action === 'edit') {
      const aclModuleInfo: OptionType = {
        value: data?.aclModuleId ?? '',
        label: data?.aclModuleName ?? ''
      }
      const aclTypes = dictMap.get('权限点类型') ?? []
      const aclTypeInfo: OptionType = {
        value: data?.type?.toString() ?? '',
        label: aclTypes?.find(item => item.type === data?.type)?.name ?? ''
      }

      const statusTypes = dictMap.get('状态类型') ?? []
      const statusInfo: OptionType = {
        value: data?.status?.toString() ?? '',
        label: statusTypes.find(item => item.type === data?.type)?.name ?? ''
      }
      modalForm.setFieldsValue({
        aclModuleInfo: data?.aclModuleId ?? '',
        aclTypeInfo: data?.type?.toString() ?? '',
        statusInfo: data?.status?.toString() ?? '',
        ...data
      })

      setSelectedValue({ aclModuleInfo: aclModuleInfo, status: statusInfo, aclType: aclTypeInfo })
    } else {
      modalForm.setFieldsValue({
        aclModuleInfo: data?.aclModuleId ?? '',
        aclTypeInfo: data?.type?.toString() ?? '',
        statusInfo: data?.status?.toString() ?? '',
        ...data
      })
      setInputDisabled(true)
    }

    setOpenModal(open)
    setAction(action)
    setTitle(title)
    setRequestParams(requestParams)

    const { aclModuleSurrogateId } = data ?? {}
    setCallBack({ aclModuleId: aclModuleSurrogateId ?? '' })
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
        aclModuleId: params.aclModuleInfo,
        status: selectedValue?.status?.value,
        type: selectedValue?.aclType?.value,
        ...params
      }
      const res = await api.add!(addReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi.success(msg)
    } else if (action === 'edit') {
      const editReq: AclEditReq = {
        surrogateId: params.key,
        aclModuleId: selectedValue?.aclModuleInfo?.value,
        status: selectedValue?.status?.value,
        type: selectedValue?.aclType?.value,
        ...params
      }
      const res = await api.edit!(editReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi.success(msg)
    }

    handleCancel()
    update({ ...callBack })
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

  /**
   * 选择状态时更新
   * @param value
   */
  const handleChangeStatus = (value: string) => {
    setSelectedValue(prevState => ({
      ...prevState,
      status: { ...prevState?.status, value: value }
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
