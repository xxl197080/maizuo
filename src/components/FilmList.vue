// 电影列表组件
<template>
  <ul class="film-list">
    <li class="film-item"
    v-for="film in filmList"
    :key="film.filmId"
    >
      <img class="film-img" :src="film.poster" alt="">
      <div class="film-text">
        <p>{{ film.name }}</p>
        <p v-if="filmType === 'nowPlaying'">观众评分 <span>{{ film.grade }}</span></p>
        <p>主演：{{ film.actors | formatActor }}</p>
        <p>美国 | {{ film.runtime }} 分钟</p>
      </div>
      <div class="film-buy" v-if="filmType === 'nowPlaying'">购票</div>
      <div class="film-buy" v-else>预约</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    // 影片类型
    filmType: {
      validator (value) {
        return ['nowPlaying','comingSoon'].indexOf(value) !== -1;
      }
    },
    // 影片数据
    filmList: {
      type: Array
    }
  },
  filters: {
    /**
     * 用filters格式化主演名字
     */
    formatActor (actors = []) { // 即将上映有的主演是空，所以要给一个没有actors给他一个空数组
      let str = '';
      let arr = actors.map(item => item.name);
      // 如果没有主演，要返回字符串 暂无主演
      str = arr.length > 0 ? arr.join(' ') : '暂无主演';
      // str = arr.join(' ');
      return str;
    }
  },
  methods: {
    /**
     * 用方法格式化主演名字
     */
    formatActor (actors = []) { // 即将上映有的主演是空，所以要给一个没有actors给他一个空数组
      let str = '';
      let arr = actors.map(item => item.name);
      str = arr.length > 0 ? arr.join(' ') : '暂无主演';
      return str;
    }
  }
}
</script>

