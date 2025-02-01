import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, Switch } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import storage from '@/utils/storage'
import { useBearStore } from '@/store'
const NavHeader = () => {
  const { userInfo, updateCollapsed, collapsed } = useBearStore()
  const breadlist = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    }
  ]
  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱：' + userInfo.userEmail
    },
    {
      key: 'logout',
      label: '退出'
    }
  ]
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.remove('token')
      location.href = '/login?callback' + encodeURIComponent(location.href)
    }
  }
  const collapsedT = () => {
    updateCollapsed()
  }
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div onClick={collapsedT}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
        <Breadcrumb items={breadlist} style={{ marginLeft: 10 }} />
      </div>
      <div className='right'>
        <Switch checkedChildren='黑暗' unCheckedChildren='默认' style={{ marginRight: 10 }} />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickName}>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
