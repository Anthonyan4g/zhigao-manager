import api from '@/api'
import { Role } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useImperativeHandle, useState } from 'react'

export default function CreateRole(props: IModalProp<Role.RoleItem>) {
  const [form] = useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })
  const open = (type: IAction, data?: Role.RoleItem) => {
    setAction(type)
    setVisible(true)

    if (data) {
      form.setFieldsValue(data)
    }
  }

  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        await api.createRole(form.getFieldsValue())
      } else {
        await api.editRole(form.getFieldsValue())
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
      title={action === 'create' ? '新增角色' : '编辑角色'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        <Form.Item hidden name='_id'>
          <Input />
        </Form.Item>
        <Form.Item name='roleName' label='角色名称' rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item name='remark' label='备注'>
          <Input.TextArea placeholder='请输入备注' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
