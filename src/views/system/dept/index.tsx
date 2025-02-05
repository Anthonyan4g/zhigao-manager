import api from '@/api'
import { Dept } from '@/types/api'
import { Button, Form, Input, Modal, Space, Table, TableProps } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import CreatDept from './CreateDept'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { formatDate } from '@/utils'
export function DeptList() {
  const [form] = useForm()
  const [data, setData] = useState<Dept.DeptItem[]>([])
  useEffect(() => {
    getDeptList()
  }, [])

  const deptRef = useRef<{
    open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void
  }>()

  const handleClick = () => {
    deptRef.current?.open('create')
  }

  const getDeptList = async () => {
    const data = await api.getDeptList(form.getFieldsValue())
    setData(data)
  }
  const handleReset = () => {
    form.resetFields()
  }
  const handleEdit = (record: Dept.DeptItem) => {
    deptRef.current?.open('edit', record)
  }
  const handleSubCreater = (id: string) => {
    deptRef.current?.open('create', { parentId: id })
  }
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确认删除该部门吗',
      onOk() {
        handleDelSubmit(id)
      }
    })
  }

  const handleDelSubmit = async (_id: string) => {
    await api.deleteDept({
      _id
    })
    message.success('删除成功')
    getDeptList()
  }

  const columns: TableProps<Dept.DeptItem>['columns'] = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime) {
        return formatDate(updateTime)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleSubCreater(record._id)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleDelete(record._id)} danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  return (
    <div>
      <Form className='searchForm' layout='inline' form={form}>
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='部门名称'></Input>
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='m10' onClick={getDeptList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重制
          </Button>
        </Form.Item>
      </Form>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>部门列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleClick}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false}></Table>
      </div>
      <CreatDept mRef={deptRef} update={getDeptList} />
    </div>
  )
}
