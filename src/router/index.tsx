import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/views/login/Login'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Error403 from '@/views/403'
import Layout from '@/layout'
import Dashboard from '@/views/dashboard'
import UserList from '@/views/system/user'
import { DeptList } from '@/views/system/dept'
import { MenuList } from '@/views/system/menu'
import AuthLoader from './AuthLoader'
import RoleList from '@/views/system/role'
export const routers = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    id: 'layout',
    element: <Layout />,
    loader: AuthLoader,
    children: [
      { path: '/welcome', element: <Welcome /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/userList', element: <UserList /> },
      { path: '/deptList', element: <DeptList /> },
      { path: '/menuList', element: <MenuList /> },
      { path: '/roleList', element: <RoleList /> }
    ]
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '/403',
    element: <Error403 />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]
// export default function Router() {
//   return useRoutes(routers)
// }
export default createBrowserRouter(routers)
