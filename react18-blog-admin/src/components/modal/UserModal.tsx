import React, { useImperativeHandle, useState } from 'react'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { Modal, Form, Input, InputNumber, Select } from 'antd/lib'
const { TextArea } = Input
import orgApi from '@/apis/sys/orgApi'
import { UserTableType } from '@/types/apis/sys/user/userType'
import { OptionType } from '@/types/apis'
import { useMessage } from '@/components/message/MessageProvider'

const UserModal = (props: ModalType.CustomModal) => {
  const messageApi = useMessage()
  const { mRef, update } = props
  const [modalForm] = Form.useForm()
  const [action, setAction] = useState('create')
  const [title, setTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [inputDisabled, setInputDisabled] = useState<boolean>(false)
  const [requestParams, setRequestParams] = useState<IModalRequestAction>({
    api: {}
  })
  const [orgList, setOrgList] = useState<OptionType[]>([])
  const [selectedValue, setSelectedValue] = useState<string>('')

  useImperativeHandle(mRef, () => ({
    form: modalForm,
    open
  }))

  const open = (
    requestParams: IModalRequestAction,
    params: IModalParams,
    type: IAction,
    modalStyle: IModalStyle,
    data?: UserTableType
  ) => {
    const { action, open } = type
    const { title } = params

    if (action === 'create') {
      modalForm.resetFields()
      modalForm.setFieldsValue({
        orgInfo: data?.orgInfo ?? {}
      })
      setSelectedValue(data?.orgInfo?.value ?? '')
    } else if (action === 'edit') {
      modalForm.setFieldsValue(data)
      setSelectedValue(data?.orgId ?? '')
    } else {
      modalForm.setFieldsValue(data)
      setInputDisabled(true)
    }

    // load all org list
    setSelectorComp()
    setOpenModal(open)
    setAction(action)
    setTitle(title)
    setRequestParams(requestParams)
  }

  /**
   * load all org list
   * @returns
   */
  const setSelectorComp = async () => {
    const res = await orgApi.orgAllList({})
    const { code, data, msg } = res
    if (code !== 200) {
      setOrgList([])
      return
    }

    let list: OptionType[] = data.map(({ surrogateId, name }) => ({
      value: surrogateId,
      label: name
    }))
    setOrgList(list)
  }

  const handleOk = async () => {
    const valid = await modalForm.validateFields()
    const { api } = requestParams
    const params = modalForm.getFieldsValue()
    if (!valid) {
      return
    }

    if (action === 'create') {
      const res = await api.add!(params)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      handleCancel()
      update()
    } else if (action === 'edit') {
      const param = {
        surrogateId: params.key,
        orgId: selectedValue,
        account: params.account,
        userName: params.userName,
        email: params.email,
        telephone: params.telephone,
        status: params.status,
        remark: params.remark
      }
      const res = await api.edit!(param)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      messageApi?.info(msg)
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
        title={title}
        width={'50vw'}
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
        <Form form={modalForm} disabled={inputDisabled} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <Form.Item name={'key'} hidden>
            <Input />
          </Form.Item>
          <Form.Item
            key={6}
            name={'orgInfo'}
            label={'所属组织'}
            rules={[{ required: true, message: '所属组织不能为空' }]}
          >
            <Select
              onChange={value => handleChange(value)}
              showSearch={true}
              placeholder={'所属组织必填'}
              optionFilterProp='children'
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={orgList}
            />
          </Form.Item>
          <Form.Item key={1} name={'account'} label={'账号'} rules={[{ required: true, message: '账号不能为空' }]}>
            <Input placeholder={'账号必填'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item key={2} name={'userName'} label={'昵称'} rules={[{ required: true, message: '昵称不能为空' }]}>
            <Input placeholder={'昵称必填'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item key={3} name={'email'} label={'邮箱'} rules={[{ required: true, message: '邮箱不能为空' }]}>
            <Input placeholder={'邮箱必填'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item key={4} name={'telephone'} label={'联系方式'}>
            <Input placeholder={'联系方式'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item key={5} name={'status'} label={'状态'} rules={[{ required: true, message: '状态不能为空' }]}>
            <InputNumber placeholder={'状态必填, 0:正常, 1:冻结, 2: 其他'} style={{ width: '100%' }} min={0} max={2} />
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

export default UserModal
