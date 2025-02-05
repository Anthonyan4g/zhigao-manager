import { Dept, User } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { Form, Input, Modal, Select, TreeSelect } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useImperativeHandle, useState } from 'react'
import api from '@/api'
import { message } from '@/utils/AntdGlobal'
export default function CreatDept(props: IModalProp<Dept.DeptItem>) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  const [userList, setUserList] = useState<User.UserItem[]>([])

  useImperativeHandle(props.mRef, () => ({ open }))
  const open = (type: IAction, data?: Dept.DeptItem | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    getDeptList()
    if (data) {
      form.setFieldsValue(data)
    }
  }

  useEffect(() => {
    getAllUserList()
  }, [])
  const getDeptList = async () => {
    const data = await api.getDeptList()
    setDeptList(data)
  }

  const getAllUserList = async () => {
    const data = await api.getAllUserList()
    setUserList(data)
  }

  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        await api.createDept(form.getFieldsValue())
      } else {
        await api.editDept(form.getFieldsValue())
      }
      message.success('操作成功')
      handleCancel()
      props.update()
    }
  }

  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        {/* <Form.Item hidden name='_id'>
          <Input></Input>
        </Form.Item> */}
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            placeholder='请选择上级部门'
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            allowClear
            treeDefaultExpandAll
            treeData={deptList}
            fieldNames={{ label: 'deptName', value: '_id' }}
          />
        </Form.Item>
        <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请填写部门名称' }]}>
          <Input placeholder='请输入部门名称'></Input>
        </Form.Item>
        <Form.Item label='负责人' name='userName' rules={[{ required: true, message: '请选择副主任' }]}>
          <Select style={{ width: '100%' }}>
            {userList.map(item => {
              return (
                <Select.Option value={item.userName} key={item._id}>
                  {item.userName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
