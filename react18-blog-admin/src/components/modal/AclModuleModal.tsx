import React, { useImperativeHandle, useState } from 'react'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { Modal, Form, Input, InputNumber, Select } from 'antd/lib'
const { TextArea } = Input
import { OptionType } from '@/types/apis'
import { message } from 'antd'
import { AclModuleAddReq, AclModuleEditReq, AclModuleTableType } from '@/types/apis/sys/acl/aclType'
import { aclModuleApi } from '@/apis/sys'

const AclModuleModal = (props: ModalType.CustomModal) => {
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
  const [selectorList, setSelectorList] = useState<OptionType[]>([])
  const [selectedValue, setSelectedValue] = useState<string>('')

  useImperativeHandle(mRef, () => ({
    form: modalForm,
    open
  }))

  /**
   * load all list
   * @returns
   */
  const setSelectorValueComp = async () => {
    const res = await aclModuleApi.aclModuleList({})
    const { code, data } = res
    if (code !== 200) {
      setSelectorList([])
      return
    }

    let list: OptionType[] = data.map(({ surrogateId, name }) => ({
      value: surrogateId,
      label: name
    }))
    list.push({
      value: '0',
      label: '-'
    })
    setSelectorList(list)
  }

  const open = (
    requestParams: IModalRequestAction,
    params: IModalParams,
    type: IAction,
    modalStyle: IModalStyle,
    data?: AclModuleTableType
  ) => {
    const { action, open } = type
    const { title } = params

    if (action === 'create') {
      modalForm.resetFields()
      const parentAclModuleInfo: OptionType = {
        label: data?.name ?? '',
        value: data?.surrogateId ?? ''
      }
      // 绑定当前选中的树节点的值
      modalForm.setFieldsValue({
        parentAclModuleInfo: parentAclModuleInfo
      })

      // 新打开页面时默认加载当前选中树节点的信息
      setSelectedValue(parentAclModuleInfo.value ?? '')
    } else if (action === 'edit') {
      modalForm.setFieldsValue({ ...data })

      setSelectedValue(data?.parentAclModuleInfo?.value ?? '')
    } else {
      modalForm.setFieldsValue(data)
      setInputDisabled(true)
    }

    // load all org list
    setSelectorValueComp()
    setOpenModal(open)
    setAction(action)
    setTitle(title)
    setRequestParams(requestParams)
    setmdalStyle(modalStyle)
  }

  const handleOk = async () => {
    const valid = await modalForm.validateFields()
    const { api } = requestParams
    const params = modalForm.getFieldsValue()
    if (!valid) {
      return
    }

    if (action === 'create') {
      const addReq: AclModuleAddReq = {
        name: params.name,
        parentSurrogateId: selectedValue,
        seq: params.seq,
        status: params.status,
        remark: params.remark
      }
      const res = await api.add!(addReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      message.success(msg)
      handleCancel()
      update()
    } else if (action === 'edit') {
      const editReq: AclModuleEditReq = {
        surrogateId: params.key,
        name: params.name,
        parentSurrogateId: selectedValue,
        seq: params.seq,
        status: params.status,
        remark: params.remark
      }
      // console.log('--> editReq:', editReq)
      const res = await api.edit!(editReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      message.success(msg)
      handleCancel()
      update()
    } else {
      return
    }
  }

  const handleCancel = () => {
    setOpenModal(false)
    setInputDisabled(false)
    modalForm.resetFields()
  }

  const handleChange = (value: string) => {
    setSelectedValue(value)
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
            key={2}
            name={'parentAclModuleInfo'}
            label={'父级权限模块'}
            rules={[{ required: true, message: '权限模块不能为空' }]}
          >
            <Select
              onChange={value => handleChange(value)}
              showSearch={true}
              placeholder={'父级权限模块必填'}
              optionFilterProp='children'
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={selectorList}
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
          <Form.Item key={4} name={'status'} label={'状态'} rules={[{ required: true, message: '状态不能为空' }]}>
            <InputNumber placeholder={'状态必填, 0:正常, 1:冻结, 2: 其他'} style={{ width: '100%' }} min={0} max={2} />
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
