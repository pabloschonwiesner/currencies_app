<template>
  <div class="insertCryptoPrice">
    <div class="column">
      <div class="label title">Ingresar un nuevo precio de una criptomoneda</div>
      <div class="row">
        <div class="column columnLeft">
          <div class="label">Criptomoneda</div>
          <el-radio-group class="crypto" v-model="cryptoSelected">
            <el-radio-button v-for="crypto in cryptoList" :key="crypto.id"  :label="crypto.symbol"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="column columnLeft date">
          <div class="label">Fecha</div>
          <el-date-picker v-model="date" format="dd/MM/yyyy"></el-date-picker>
        </div>
        <div class="column columnLeft price">
          <div class="label">Precio</div>
          <el-input-number v-model="price" :precision="4" :controls="false" :min="0"></el-input-number>
        </div>
        <div class="column columnLeft">
          <div class="label">&nbsp;</div>
          <el-button @click="insertPrice">Ingresar</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'InsertCryptoPrice',
  props: [ 'cryptoList'],
  data () {
    return {
      cryptoSelected: 'BTC',
      date: new Date(),
      price: 0
    }
  },
  methods: {
    async insertPrice () {
      try {
        let id_currency = this.cryptoList.find( item => item.symbol == this.cryptoSelected)

        await axios.post(`${process.env.VUE_APP_URLAPI}/rates`, { id_currency: id_currency.id, value: this.price})
        this.price = 0
        this.$message({message: 'Se ingresó un nuevo precio!', type: 'success'})
      } catch ( err ) { this.$message({message: 'Hubo un error! no se pudo ingresar un nuevo precio', type: 'error'}) }
    }
  }
}
</script>

<style scoped>
  .row { justify-content: center;}
  .columnLeft { align-items: flex-start; margin-right: 20px;}
  .insertCryptoPrice { min-width: 900px; background-color: #f6f7ff; padding: 15px; border: 1px solid #ced3ff; border-radius: 4px; margin-bottom: 30px;}
  .title, .crypto, .date, .price { margin-bottom: 15px;}
</style>