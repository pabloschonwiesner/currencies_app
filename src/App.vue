<template>
  <div id="app">
    <h1>Cotizacion de Cryptomonedas</h1>
    <insert-crypto-price :cryptoList="cryptoList"></insert-crypto-price>
    <latest-price :cryptoList="cryptoList" :crypto="crypto" @selectCrypto="selectCrypto"></latest-price>
    <graphic-price :data="data" v-if="cryptoSelected != ''" ></graphic-price>
  </div>
</template>

<script>
import axios from 'axios'
import InsertCryptoPrice from '@/components/InsertCryptoPrice.vue'
import LatestPrice from '@/components/LatestPrice.vue'
import GraphicPrice from '@/components/GraphicPrice.vue'

let api = axios.create({
  baseURL: process.env.VUE_APP_URLAPI,
  timeout: 10000,
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
})

export default {
  name: 'App',
  data () {
    return {
      cryptoList: [],
      crypto: {},
      cryptoSelected: '',
      data: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: '#f87979',
            data: []
          }
        ]
      }
    }
  },
  components: { InsertCryptoPrice, LatestPrice, GraphicPrice },
  methods: {
    selectCrypto (symbol) {
      this.cryptoSelected = symbol
      this.getRates()
      this.getRatesSymbol()
    },
    async getRates () {
      let rate = await api.get(`/rates/${this.cryptoSelected}`)
      this.crypto = rate.data
    },
    async getRatesSymbol () {
      let rate = await api.get(`/ratesSymbol/${this.cryptoSelected}/5`)
      let labels = [], data = []
      
      rate.data.serie.reverse().forEach( item => {
        labels.push(this.$options.filters.formatDateDDMMYYYYhhmm(item.created_at))
        data.push(item.value)
      })

      let newData = Object.assign({}, this.data)
      newData.labels = labels
      newData.datasets[0].data = data
      newData.datasets[0].label = this.cryptoSelected

      this.data = newData
    },
  },
  async created () {
    let currencies = await api.get('/currencies')
    this.cryptoList = currencies.data
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.row {
  display: flex;
  justify-content: flex-start;
}
</style>
