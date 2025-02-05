import React, { useEffect } from 'react'

import { Layout, Watermark } from 'antd'
import { Navigate, Outlet, useLocation, useRouteLoaderData } from 'react-router-dom'
import SideMenu from '@/components/Menu'
import NavHeader from '@/components/NavHeader'
import styles from './index.module.less'
const { Header, Footer, Sider } = Layout
import api from '@/api'
import { useBearStore } from '@/store'
import { IAuthLader } from '@/router/AuthLoader'
import { searchRouter } from '@/utils'
import { routers as router } from '@/router'
const App: React.FC = () => {
  const { pathname } = useLocation()
  const { updateUserInfo, collapsed } = useBearStore()
  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }

  const route = searchRouter(pathname, router)
  if (route && route.meta?.auth == false) {
  } else {
    const data = useRouteLoaderData('layout') as IAuthLader
    const staticP = ['/welcome', '/403', '/404']
    if (!data.menuPathList.includes(pathname) && !staticP.includes(pathname)) {
      return <Navigate to='/403' />
    }
  }

  return (
    <Watermark content='zhigao' inherit={false}>
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
