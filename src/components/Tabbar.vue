<template>
  <div>
    <ul  class="tabbar">
      <router-link
      v-for="tab in tabs"
      :key="tab.id"
      :to="tab.href"
      tag="li"
      active-class="active"
      >
        <i :class= "['iconfont', tab.icon]"></i>
        <span>{{ tab.name }}</span>
      </router-link>

    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/style/common/variable.less';
@import '~@/style/common/mixins.less';

.tabbar{
  .border-top;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  padding: 0;
  margin: 0;
  z-index: 100;
  background: #fff;
  list-style: none;
  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50px;
    color: @tabColor;
    .iconfont{
      font-size: 22px;
    }
    span{
      margin-top: 3px;
      font-size: 12px;
    }
    &.active{
      color: @tabColorAct;
    }
  }
}
</style>
