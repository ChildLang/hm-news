<template>
  <div class="post">
    <div class="video" v-if="post.content.startsWith('http')">
      <div class="content">{{post.title}}</div>
      <div class="imgs">
        <img :src="$url(post.cover[0].url)" alt>
        <span class="iconfont iconshipin"></span>
      </div>
    </div>
    <div class="singleImg" v-else-if="post.cover.length<3">
      <div class="content">
        <p>{{post.title}}</p>
        <p class="name">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </p>
      </div>
      <div class="imgs">
        <img :src="$url(post.cover[0].url)" alt>
      </div>
    </div>
    <div class="mutipleImg" v-else>
      <div class="content">{{post.title}}</div>
      <div class="imgs">
        <img :src="$url(post.cover[0].url)" alt>
        <img :src="$url(post.cover[1].url)" alt>
        <img :src="$url(post.cover[2].url)" alt>
      </div>
      <div class="name">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length || post.comments.length}}跟帖</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang='less' scoped>
.post {
  border-bottom: 1px solid #ccc;

  .name {
    font-size: 13px;
    color: #999;
    span {
      margin-right: 5px;
    }
  }
  .singleImg {
    height: 120px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    .content {
      display: flex;
      font-size: 16px;
      height: 75px;
      flex-direction: column;
      justify-content: space-between;
      // padding: 5px 10px;
      padding-left: 0;
    }
    .imgs {
      img {
        width: 121px;
        height: 75px;
        object-fit: cover;
      }
    }
  }
  .mutipleImg {
    padding: 20px 15px 10px;

    .content {
      font-size: 16px;
    }
    .imgs {
      display: flex;
      padding: 5px 0 10px;
      justify-content: space-between;
      img {
        width: 112px;
        height: 74px;
      }
    }
  }
  .video {
    padding: 20px;
    .content {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .imgs {
      position: relative;
      img {
        width: 340px;
        height: 170px;
        object-fit: cover;
      }
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 46px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        color: #fff;
      }
    }
  }
}
</style>
