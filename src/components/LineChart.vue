<script>
  import { Line } from 'vue-chartjs'

  export default {
    mixins: [Line],
    props: ['data', 'options'],
    computed: {
      chartData () {
        return this.data
      }
    },
    methods: {
      renderDoughnutChart () {
        this.renderChart(this.chartData, this.options)
      }
    },
    watch: {
      data: function() {
        // this._chart.destroy();
        this.renderDoughnutChart();
      }
    },
    mounted () {
      this.renderDoughnutChart()
    }
  }
</script>
