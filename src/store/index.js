import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user
  },
  strict: debug
})
export default store
