import React, { useImperativeHandle, useState } from 'react'
import { IAction, IModalParams, IModalRequestAction, IModalStyle, ModalType } from '@/types/component/modal'
import { Modal, Form, Input, InputNumber, Select } from 'antd/lib'
const { TextArea } = Input
import sysOrgApi from '@/apis/sys/orgApi'
import { SysOrgAllResp } from '@/types/apis/sys/org/org'
import { OrgTableType } from '@/views/sys/Org'

export type OptionType = {
  value: string
  label: string
}

const OrgModal = (props: ModalType.OrgModal) => {
  const { mRef, update } = props
  const [orgModalForm] = Form.useForm()
  const [action, setAction] = useState('create')
  const [title, setTitle] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [inputDisabled, setInputDisabled] = useState<boolean>(false)
  const [modalStyle, setmdalStyle] = useState<IModalStyle>()
  const [requestParams, setRequestParams] = useState<IModalRequestAction>({
    api: {}
  })
  const [orgList, setOrgList] = useState<OptionType[]>([])
  const [selectedValue, setSelectedValue] = useState<string>('')

  useImperativeHandle(mRef, () => ({
    form: orgModalForm,
    open
  }))

  const open = (
    requestParams: IModalRequestAction,
    params: IModalParams,
    type: IAction,
    modalStyle: IModalStyle,
    data?: OrgTableType
  ) => {
    const { action, open } = type
    const { title } = params

    if (action === 'create') {
      orgModalForm.resetFields()
    } else if (action === 'edit') {
      orgModalForm.setFieldsValue(data)
      setSelectedValue(data?.parentSurrogateId?.value ?? '')
    } else {
      orgModalForm.setFieldsValue(data)
      setInputDisabled(true)
    }

    // load all org list
    setSelectorComp()
    setOpenModal(open)
    setAction(action)
    setTitle(title)
    setRequestParams(requestParams)
    setmdalStyle(modalStyle)
  }

  /**
   * load all org list
   * @returns
   */
  const setSelectorComp = async () => {
    const res = await sysOrgApi.orgAllList({})
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
    const valid = await orgModalForm.validateFields()
    const { api } = requestParams
    const params = orgModalForm.getFieldsValue()
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
        name: params.name,
        parentSurrogateId: selectedValue,
        remark: params.remark,
        seq: params.seq,
        status: params.status
      }
      const res = await api.edit!(param)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
      handleCancel()
      update()
    } else {
      return
    }
  }

  const handleCancel = () => {
    setOpenModal(false)
    setInputDisabled(false)
    orgModalForm.resetFields()
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
        <Form form={orgModalForm} disabled={inputDisabled} labelCol={{ flex: '100px' }}>
          <Form.Item name={'key'} hidden>
            <Input />
          </Form.Item>
          <Form.Item
            key={1}
            name={'name'}
            label={'新组织名称'}
            rules={[{ required: true, message: '组织名称不能为空' }]}
          >
            <Input placeholder={'组织名称必填'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item key={2} name={'status'} label={'状态'} rules={[{ required: true, message: '状态不能为空' }]}>
            <InputNumber placeholder={'状态必填'} style={{ width: '100%' }} min={0} max={2} />
          </Form.Item>
          <Form.Item key={3} name={'seq'} label={'序号'} rules={[{ required: true, message: '序号不能为空' }]}>
            <InputNumber placeholder={'序号必填'} style={{ width: '100%' }} min={1} max={10000} />
          </Form.Item>
          <Form.Item
            key={4}
            name={'parentSurrogateId'}
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

export default OrgModal
