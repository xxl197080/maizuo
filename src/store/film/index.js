// 电影页面仓库数据

// 引入封装好的axions
import http from '@/utils/http.js'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state: {
    bannerList: [], // 轮播图数据
    filmList: [], // 当前影片的数据
    curFilmType: 0, // 当前影片类型，0 为正在热映，1 为即将上映
    pageNum: 1, // 当前页码
    pageSize: 10, // 每页显示的条数
    loading: false, // 是否在请求数据
    filmTotal: 10 // 电影列表的总数
  },
  mutations: {
    // 设置 仓库中的轮播图数据
    STEBANNERLIST (state, bannerList) {
      state.bannerList = bannerList
    },
    SETFILMLIST (state, filmList) {
      state.filmList = filmList
    },
    SETCURFILMTYPE (state, value) {
      state.curFilmType = value
    },
    /**
     *
     * @param {boolean} isReset 表示是否切换影片类型，将页码重置为1
     */
    ADDPAGENUM (state, isReset) {
      if (isReset) {
        state.pageNum = 1
      } else {
        state.pageNum += 1
      }
    },
    SETLOADING (state, boolean) {
      state.loading = boolean
    },
    SETFILMTOTAL (state, total) {
      state.filmTotal = total
    }
  },
  actions: {
    /**
     * 获取轮播图的数据
     */
    // context 直接解构操作commit
    getBannerList ({ commit }) {
      // http.get('/gateway?type=2&cityId=440300&k=4135204')
      //   .then(res => {
      //     commit('SETBANNERLIST',res);
      //   })
      // 需要设置请求头才能访问
      http.get('/gateway', {
        params: {
          type: 2,
          cityId: 440300,
          k: 4135204
        },
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15593034574385161609249"}',
          'X-Host': 'mall.cfg.common-banner'
        }
      }).then(res => {
        // console.log(res);
        commit('STEBANNERLIST', res.data)
      })
      // .catch(err => {
      //   console.log(err)
      //   // Toast.loading({
      //   //   mask: true,
      //   //   message: '玩命加载中...'
      //   // });
      //   Toast('网络异常，请稍后重试！')
      // })
    },

    /**
     * 获取影片数据
     * @param {boolean} isLoadMore 判断是不是加载更多，如果是就做一个filmList的拼接
     */
    getFilmList ({ commit, state }, isLoadMore) {
      commit('SETLOADING', true) // 请求中
      Toast.loading({
        mask: true,
        duration: 0, // 展示时长(ms)，值为 0 时，toast 不会消失
        message: '玩命加载中...'
      })
      setTimeout(() => {
        http.get('/gateway', {
          params: {
            cityId: 440300,
            pageNum: state.pageNum,
            pageSize: state.pageSize,
            type: state.curFilmType === 0 ? 1 : 2,
            // type: state.curFilmType +=1 ,  // 不行，不能获取到当前点击的是什么
            k: 805359
          },
          headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15593034574385161609249"}',
            'X-Host': 'mall.film-ticket.film.list'
          }
        }).then(res => {
          // console.log(res)
          if (isLoadMore) {
            // 加载更多
            let newFilmList = [...state.filmList, ...res.data.films]
            commit('SETFILMLIST', newFilmList)
          } else {
            commit('SETFILMLIST', res.data.films)
          }
          // 请求成功，清除loding提示
          Toast.clear()
          // 请求完成，pageNum++
          commit('ADDPAGENUM')
          commit('SETLOADING', false) // 请求完成
          commit('SETFILMTOTAL', res.data.total)
        })
      }, 500)
    },
    /**
     * 影片类型切换
     * @param {Number} index 是当前tab的下标，0为正在热映，1为即将上映
     */
    filmChange ({ dispatch, commit }) {
      // 影片切换，先清空旧影片数据
      commit('SETFILMLIST', [])
      // 再清空页码为1
      commit('ADDPAGENUM', true)
      dispatch('getFilmList')
    }
  }

}
