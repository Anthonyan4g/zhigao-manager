import { User } from '@/types/api'
import { Button, Form, Input, Modal, Select, Space, Table, TableProps } from 'antd'
import { useRef, useState } from 'react'
import api from '@/api'
import { formatDate } from '@/utils'
import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { useAntdTable } from 'ahooks'

export default function UserList() {
  // const [data, setData] = useState<User.UserItem[]>([])
  const [form] = Form.useForm()
  // const [total, setTotal] = useState(0)
  const [userIds, setUserIds] = useState<number[]>([])
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: User.Params) => {
    return api
      .getUserList({
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
  const { tableProps, search } = useAntdTable(getTableData, { form, defaultPageSize: 10 })

  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void
  }>()
  // const [pagination, setPagination] = useState({
  //   current: 1,
  //   pageSize: 10
  // })
  // const getUserList = async (params: PageParams) => {
  //   const values = form.getFieldsValue()
  //   const data = await api.getUserList({
  //     ...values,
  //     pageNum: params.pageNum,
  //     pageSize: params.pageSize || pagination.pageSize
  //   })

  //   setData(data.list)
  //   setTotal(data.page.total)
  //   setPagination({
  //     current: params.pageNum,
  //     pageSize: data.page.pageSize
  //   })
  // }
  // useEffect(() => {
  //   getUserList({
  //     pageNum: pagination.current,
  //     pageSize: pagination.pageSize
  //   })
  // }, [pagination.current, pagination.pageSize])
  const handleEdit = (record: User.UserItem) => {
    userRef.current?.open('edit', record)
  }
  const handleDel = (userId: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗</span>,
      onOk: () => {
        handleUserDelSubmit([userId])
      }
    })
  }
  const handleUserDelSubmit = async (ids: number[]) => {
    try {
      await api.delUser({ userIds: ids })
      message.success('删除成功')
      setUserIds([])
      // getUserList({
      //   pageNum: 1
      // })
      search.reset()
    } catch (error) {}
  }
  const handlePatchConfirm = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该批用户吗</span>,
      onOk: () => {
        handleUserDelSubmit(userIds)
      }
    })
  }
  const columns: TableProps<User.UserItem>['columns'] = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'address',
      render(_, record: User.UserItem) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDel(record.userId)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  const handelCreate = () => {
    userRef.current?.open('create')
  }

  return (
    <div className='userList'>
      <Form className='searchForm' form={form} layout='inline' initialValues={{ state: 1 }}>
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select
            options={[
              { value: 0, label: '所有' },
              { value: 1, label: '在职' },
              { value: 2, label: '离职' },
              { value: 3, label: '试用期' }
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={search.submit}>
              搜索
            </Button>
            <Button type='default' onClick={search.reset}>
              重制
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={handelCreate}>
              新增
            </Button>
            <Button type='primary' danger onClick={() => handlePatchConfirm()}>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          // pagination={{
          //   position: ['bottomRight'],
          //   current: pagination.current,
          //   pageSize: pagination.pageSize,
          //   showQuickJumper: true,
          //   showSizeChanger: true,
          //   total,
          //   showTotal: function (total) {
          //     return `总共${total}条`
          //   },
          //   onChange: (page, pageSize) => {
          //     setPagination({
          //       current: page,
          //       pageSize
          //     })
          //   }
          // }}
          {...tableProps}
          bordered
          rowKey='userId'
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUserIds(selectedRowKeys as number[])
            }
          }}
          // dataSource={data}
          columns={columns}
        />
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          // getUserList({
          //   pageNum: 1
          // })
          search.reset()
        }}
      />
    </div>
  )
}
