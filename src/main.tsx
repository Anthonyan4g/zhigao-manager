import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')!).render(<App />)
