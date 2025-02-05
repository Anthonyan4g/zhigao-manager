import { Menu, MenuProps } from 'antd'

import styles from './index.module.less'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { useBearStore } from '@/store'
import { useEffect, useState } from 'react'
import { Menu as IMenu } from '@/types/api'
import * as Icons from '@ant-design/icons'
import React from 'react'
const SideMenu = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const navigate = useNavigate()
  const collapsed = useBearStore(state => state.collapsed)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const { pathname } = useLocation()
  type MenuItem = Required<MenuProps>['items'][number]

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children
    } as MenuItem
  }

  function createIcon(name?: string) {
    if (!name) return <></>
    const Micon: { [key: string]: any } = Icons
    const icon = Micon[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }
  //递归
  const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
    menuList.forEach((item, index) => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons) return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
        treeList.push(
          getItem(
            item.menuName,
            item.path || index,
            createIcon(item.icon),
            item.children ? getTreeMenu(item.children) : []
          )
        )
      }
    })
    return treeList
  }
  const data: any = useRouteLoaderData('layout')
  //初始化
  useEffect(() => {
    const tree = getTreeMenu(data.menuList, [])
    setMenuList(tree)
    setSelectedKeys([pathname])
  }, [])
  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }
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
        style={{
          width: collapsed ? 80 : 'auto'
        }}
        mode='inline'
        theme='dark'
        items={menuList}
        selectedKeys={selectedKeys}
        onClick={handleClickMenu}
      />
    </div>
  )
}

export default SideMenu
