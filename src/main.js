import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/es'
import App from './App.vue'

Vue.config.productionTip = false

// Vue.use(ElementUI);
Vue.use(ElementUI, {locale});

Vue.filter('textCapitalize', (value) => {
  if(!value) return ''
  let text = value.toLowerCase();
  return text.substring(0,1).toUpperCase() + text.substring(1, text.length)
})

Vue.filter('formatDateDDMMYYYYhhmm', (value) => {
  let fecha = new Date(value)
  let dia = fecha.getDate()
  let mes = fecha.getMonth() + 1
  let anio = fecha.getFullYear()
  let hora = fecha.getHours()
  let minutos = fecha.getMinutes()

  if(dia < 10) dia = '0' + dia
  if(mes < 10) mes = '0' + mes
  if(hora < 10) hora = '0' + hora
  if(minutos < 10) minutos = '0' + minutos

  return dia.toString() + '/' + mes.toString() + '/' + anio.toString() + ' ' + hora.toString() + ':' + minutos.toString()
})


new Vue({
  render: h => h(App),
}).$mount('#app')
