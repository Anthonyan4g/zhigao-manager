import React, { useEffect } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Watermark } from 'antd'
import { Outlet } from 'react-router-dom'
import SideMenu from '@/components/Menu'
import NavHeader from '@/components/NavHeader'
import styles from './index.module.less'
const { Header, Content, Footer, Sider } = Layout
import api from '@/api'
import { useBearStore } from '@/store'

const App: React.FC = () => {
  const { updateUserInfo, collapsed } = useBearStore()
  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }
  return (
    <Watermark content='zhigao'>
      <Layout>
        <Sider collapsed={collapsed}>
          <SideMenu />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: 'white', height: 50 }}>
            <NavHeader />
          </Header>
          <div className={styles.wrapper}>
            <Outlet />
          </div>
          <Footer style={{ textAlign: 'center', color: '#808080', marginTop: 20 }}>
            zhigao练习开发react后台管理程序@
          </Footer>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
