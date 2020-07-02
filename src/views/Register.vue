<template>
  <div class="register">
    <newsheader>注册</newsheader>
    <news-logo></news-logo>
    <van-form @submit="onSubmit">
      <van-field v-model="user.username" label="用户名" placeholder="请输入用户名" :rules="rules.username"/>
      <van-field v-model="user.nickname" label="昵称" placeholder="请输入昵称" :rules="rules.nickname"/>
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '用户名应为5-11位数字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          {
            pattern: /^\w{3,9}$/,
            message: '密码格式应为3-5位字母',
            trigger: 'onChange'
          }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'onChange' },
          {
            pattern: /^[\u4e00-\u9fa5]{2,5}$/,
            message: '请输入2-5位汉字',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/register', this.user)
      console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: this.user
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.register {
  .van-button--info {
    background-color: #f10000;
    border: 1px solid #f10000;
  }
}
</style>
