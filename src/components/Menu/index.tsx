import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { useBearStore } from '@/store'
const SideMenu = () => {
  const navigate = useNavigate()
  const collapsed = useBearStore(state => state.collapsed)
  const items = [
    {
      key: '1',
      icon: <DesktopOutlined />,
      label: '工作台'
    },
    {
      key: '2',
      icon: <SettingOutlined />,
      label: '系统管理',
      children: [
        {
          key: '3',
          icon: <TeamOutlined />,
          label: '用户管理'
        }
      ]
    }
  ]
  return (
    <div>
      <div
        className={styles.logo}
        onClick={() => {
          navigate('/welcome')
        }}
      >
        <img
          src='/imgs/logo.png'
          alt=''
          className={styles.img}
          style={{ transition: 'transform 0.3s ease', ...(collapsed ? { transform: 'translate(23%)' } : {}) }}
        />
        {collapsed ? '' : <span>志高志高</span>}
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        style={{
          width: collapsed ? 80 : 'auto'
        }}
        mode='inline'
        theme='dark'
        items={items}
      />
    </div>
  )
}

export default SideMenu
