import styles from './index.module.less'
import { Button, Form, Input } from 'antd'
import api from '@/api'
import { Login } from '@/types/api'
import { message } from '@/utils/AntdGlobal'
import { useState } from 'react'
import { useBearStore } from '@/store'
import storage from '@/utils/storage'
export default function LoginFC() {
  const [loading, setLoading] = useState(false)
  const updateToken = useBearStore(state => state.updateToken)
  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true)
      const data = await api.login(values)
      setLoading(false)
      storage.set('token', data)
      updateToken(data)
      message.success('登陆成功')
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome'
      })
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登陆</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='userName' rules={[{ required: true, message: '请输入用户名！' }]}>
            <Input />
          </Form.Item>

          <Form.Item name='userPwd' rules={[{ required: true, message: '请输入密码！' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' block htmlType='submit' loading={loading}>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
