import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import Vuex from 'vuex'
import draggable from 'vuedraggable'
import './stylus/main.styl'
import VueSweetalert2 from 'vue-sweetalert2';




Vue.use(Vuetify, {
  theme: {
    primary: '#0D47A1', //Main color
    primaryText: '#FFFFFF', //Color for text on primary
    secondary: '#90CAF9', //Color for active nav
    lightText: '#000000' //Dark Text for light Backgrounds
  }
})

Vue.use(VueSweetalert2)


//Create the App with the router
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
