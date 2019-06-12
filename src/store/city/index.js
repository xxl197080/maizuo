// 这是城市数据仓库
import http from '@/utils/http.js'

export default {
  namespaced: true,

  state: {
    cityList: [] // 城市列表数据
  },
  mutations: {
    SETCITYLIST (state, citys) {
      state.cityList = citys
    }
  },
  getters: {
    newCityList (state) {
      let index = 0 // 下标
      let hash = {} // 循环城市列表的时候，判断该城市的首字母是否创建
      let result = [] // 最后需要返回的数据，处理好之后的数据

      state.cityList.forEach(city => {
        let py = city.pinyin.charAt(0).toUpperCase()
        if (hash[py]) {
          // result 数组的下标 B: 2,在数组里下标为 1
          result[hash[py] - 1].list.push(city)
        } else {
          // 使他下次循环遇到首字母相同的，让他走到if条件
          // hash: { A: 1, B: 2 }
          hash[py] = ++index
          // 构建需要的数据结构
          let obj = {
            py: py,
            list: [city]
          }
          // 将构建好的 数据添加到 result 里面
          result.push(obj)
        }
      })
      return result.sort((a, b) => a.py.charCodeAt() - b.py.charCodeAt())
    },
    hotCity (state) {
      return state.cityList.filter(item => item.isHot)
    },
    indexCity (state, getters) {
      return getters.newCityList.map(item => item.py)
    }
  },
  actions: {
    getCityList ({ commit }) {
      http.get('/gateway?k=81527', {
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15593034574385161609249"}',
          'X-Host': 'mall.film-ticket.city.list'
        }
      }).then(res => {
        // console.log(res.data.cities)
        commit('SETCITYLIST', res.data.cities)
      })
    }
  }
}
