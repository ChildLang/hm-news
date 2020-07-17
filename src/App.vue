<template>
  <div id="app">
    <!-- <newsheader></newsheader> -->
    <router-view></router-view>
    <div class="show">123456</div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.show {
  position: fixed;
  bottom: 0;
  right: 0;
  font-size: 12px;
}
</style>
