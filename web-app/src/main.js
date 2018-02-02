// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  debug: true,
  state: {
    searchString: ''
  },
  getters: {
    searchString: state => state.searchString
  },
  mutations: {
    update (state, payload) {
      state.searchString = payload
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
