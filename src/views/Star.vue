<template>
  <div class="star">
    <newsheader>我的收藏</newsheader>
    <div class="article" v-for="item in postList" :key="item.id">
      <div class="content">
        <p>{{item.title}}</p>
        <p class="name">
          <span>{{item.user.nickname}}</span>
          <span>{{item.comments.length}}跟帖</span>
        </p>
      </div>
      <div class="imgs">
        <img :src="$url(item.cover[0].url)" alt>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      postList: []
    }
  },
  created() {
    this.getpostList()
  },
  methods: {
    async getpostList() {
      const res = await this.$axios.get('/user_star')
      console.log(res)
      const { data, statusCode } = res.data
      if (statusCode === 200) {
        this.postList = data
      }
    }
  }
}
</script>
<style lang='less' scoped>
.star {
  .article {
    height: 120px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    .content {
      display: flex;
      font-size: 16px;
      height: 75px;
      flex-direction: column;
      justify-content: space-between;
      // padding: 5px 10px;
      padding-left: 0;
      .name {
        font-size: 13px;
        color: #999;
        span {
          margin-right: 5px;
        }
      }
    }
    .imgs {
      img {
        width: 121px;
        height: 75px;
        object-fit: cover;
      }
    }
  }
}
</style>
