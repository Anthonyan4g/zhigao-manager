import { RouterProvider } from 'react-router-dom'
import './App.css'
import routers from './router'
import { ConfigProvider, App as AntdApp } from 'antd'
import AntdGlobal from './utils/AntdGlobal'
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4b5cc4'
        }
      }}
    >
      <AntdApp>
        <AntdGlobal />
        <RouterProvider router={routers}></RouterProvider>
      </AntdApp>
    </ConfigProvider>
  )
  // return (
  //   <BrowserRouter>
  //     <Router />
  //   </BrowserRouter>
  // )
}

export default App
