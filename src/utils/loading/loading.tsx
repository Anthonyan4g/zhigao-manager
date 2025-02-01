import { Spin } from 'antd'
import './loading.less'

const contentStyle: React.CSSProperties = {
  padding: 50,
  borderRadius: 4
}

const content = <div style={contentStyle} />
export default function Loading({ tip = 'loading' }: { tip?: string }) {
  return (
    <Spin tip={tip} size='large' className='request-loading'>
      {content}
    </Spin>
  )
}
