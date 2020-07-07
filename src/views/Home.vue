<template>
  <div class="home">
    <div class="header">
      <div class="new">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search-box">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
        <news-post v-for="post in postList" :key="post.id" :post="post"></news-post>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabList: [],
      postList: [],
      active: 0,
      pageIndex: 1,
      pageSize: 50
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('/category')
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.tabList = data
        this.getPostList(this.tabList[0].id)
      }
    },
    async getPostList(id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.postList = data
      }
    }
  },
  watch: {
    active(value) {
      console.log(value)
      this.getPostList(this.tabList[value].id)
    }
  }
}
</script>
<style lang='less' scoped>
.home {
  background-color: #f3f3f3;
  /deep/.van-tabs__nav {
    background-color: #e4e4e4;
  }
  .header {
    height: 50px;
    width: 100%;
    background-color: rgb(255, 0, 0);
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    line-height: 50px;
    .new {
      span {
        font-size: 50px;
        color: #fff;
      }
    }
    .search {
      flex: 1;
      padding: 0 20px;
      .search-box {
        height: 34px;
        line-height: 34px;
        margin-top: 10px;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 17px;
        span {
          font-size: 18px;
          color: #fff;
        }
      }
    }
    .user {
      span {
        font-size: 25px;
      }
    }
  }
}
</style>
