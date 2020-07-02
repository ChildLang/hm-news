<template>
  <div class="header">
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
</template>
<script>
</script>
<style lang='less' scoped>
.header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  // background-color: pink;
  display: flex;
  border-bottom: 1px solid #ccc;
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
</style>
