import Vue from 'vue'
import AOS from 'aos';
import App from './App'

Vue.config.productionTip = false
AOS.init();
new Vue({
  render: h => h(App),
}).$mount('#app')
