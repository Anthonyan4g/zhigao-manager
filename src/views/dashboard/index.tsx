import { Descriptions, Card, Button } from 'antd'
import type { DescriptionsProps } from 'antd'
import styles from './index.module.less'

import { useEffect, useState } from 'react'
import { useBearStore } from '@/store'
import { formatMoney, formatNum, formatState } from '@/utils'
import api from '@/api'
import { Dashboard as Dashboard1 } from '@/types/api'
import { useCharts } from '@/hook/useCharts'

export default function Dashboard() {
  const userInfo = useBearStore(state => state.userInfo)
  const [report, setReport] = useState<Dashboard1.ReportData>()
  const getReportData = async () => {
    const data = await api.getReportData()
    setReport(data)
  }
  const [lineRef, LineChart] = useCharts()
  const [pieRef1, pieChart1] = useCharts()
  const [pieRef2, pieChart2] = useCharts()
  const [radarRef, radarChart] = useCharts()
  const handleRefresh = () => {
    renderPieChart1()
    renderPieChart2()
  }
  const renderLineChart = async () => {
    if (!LineChart) return
    const data = await api.getLineData()
    LineChart?.setOption({
      xAxis: {
        type: 'category',
        data: data.labal
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          data: data.order,
          type: 'line'
        },
        {
          name: '流水',
          data: data.money,
          type: 'line'
        }
      ]
    })
  }
  const renderPieChart1 = async () => {
    if (!pieChart1) return
    const data = await api.getPieCityData()
    pieChart1?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          data: data
        }
      ]
    })
  }
  const renderPieChart2 = async () => {
    if (!pieChart2) return
    const data = await api.getPieAgeData()
    pieChart2?.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          roseType: 'radius',
          radius: [40, 150],
          name: '城市分布',
          type: 'pie',
          data: data
        }
      ]
    })
  }
  const renderRadarChart = async () => {
    if (!radarChart) return
    const data = await api.getRadarData()
    radarChart?.setOption({
      tooltip: {},
      legend: { data: ['司机模型诊断'] },
      radar: {
        indicator: data.indicator
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: data.data
        }
      ]
    })
  }
  useEffect(() => {
    getReportData()
  }, [])
  useEffect(() => {
    renderLineChart()
    renderPieChart1()
    renderPieChart2()
    renderRadarChart()
  }, [LineChart, pieChart1, pieChart2, radarChart])
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户ID',
      children: userInfo.userId
    },
    {
      key: '2',
      label: '邮箱',
      children: userInfo.userEmail
    },
    {
      key: '3',
      label: '状态',
      children: formatState(userInfo.state)
    },
    {
      key: '4',
      label: '手机号',
      children: userInfo.mobile
    },
    {
      key: '5',
      label: '岗位',
      children: userInfo.job
    },
    {
      key: '6',
      label: '部门',
      children: userInfo.deptName
    }
  ]
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img src={userInfo.userImg} alt='' className={styles.userImg} />
        <Descriptions title='User Info' items={items} />
      </div>
      <div className={styles.graph}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>订单数量</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>{formatNum(report?.cityNum)}</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card
          title='订单和流水走势图'
          bordered={false}
          extra={
            <Button type='primary' onClick={renderLineChart}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.itemLine}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='司机分布'
          bordered={false}
          extra={
            <Button type='primary' onClick={handleRefresh}>
              刷新
            </Button>
          }
        >
          <div className={styles.piechartContainer}>
            <div ref={pieRef1} className={styles.itemPie}></div>
            <div ref={pieRef2} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='模型诊断'
          bordered={false}
          extra={
            <Button type='primary' onClick={renderRadarChart}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.itemLine}></div>
        </Card>
      </div>
    </div>
  )
}
