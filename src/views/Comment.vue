<template>
  <div class="comment">
    <newsheader>我的跟帖</newsheader>
    <ul>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :offset="10"
      >
        <li class="list" v-for="item in list" :key="item.id">
          <p class="time">{{item.create_date | time}}</p>
          <div class="parent" v-if="item.parent">
            <p>回复：{{item.parent.user.nickname}}</p>
            <p>{{item.parent.content}}</p>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="article">
            <p>原文:{{item.post.title}}</p>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </li>
      </van-list>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 5
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
        this.loading = false
        console.log(data.length)
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
      console.log(this.list)
    },
    onLoad() {
      console.log('加载中...')
      setTimeout(() => {
        ++this.pageIndex
        this.getList()
      }, 2000)
    }
  }
}
</script>
<style lang='less' scoped>
.comment {
  background-color: rgb(243, 243, 243);
  ul {
    li {
      border-bottom: 1px solid #ccc;
      padding: 10px 20px;
      font-size: 16px;
      .time {
        color: #999;
        line-height: 40px;
      }
      .parent {
        padding: 10px;
        background-color: rgb(228, 228, 228);
        p {
          line-height: 30px;
          color: #999;
        }
        p:nth-child(1) {
          font-size: 14px;
        }
      }
      .content {
        margin: 20px 0;
      }
      .article {
        color: #999;
        display: flex;
        justify-content: space-between;
        p {
          width: 85%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
