import Vue from 'vue'
import Vuex from 'vuex'
import film from './film/index.js'
import city from './city/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    film,
    city
  }
})
