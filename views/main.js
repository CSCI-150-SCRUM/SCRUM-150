import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import Vuex from 'vuex'
import draggable from 'vuedraggable'
import './stylus/main.styl'
import VueSweetalert2 from 'vue-sweetalert2';
import FullCalendar from 'vue-full-calendar'



Vue.use(Vuetify, {
  theme: {
    primary: '#3A1C71', //Main color
    primaryText: '#FFFFFF', //Color for text on primary
    secondary: '#7C4DFF', //Color for active nav
    lightText: '#000000' //Dark Text for light Backgrounds
  }
})

Vue.use(VueSweetalert2)

Vue.use(FullCalendar)

//Create the App with the router
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})