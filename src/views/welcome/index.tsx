import request from '@/utils/request'
import { Button } from 'antd'
import storage from '@/utils/storage'
import { formatMoney, toLocalDate, formatDate } from '@/utils'
import styles from './index.module.less'
import { useBearStore } from '@/store'
export default function Welcome() {
  const state = useBearStore()
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎学习</div>
        <div className={styles.title}>React后台管理系统</div>
        <div className={styles.desc}>React+ReactRouter+antd+TS+Vite</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
