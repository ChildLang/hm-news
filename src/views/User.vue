<template>
  <div class="user">
    <div class="header" @click="$router.push('/useredit')">
      <div class="pic">
        <img :src="$axios.defaults.baseURL+info.head_img" alt>
      </div>
      <div class="nickname">
        <p>
          <span class="iconfont iconxingbienan" v-if="info.gender"></span>
          <span class="iconfont iconxingbienv" v-else></span>
          <span>{{info.nickname}}</span>
        </p>
        <p class="time">{{info.create_date | time}}</p>
      </div>
      <div class="jump">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <news-nav @click="$router.push('/myfollows')">
      <template>我的关注</template>
      <template v-slot:content>关注的用户</template>
    </news-nav>
    <news-nav @click="$router.push('/mycomment')">
      <template>我的跟帖</template>
      <template v-slot:content>跟帖/回复</template>
    </news-nav>
    <news-nav @click="$router.push('/star')">
      <template>我的收藏</template>
      <template v-slot:content>文章/视频</template>
    </news-nav>
    <news-nav @click="$router.push('/useredit')">设置</news-nav>
    <news-nav @click="outFn">退出</news-nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  async created() {
    const res = await this.$axios.get(`/user/${localStorage.getItem('id')}`, {
      // headers: {
      //   Authorization: localStorage.getItem('token')
      // }
    })
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
    }
    // else if (statusCode === 401) {
    //   this.$toast.fail(message)
    //   this.$router.push('/login')
    //   localStorage.removeItem('token')
    //   localStorage.removeItem('id')
    // }
  },
  methods: {
    async outFn() {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '是否退出'
        })
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        this.$toast.success('退出登录成功')
        this.$router.push('/login')
      } catch {
        this.$toast('取消退出')
      }
    }
  }
}
</script>
<style lang='less' scoped>
.user {
  height: 100%;
  background-color: rgb(243, 243, 243);
  .header {
    height: 100px;
    align-items: center;
    padding: 0 20px;
    display: flex;
    border-bottom: 5px solid #999;
    .pic {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .nickname {
      flex: 1;
      padding: 20px;
      font-size: 16px;
      color: #333;
      .time {
        margin-top: 5px;
        color: #999;
        font-size: 14px;
      }
      .iconxingbienv {
        color: rgb(245, 58, 192);
      }
      .iconxingbienan {
        color: rgb(119, 179, 222);
      }
    }
    .jump {
      width: 20px;
    }
  }
}
</style>
