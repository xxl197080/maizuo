<template>
  <div class="page-film">
    <van-swipe class="swiper" :autoplay="3000" indicator-color="white">
      <van-swipe-item
      v-for="banner in bannerList"
      :key="banner.bannerId"
      >
        <img :src="banner.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>

    <van-tabs
    class="film-tabs"
    sticky
    v-model="curFilmType"
    @click="filmChange"
    >
      <van-tab title="正在热映">
        <filmList film-type="nowPlaying" :filmList="filmList"></filmList>
      </van-tab>
      <van-tab title="即将上映">
        <filmList film-type="comingSoon" :filmList="filmList"></filmList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import FilmList from '@/components/FilmList'
import { mapActions, mapState } from 'vuex'
import { Toast } from 'vant';

export default {
  // data () {
  //   return {
  //     tabAct: 0
  //   }
  // },
  components:{
    FilmList
  },
  computed: {
    ...mapState('film',['bannerList','filmList', 'loading', 'pageNum', 'filmTotal']),
    curFilmType: {
      get () {
        return this.$store.state.film.curFilmType;
      },
      set (value) {
        this.$store.commit('film/SETCURFILMTYPE',value)
      }
    }
  },
  methods: {
    ...mapActions('film',['getBannerList', 'getFilmList', 'filmChange']),
    // 可以把影片类型切换放入到仓库中
    // /**
    //  * 影片类型切换
    //  * @param {Number} index 是当前tab的下标，0为正在热映，1为即将上映
    //  */
    // handleTab (index,title) {
    //   console.log(index,title)
    //   this.getFilmList();
    // }

    /**
     * 监听滚动条事件
     */
    onScroll () {
      // 判断当前滚动条是否滚到底部
      let scrollTop = document.documentElement.scrollTop;// 获取滚动条距离顶部的高度
      let scrollHeight = document.body.scrollHeight; // 页面高度
      let clientHeight = document.documentElement.clientHeight; // 可视高度
      // console.log(scrollTop ,clientHeight)
      if ( scrollHeight - scrollTop - clientHeight <= 50) {
        console.log('到底了')
        console.log(this.filmList.length,this.filmTotal)
        if (!this.loading){ // 当loading为false说明没在请求，请求之后loading为true，！true就进不来
          if ( this.filmList.length >= this.filmTotal) {
            Toast('没有更多了')
          } else {
            this.getFilmList( true ); // 传了true过去说明是加载更多，filmList要做一个拼接
          }
        }
      }
    }
  },
  created () {
    this.getBannerList()
    // console.log(this.bannerList)
    this.getFilmList();
    // console.log(this.filmList)
    // 在创建后可以监听到滚动条,监听的是window
    window.addEventListener('scroll',this.onScroll)
  }
}
</script>

<style lang="less">
@import '~@/style/common/mixins.less';
@import '~@/style/common/variable.less';


.page-film{
  .swiper{
    height: 210px;
    img{
      width: 100%;
    }
  }
  .film-list{
    padding-bottom: 50px;
    .film-item{
      .border-bottom;
      display: flex;
      padding: 15px;
      height: 94px;
      position: relative;
      align-items: center;

      .film-img{
      width: 66px;
      }
      .film-text{
        flex: 1;
        margin-left: 10px;
        font-size: 14px;
        color: @tabColor;
      }
      .film-buy{
        .border-all;
        line-height: 25px;
        height: 25px;
        width: 50px;
        color: #ff5f16;
        font-size: 13px;
        text-align: center;
        border-radius: 2px;
      }
    }
  }
  .film-tabs{
    overflow: hidden;
  }
}
</style>
