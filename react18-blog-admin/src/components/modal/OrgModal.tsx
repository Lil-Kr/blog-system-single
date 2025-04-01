import { useEffect } from 'react'
import { ModalType } from '@/types/component/modal'
import { Modal, Form, Input, InputNumber, Select } from 'antd/lib'
const { TextArea } = Input
import { OptionType } from '@/types/apis'
import { useOrgModalStore } from '@/store/sys/orgStore'
import { SysOrgEditReq, SysOrgSaveReq } from '@/types/apis/sys/org/orgType'
import { useDictDetailStore } from '@/store/sys/dictStore'

const OrgModal = (props: ModalType.CustomModal) => {
  const { update } = props
  const [orgModalForm] = Form.useForm()
  const { dictStatues } = useDictDetailStore()

  const {
    openModal,
    setOpenModal,
    api,
    orgSelectorInfo,
    action,
    inputDisabled,
    setInputDisabled,
    title,
    req,
    selectedOrgValue,
    setSelectedOrgValue,
    selectedStatueValue,
    setSelectedStatueValue
  } = useOrgModalStore()

  useEffect(() => {
    if (openModal) {
      initOrgData()
    }
  }, [openModal])

  /**
   * 初始化数据
   */
  const initOrgData = () => {
    orgModalForm.resetFields()
    if (action === 'create') {
      // 默认显示第一条
      // const orgInfo: OptionType = orgSelectorInfo[0]
      const orgInfo: OptionType = req?.orgInfo ?? orgSelectorInfo[0]
      const statusInfo: OptionType = dictStatues.find(item => item.value === '0') ?? dictStatues[0]
      setSelectedOrgValue(orgInfo.value ?? '')
      setSelectedStatueValue(statusInfo.value ?? '0')

      orgModalForm.setFieldsValue({
        orgInfo,
        statusInfo
      })
    } else if (action === 'edit') {
      const orgInfo: OptionType = req?.orgInfo ?? { value: '', label: '' }
      const statusInfo: OptionType = dictStatues.find(item => item.value === req?.status) ?? dictStatues[0]
      setSelectedOrgValue(orgInfo.value ?? '')
      setSelectedStatueValue(statusInfo.value ?? '0')
      orgModalForm.setFieldsValue({
        ...req,
        orgInfo,
        statusInfo
      })
    } else {
      const orgInfo: OptionType = req?.orgInfo ?? { value: '', label: '' }
      const statusInfo: OptionType = dictStatues.find(item => item.value === req?.status) ?? dictStatues[0]
      setSelectedOrgValue(orgInfo.value ?? '')
      setSelectedStatueValue(statusInfo.value ?? '0')

      orgModalForm.setFieldsValue({
        ...req,
        orgInfo,
        statusInfo
      })
    }
  }

  /**
   * 保存
   * @returns
   */
  const handleOk = async () => {
    const valid = await orgModalForm.validateFields()
    if (!valid) return
    const params = orgModalForm.getFieldsValue()

    if (action === 'create') {
      const addReq: SysOrgSaveReq = {
        parentSurrogateId: selectedOrgValue,
        status: selectedStatueValue,
        ...params
      }
      const res = await api.add!(addReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
    } else if (action === 'edit') {
      const editReq: SysOrgEditReq = {
        surrogateId: req?.key ?? '',
        name: params.name,
        parentSurrogateId: selectedOrgValue ?? '',
        status: selectedStatueValue ?? '0',
        seq: params.seq,
        remark: params.remark
      }
      const res = await api.edit!(editReq)
      const { code, msg } = res
      if (code !== 200) {
        return
      }
    }

    handleCancel()
    update({ parentId: req?.orgInfo?.value })
  }

  const handleCancel = () => {
    setOpenModal(false)
    setInputDisabled(false)
    orgModalForm.resetFields()
  }

  /**
   * 所属组织
   * @param value
   */
  const handleOrgSelectorChange = (value: string) => {
    setSelectedOrgValue(value)
  }

  /**
   * 选择状态时更新
   * @param value
   */
  const handleChangeStatus = (value: string) => {
    setSelectedStatueValue(value)
  }

  return (
    <div className='orgModal'>
      <Modal
        style={{ maxWidth: '30vw' }}
        title={title}
        width={'100vw'}
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
        <Form form={orgModalForm} disabled={inputDisabled} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <Form.Item name={'key'} hidden>
            <Input />
          </Form.Item>
          <Form.Item
            key={4}
            name={'orgInfo'}
            label={'所属组织'}
            rules={[{ required: true, message: '所属组织不能为空' }]}
          >
            <Select
              onChange={value => handleOrgSelectorChange(value)}
              showSearch={true}
              placeholder={'所属组织必填'}
              optionFilterProp='children'
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={orgSelectorInfo}
            />
          </Form.Item>
          <Form.Item key={1} name={'name'} label={'组织名称'} rules={[{ required: true, message: '组织名称不能为空' }]}>
            <Input placeholder={'组织名称必填'} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item key={2} name={'statusInfo'} label={'状态'} rules={[{ required: true, message: '状态不能为空' }]}>
            <Select
              onChange={value => handleChangeStatus(value)}
              showSearch={true}
              placeholder={'状态'}
              optionFilterProp='children'
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={dictStatues}
            />
          </Form.Item>
          <Form.Item key={3} name={'seq'} label={'序号'} rules={[{ required: true, message: '序号不能为空' }]}>
            <InputNumber placeholder={'序号必填'} style={{ width: '100%' }} min={1} max={10000} />
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
