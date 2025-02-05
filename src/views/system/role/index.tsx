import api from '@/api'
import { Role } from '@/types/api'
import { formatDate } from '@/utils'
import { useAntdTable } from 'ahooks'
import { Button, Form, Input, Modal, Space, Table, TableProps } from 'antd'
import { useForm } from 'antd/es/form/Form'
import CreateRole from './CreateRole'
import { IAction } from '@/types/modal'
import { useRef } from 'react'
import { message } from '@/utils/AntdGlobal'
import SetPermission from './SetPermission'
export default function RoleList() {
  const [form] = useForm()
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: Role.Params) => {
    return api
      .getRoleList({
        ...formData,
        pageNum: current,
        pageSize: pageSize
      })
      .then(data => {
        return {
          total: data.page.total,
          list: data.list
        }
      })
  }
  const roleRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void
  }>()
  const perRef = useRef<{
    open: (data?: Role.RoleItem) => void
  }>()

  const handleCreate = () => {
    roleRef.current?.open('create')
  }
  const handleEdit = (record: Role.RoleItem) => {
    roleRef.current?.open('edit', record)
  }
  const handleDelete = (_id: string) => {
    Modal.confirm({
      title: '确认删除该角色吗',
      content: `确认删除该角色吗?`,
      onOk() {
        handleDelSubmit(_id)
      }
    })
  }
  const handleDelSubmit = async (_id: string) => {
    await api.delRole({
      _id
    })
    message.success('删除成功')
    search.submit()
  }
  const handleSet = (record: Role.RoleItem) => {
    perRef.current?.open(record)
  }
  const { tableProps, search } = useAntdTable(getTableData, { form, defaultPageSize: 10 })
  const columns: TableProps<Role.RoleItem>['columns'] = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime: string) {
        return formatDate(updateTime)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleSet(record)}>
              设置权限
            </Button>
            <Button type='text' danger onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  return (
    <div className='roleWrapper'>
      <Form form={form} className='searchForm' layout='inline'>
        <Form.Item name='roleName' label='角色名称'>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={search.submit}>
              搜索
            </Button>
            <Button type='default' onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>角色列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table {...tableProps} bordered rowKey='_id' columns={columns} />
      </div>
      <CreateRole
        mRef={roleRef}
        update={() => {
          search.reset()
        }}
      />
      <SetPermission
        mRef={perRef}
        update={() => {
          search.reset()
        }}
      />
    </div>
  )
}
