<template>
  <div class="latestPrice">
    <div class="column">
      <div class="label title">Último precio de una criptomoneda</div>
      <div class="row">
        <div class="column columnLeft">
          <div class="label">Criptomoneda</div>
          <el-radio-group class="crypto" v-model="cryptoSelected" @change="changeCrypto">
            <el-radio-button v-for="crypto in cryptoList" :key="crypto.id"  :label="crypto.symbol"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="column priceContainer" >
          <div class="label description" v-if="cryptoSelected != ''">{{crypto.currency ? crypto.currency.description : '' | textCapitalize}}</div>
          <div class="label date" v-if="cryptoSelected != ''">{{crypto.created_at | formatDateDDMMYYYYhhmm}} </div>
          <div class="label price" v-if="cryptoSelected != ''">$ {{crypto.value}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LatestPrice',
  props: [ 'cryptoList', 'crypto'],
  data () {
    return {
      cryptoSelected: '',
      date: new Date(),
      price: 0
    }
  },
  methods: {
    changeCrypto () {
      this.$emit('selectCrypto', this.cryptoSelected)
    }
  }
}
</script>

<style scoped>
  .row { justify-content: center;}
  .columnLeft { align-items: flex-start; margin-right: 20px;}
  .latestPrice { min-width: 900px; background-color: #f6f7ff; padding: 15px; border: 1px solid #ced3ff; border-radius: 4px;}
  .title { margin-bottom: 15px;}
  .priceContainer { background-color: white; padding: 20px 40px; border: 1px solid #ced3ff; width: 200px; height: 80px;}
  .description { font-weight: bold;}
  .date { font-size: 12px; color: grey}
  .price { font-size: 35px; font-weight: bold;}
</style>