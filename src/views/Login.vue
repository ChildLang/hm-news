<template>
  <div class="login">
    <newsheader>登录</newsheader>
    <news-logo></news-logo>
    <van-form @submit="submit">
      <van-field v-model="user.username" label="用户名" placeholder="请输入用户名" :rules="rules.username"/>
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div class="reg">
      还没有账号？去
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '用户名只能是5-11数字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          {
            pattern: /^\w{3,9}$/,
            message: '密码只能3-9位',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  created() {
    console.log(this.$route.params)
    const { username, password } = this.$route.params
    console.log(username, password)
    this.user.username = username
    this.user.password = password
  },
  methods: {
    async submit() {
      const res = await this.$axios.post(
        'http://localhost:3000/login',
        this.user
      )
      console.log(res.data)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        localStorage.setItem('token', data.token)
        this.$router.push('/')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.login {
  .van-button--info {
    background-color: #f10000;
    border: 1px solid #f10000;
  }
  .reg {
    font-size: 14px;
    text-align: right;
    padding-right: 20px;
  }
}
</style>
