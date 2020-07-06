<template>
  <div class="follows">
    <newsheader>我的关注</newsheader>
    <ul>
      <li class="list" v-for="item in list" :key="item.id">
        <div class="pic">
          <img :src="$axios.defaults.baseURL + item.head_img" alt>
        </div>
        <div class="content">
          <p>{{item.nickname}}</p>
          <p class="time">{{item.create_date | time}}</p>
        </div>
        <div class="button">
          <van-button round type="warning" @click="cancel(item.id)">取消关注</van-button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$axios.get('/user_follows')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async cancel(id) {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '确认取关'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        console.log(res)
        if (res.data.statusCode === 200) {
          this.$toast.success('取关成功')
          this.getList()
        }
      } catch {}
    }
  }
}
</script>
<style lang='less' scoped>
.follows {
  background-color: rgb(243, 243, 243);
  ul {
    li {
      height: 80px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      .pic {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .content {
        padding-left: 10px;
        flex: 1;
        font-size: 16px;
        .time {
          color: #999;
          font-size: 14px;
        }
      }
      .van-button {
        width: 90px;
        height: 30px;
      }
    }
  }
}
</style>
