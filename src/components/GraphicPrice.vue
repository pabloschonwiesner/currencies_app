<template>
  <div class="graphicPrice">
    <line-chart :data="data" :options="options" :width="900" :height="300"></line-chart>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'

export default {
  name: 'GraphicPrice',
  props: ['data'],
  components: { LineChart },
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'right',
        },
        layout: {
          padding: 0
        }
      },
    }
  }
}
</script>

<style scoped>
  .graphicPrice { margin-top: 30px;}
</style>