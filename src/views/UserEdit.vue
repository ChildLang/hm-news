<template>
  <div class="useredit">
    <div class="mask" v-show="isShow">
      <van-button type="primary" @click="crop">裁剪</van-button>
      <van-button type="warning" @click="cancel">取消</van-button>
      <VueCropper
        ref="cropper"
        :img="img"
        autoCrop
        centerBox
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixedNumber="[1,1]"
        fixed
      ></VueCropper>
    </div>
    <newsheader>编辑资料</newsheader>
    <div class="pic">
      <img :src="$axios.defaults.baseURL+info.head_img" alt>
      <van-uploader :after-read="afterRead"/>
    </div>
    <news-nav @click="NickShow">
      <template>昵称</template>
      <template v-slot:content>{{info.nickname}}</template>
    </news-nav>
    <news-nav @click="pwdShow">
      <template>密码</template>
      <template v-slot:content>******</template>
    </news-nav>
    <news-nav @click="genderShow">
      <template>性别</template>
      <template v-slot:content>{{info.gender?'男':'女'}}</template>
    </news-nav>

    <!-- 修改昵称 -->
    <van-dialog v-model="Nshow" title="修改昵称" show-cancel-button @confirm="editName">
      <van-field v-model="nickname" placeholder="请输入新昵称"/>
    </van-dialog>
    <!-- 修改密码 -->
    <van-dialog v-model="Pshow" title="修改密码" show-cancel-button @confirm="editPwd">
      <van-field v-model="password" placeholder="请输入新密码"/>
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog v-model="Gshow" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1"/>
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0"/>
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper: VueCropper
  },
  data() {
    return {
      info: {},
      Nshow: false,
      Pshow: false,
      Gshow: false,
      nickname: '',
      password: '',
      gender: 1,
      isShow: false,
      img: ''
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    // 封装获取数据的请求
    async getUser() {
      const res = await this.$axios.get(`/user/${localStorage.getItem('id')}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    },
    // 封装修改数据的请求
    async editUser(data) {
      const res = await this.$axios.post(
        `/user_update/${localStorage.getItem('id')}`,
        data
      )
      console.log(res)
      if (res.data.statusCode === 200) {
        this.nickname = ''
        this.password = ''
        this.gender = 1
        this.$toast.success(res.data.message)
        this.getUser()
      } else {
        this.$toast.success(res.data.message)
      }
    },
    // 弹框显示
    NickShow() {
      this.Nshow = true
      this.nickname = this.info.nickname
    },
    pwdShow() {
      this.Pshow = true
      this.password = this.info.password
    },
    genderShow() {
      this.Gshow = true
      this.gender = this.info.gender
    },
    // 修改请求提交
    editName() {
      this.editUser({
        nickname: this.nickname
      })
    },
    editPwd() {
      this.editUser({
        password: this.password
      })
    },
    editGender() {
      this.editUser({
        gender: this.gender
      })
    },
    // 修改头像
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      this.isShow = true
      this.img = file.content
    },
    cancel() {
      this.isShow = false
      this.$toast('取消')
    },
    crop() {
      this.$refs.cropper.getCropBlob(async blob => {
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editUser({ head_img: data.url })
          this.isShow = false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.useredit {
  background-color: rgb(243, 243, 243);
  .pic {
    height: 110px;
    text-align: center;
    position: relative;
    img {
      width: 70px;
      height: 70px;
      margin-top: 30px;
      border-radius: 50%;
    }
  }
  /deep/.van-dialog__content {
    padding: 10px;
  }
  .van-field {
    border: 1px solid #999;
  }
  .van-uploader {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    opacity: 0;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    .van-button {
      position: absolute;
      top: 0;
      z-index: 999;
    }
    .van-button:nth-child(1) {
      left: 0;
    }
    .van-button:nth-child(2) {
      right: 0;
    }
  }
}
</style>
