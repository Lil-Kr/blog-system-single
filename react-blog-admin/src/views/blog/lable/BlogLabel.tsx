import React, { useEffect, useRef, useState } from 'react'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import LabelWrappedForm from './Label'
import {useAppSelector, useAppDispatch, RootState} from '@/redux'

// redux
import { useLabelsQuery } from '@/redux/apis/blog/blogLabelApi'
import { addLabel, editLabel, deleteLabel, setTableLoading } from '@/redux/slice'

// antd
import { Button, Form, Input, InputNumber, Modal, Space, Table, message } from 'antd'
const { Column, ColumnGroup } = Table
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'

const data = []

const BlogLable = () => {
  const dispatch = useAppDispatch()
  const { tableLoading, labels } = useAppSelector((state: RootState) => state.blogLabel)
  const [dataSource, setDataSource] = useState(data)

  const [btnSize] = useState<SizeType>('middle')
  const [openModal, setOpenModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const lableFormRef = useRef(null)
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox')
  const [rowKeys, setRowKeys] = useState<string[]>()
  const [lookInputDisabled, setLookInputDisabled] = useState<boolean>(true)
  const [labelFormValue, setLabelFormValue] = useState({})

  const columns = [
    {
      key: 'number',
      dataIndex: 'number',
      title: '编号',
      width: 100,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '标签名',
      width: 100,
    },
    {
      key: 'remark',
      dataIndex: 'remark',
      title: '备注',
      width: 100,
    },
    {
      key: 'oparet',
      dataIndex: 'oparet',
      title: '操作',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button name='look' type="primary" shape="circle" icon={<SearchOutlined />} onClick={() => lookItem(record.key, record)} />
          <Button name='edit' type="primary" shape="circle" icon={<EditOutlined />} onClick={() => editItem(record.key, record)} />
          <Button name='delete' type="primary" shape="circle" danger icon={<DeleteOutlined />} onClick={() => deleteItem(record.key, record)} />
        </Space>
      )
    }
  ]
   
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setRowKeys(selectedRowKeys)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  }

  const handleCancel = () => {
    console.log('--> cancel Modal')
    setOpenModal(false)
  }

  const resetForm = () => {
    console.log('--> resetFields')
    lableFormRef.current.form.resetFields()
  }

  const deleteBatch = (e) => {
    console.log('--> 批量删除: ', rowKeys)
  }

  /**
   * create form
   */
  const createLabelFn = () => {
    console.log('--> create')
    setLabelFormValue({})
    setLookInputDisabled(false)
    setOpenModal(true)
  }

  /**
   * 单独删除一条记录
   * @param key 
   * @param record 
   */
  const deleteItem = (key, record) => {
    console.log('--> deleteItem record : ', record)
    console.log('--> deleteItem key: ', key)
  }

  const editItem = (key, record) => {
    console.log('--> edit record : ', record)
    console.log('--> edit key: ', key)
  }
  
  const lookItem = (key, record) => {
    console.log('--> look: ', record)
    setLabelFormValue(record)
    setLookInputDisabled(true) // true false
    setOpenModal(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)    
    lableFormRef.current.check()
  }

  /**
   * Modal callback Label form
   * @param childValue 
   */
  const handleDataFromChild = (callback) => {
    console.log('--> childValue: ', callback)
    const {state, loadingState, value} = callback
    if (state) {
      value.key = dataSource.length + 1
      setDataSource([...dataSource, value])
      setConfirmLoading(loadingState)
      setOpenModal(false)
    }else {
      setConfirmLoading(loadingState)
    }
  }
  
  /**
   * send request and fetch data list
   */
  const {
    data: labelListResp,
    isLoading: lableListLoading,
    isSuccess: labelListSuccess,
    isError: isLoginError,
    error: labelListError,
    isUninitialized: isloginUninitialized
  } = useLabelsQuery({})
  
  useEffect(() => {
    if (lableListLoading) {
      dispatch(setTableLoading({tableLoading:true}))
    } else if (labelListSuccess && !lableListLoading) {
      const {code, msg, data} = labelListResp
      console.log('--> labels useEffect success', data)
      dispatch(setTableLoading({tableLoading:false}))
      dispatch(addLabel({labels: data}))
    }
  }, [lableListLoading, labelListSuccess])


  return (
    <div className='blog-label-wrapper'>
        <Space direction='horizontal'>
          <Button size={btnSize} type="primary" icon={<PlusOutlined />} onClick={createLabelFn}>创建标签</Button>
          <Button size={btnSize} type="primary" icon={<DeleteOutlined />} danger onClick={deleteBatch}>批量删除</Button> 
        </Space>
        <br />
        <br />
        <Table
          key={1}
          style={{ width: '40%' }}
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          loading={tableLoading}
          columns={columns}
          dataSource={labels}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 800 }}
          
          // size='small'
        />
        
         <Modal
          title="label标签"
          open={openModal}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          destroyOnClose={false}
          // afterClose={resetForm}
          // forceRender={true} // 强制渲染
          maskClosable={false}
        >
          <LabelWrappedForm 
            ref={lableFormRef} 
            inputDisabled={lookInputDisabled}
            fomeValues={labelFormValue}
            onDataChange={handleDataFromChild}
          />
      </Modal>
    </div>
  )
}

export default BlogLable