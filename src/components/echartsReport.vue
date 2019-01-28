<template>
<div id="echarts">
  <div id="sell" style="width: 800px;height: 500px;"></div>
</div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: '',
  data () {
    return {
      dataX: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      serie1: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      serie2: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    }
  },
  mounted () {
    this.$nextTick(() => {
      //  bar 柱状图 line 折线图
      this.initEchart('sell', 'bar')
    })
  },
  methods: {
    initEchart (id, type) {
      let myChart = echarts.init(document.getElementById(id))
      let option = {
        title: {
          text: '用户数量'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['tokyo', 'london'],
          y: 'bottom'
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: this.dataX
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'tokyo',
            type: type, // line折线图
            data: this.serie1,
            itemStyle: {
              normal: {
                color: '#3352ff'
              }
            }
          },
          {
            name: 'london',
            type: type,
            data: this.serie2,
            itemStyle: {
              normal: {
                color: '#5bffbd'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="less">

</style>
