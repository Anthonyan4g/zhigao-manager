import { Menu } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { Form, Input, InputNumber, Modal, Radio, TreeSelect } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useImperativeHandle, useState } from 'react'
import api from '@/api'
import { message } from '@/utils/AntdGlobal'
import { QuestionCircleOutlined } from '@ant-design/icons'
export default function CreateMenu(props: IModalProp<Menu.EditParams>) {
  const [form] = useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])

  useImperativeHandle(props.mRef, () => ({ open }))
  const open = (type: IAction, data?: Menu.EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    getMenuList()
    if (data) {
      form.setFieldsValue(data)
    }
  }

  const getMenuList = async () => {
    const data = await api.getMenuList()
    setMenuList(data)
  }

  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        await api.createMenu(form.getFieldsValue())
      } else {
        await api.editMenu(form.getFieldsValue())
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
      title={action === 'create' ? '创建菜单' : '编辑菜单'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }} initialValues={{ menuType: 1, menuState: 1 }}>
        <Form.Item hidden name='_id'>
          <Input></Input>
        </Form.Item>
        <Form.Item label='父级菜单' name='parentId'>
          <TreeSelect
            placeholder='请选择父级菜单'
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            allowClear
            treeDefaultExpandAll
            treeData={menuList}
            fieldNames={{ label: 'menuName', value: '_id' }}
          />
        </Form.Item>
        <Form.Item label='菜单类型' name='menuType'>
          <Radio.Group
            options={[
              { value: 1, label: '菜单' },
              { value: 2, label: '按钮' },
              { value: 3, label: '页面' }
            ]}
          />
        </Form.Item>
        <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: '请填写菜单名称' }]}>
          <Input placeholder='请输入菜单名称'></Input>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => {
            return form.getFieldValue('menuType') === 2 ? (
              <Form.Item label='权限标识' name='menuCode'>
                <Input placeholder='请输入权限标识'></Input>
              </Form.Item>
            ) : (
              <>
                <Form.Item label='菜单图标' name='icon'>
                  <Input placeholder='请输入菜单图标'></Input>
                </Form.Item>
                <Form.Item label='路由地址' name='path'>
                  <Input placeholder='请输入路由地址'></Input>
                </Form.Item>
              </>
            )
          }}
        </Form.Item>
        <Form.Item label='组件名称' name='component'>
          <Input placeholder='请输入组件名称'></Input>
        </Form.Item>
        <Form.Item
          label='排序'
          name='orderBy'
          tooltip={{ title: '排序值越大越靠后', icon: <QuestionCircleOutlined /> }}
        >
          <InputNumber placeholder='请输入排序值'></InputNumber>
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Radio.Group
            options={[
              { value: 1, label: '正常' },
              { value: 2, label: '停用' }
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
