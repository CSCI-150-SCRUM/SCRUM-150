import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import './stylus/main.styl'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



Vue.use(BootstrapVue)


Vue.use(Vuetify, {
  theme: {
    primary: '#0D47A1', //Main color
    primaryText: '#FFFFFF', //Color for text on primary
    secondary: '#90CAF9', //Color for active nav
    lightText: '#000000' //Dark Text for light Backgrounds
  }
})



//Create the App with the router
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
