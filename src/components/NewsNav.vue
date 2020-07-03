<template>
  <div class="nav" @click="$emit('click')">
    <div class="name">
      <slot></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="jump">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>
<script>
</script>
<style lang='less' scoped>
.nav {
  height: 60px;
  display: flex;
  font-size: 16px;
  margin-left: 20px;
  padding-right: 20px;
  line-height: 60px;
  border-bottom: 1px solid #999;
  .content {
    color: #999;
    text-align: right;
    flex: 1;
    padding-right: 10px;
  }
  .jump {
    width: 20px;
  }
}
</style>
