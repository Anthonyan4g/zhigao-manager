import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Error403() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <Result
      status={403}
      title='403'
      subTitle='抱歉，您没有权限访问此页面'
      extra={
        <Button type='primary' onClick={handleClick}>
          返回首页
        </Button>
      }
    />
  )
}
