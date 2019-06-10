import Vue from 'vue'
import Vuex from 'vuex'
import film from './film/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    film
  }
})
