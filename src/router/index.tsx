import { createBrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import Login from '@/views/login/Login'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Error403 from '@/views/403'
import Layout from '@/layout'
import Dashboard from '@/views/dashboard'

const routers = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <Layout />,
    children: [{ path: '/welcome', element: <Welcome /> }],
    children: [{ path: '/dashboard', element: <Dashboard /> }]
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
