<template>
  <div class="header">
    <div class="fixed">
      <div class="back" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title">
        <slot></slot>
      </div>
      <div class="right">
        <span></span>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style lang='less' scoped>
.header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  // background-color: pink;
  border-bottom: 1px solid #ccc;
  .fixed {
    position: fixed;
    top: 0;
    display: flex;
    width: 100%;
    background-color: #f3f3f3;
    .back,
    .right {
      width: 40px;
      text-align: center;
    }
    .title {
      flex: 1;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>
