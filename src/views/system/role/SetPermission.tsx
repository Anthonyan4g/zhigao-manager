import api from '@/api'
import { Menu, Role } from '@/types/api'
import { IModalProp2 } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { Form, Modal, Tree } from 'antd'

import { useEffect, useImperativeHandle, useState } from 'react'

export default function SetPermission(props: IModalProp2<Role.RoleItem>) {
  const [visible, setVisible] = useState(false)
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
  const [pl, setPL] = useState<Role.CreatePermission>()
  useEffect(() => {
    getMenuList()
  }, [])

  const getMenuList = async () => {
    const menuList = await api.getMenuList()
    setMenuList(menuList)
  }
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })
  const open = (data?: Role.RoleItem) => {
    setVisible(true)
    setRoleInfo(data)
    setCheckedKeys(data?.permissionList.checkedKeys || [])
  }

  const handleSubmit = async () => {
    if (pl) {
      api.updatePermission(pl)
      message.success('设置成功')
      handleCancel()
      props.update()
    }
  }
  const handleCancel = () => {
    setVisible(false)
    setPL(undefined)
  }
  const onCheck = (checked: any, item: any) => {
    setCheckedKeys(checked)
    const checkedKeys: string[] = []
    const parentcheckedKeys: string[] = []
    item.checkedNodes.map((node: Menu.MenuItem) => {
      if (node.menuType === 2) {
        checkedKeys.push(node._id)
      } else {
        parentcheckedKeys.push(node._id)
      }
    })
    setPL({
      _id: roleInfo?._id || '',
      permissionList: {
        checkedKeys,
        halfCheckedKeys: parentcheckedKeys.concat(item.halfCheckedKeys)
      }
    })
  }
  return (
    <Modal
      title='设置权限'
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form labelAlign='right' labelCol={{ span: 4 }}>
        <Form.Item label='角色名称' rules={[{ required: true, message: '请输入角色名称' }]}>
          {roleInfo?.roleName}
        </Form.Item>
        <Form.Item label='权限'>
          <Tree
            checkable
            defaultExpandAll
            fieldNames={{
              title: 'menuName',
              key: '_id',
              children: 'children'
            }}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={menuList}
          ></Tree>
        </Form.Item>
      </Form>
    </Modal>
  )
}
