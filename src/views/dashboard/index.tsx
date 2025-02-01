import { Descriptions, Card, Button } from 'antd'
import type { DescriptionsProps } from 'antd'
import styles from './index.module.less'
import * as echarts from 'echarts'
import { useEffect } from 'react'
export default function Dashboard() {
  useEffect(() => {
    const lineChart = document.getElementById('lineChart')
    const lineChartIns = echarts.init(lineChart)
    const pieChart1 = document.getElementById('pieChart1')
    const pieChart2 = document.getElementById('pieChart2')
    const pieChartIns1 = echarts.init(pieChart1)
    const pieChartIns2 = echarts.init(pieChart2)
    const raderChart = document.getElementById('raderChart')
    const raderChartIns = echarts.init(raderChart)
    raderChartIns.setOption({
      tooltip: {},
      legend: { data: ['司机模型诊断'] },
      radar: {
        indicator: [
          {
            name: '服务态度',
            max: 10
          },
          {
            name: '在线时长',
            max: 600
          },
          {
            name: '接单率',
            max: 100
          },
          {
            name: '评分',
            max: 5
          },
          {
            name: '关注度',
            max: 10000
          }
        ]
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: [
            {
              value: [8.2, 402, 98, 4.2, 8041],
              name: '司机模型诊断'
            }
          ]
        }
      ]
    })
    pieChartIns1.setOption({
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
          data: [
            {
              value: 335,
              name: '北京'
            },
            {
              value: 234,
              name: '上海'
            },
            {
              value: 1548,
              name: '广州'
            },
            {
              value: 548,
              name: '杭州和武汉'
            }
          ]
        }
      ]
    })
    pieChartIns2.setOption({
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
          radius: [70, 180],
          name: '城市分布',
          type: 'pie',
          data: [
            {
              value: 30,
              name: '北京'
            },
            {
              value: 40,
              name: '上海'
            },
            {
              value: 50,
              name: '广州'
            },
            {
              value: 60,
              name: '杭州和武汉'
            }
          ]
        }
      ]
    })
    lineChartIns.setOption({
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
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
          data: [120, 200, 150, 120, 200, 150, 120, 200, 150, 120, 200, 150],
          type: 'line'
        },
        {
          name: '流水',
          data: [1200, 2000, 1500, 1200, 2000, 1500, 1200, 2000, 1500, 1200, 2000, 1500],
          type: 'line'
        }
      ]
    })
  }, [])
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户ID',
      children: 'Zhou Maomao'
    },
    {
      key: '2',
      label: '邮箱',
      children: '1810000000'
    },
    {
      key: '3',
      label: '状态',
      children: 'Hangzhou, Zhejiang'
    },
    {
      key: '4',
      label: '手机号',
      children: 'empty'
    },
    {
      key: '5',
      label: '岗位',
      children: '前端工程师'
    },
    {
      key: '6',
      label: '部门',
      children: '大前端'
    }
  ]
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          alt=''
          className={styles.userImg}
        />
        <Descriptions title='User Info' items={items} />
      </div>
      <div className={styles.graph}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>100</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>100000</div>
        </div>
        <div className={styles.card}>
          <div className='title'>订单数量</div>
          <div className={styles.data}>2000</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>50座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card title='订单和流水走势图' bordered={false} extra={<Button type='primary'>刷新</Button>}>
          <div id='lineChart' className={styles.itemLine}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='司机分布' bordered={false} extra={<Button type='primary'>刷新</Button>}>
          <div className={styles.piechartContainer}>
            <div id='pieChart1' className={styles.itemPie}></div>
            <div id='pieChart2' className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='模型诊断' bordered={false} extra={<Button type='primary'>刷新</Button>}>
          <div id='raderChart' className={styles.itemLine}></div>
        </Card>
      </div>
    </div>
  )
}
