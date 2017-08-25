<template>
  <div class="page has-navbar" v-nav="{ title: 'Home' }">
    <div class="page-content text-center">
      <h2 class="padding" v-text="msg"></h2>

      <md-button class="button button-positive" @click.native="login()">
        测试登陆 Click Me
      </md-button>
      <md-button class="button button-positive" @click.native="clicked()">
        测试请求 Click Me
      </md-button>
      <router-link class="button button-assertive" to="/about">
        <i class="ion-information-circled"></i> About
      </router-link>

      <von-input type="text" v-model="info" placeholder="测试socket" label="信息">
      </von-input>
      <md-button class="button button-positive" @click.native="sendSocket()">
        发送socket
      </md-button>
    </div>
  </div>
</template>
<script>
import * as api from '../api'
import store from 'store'
export default {
  data() {
    return {
      msg: 'Hello! Vonic.',
      info: ''
    }
  },
  methods: {
    async clicked() {
      try {
        let result = await api.reqTest(
          { 'username': 'admin', 'psw': '123456' }
        )
        console.log(`当前的结果是：${JSON.stringify(result)}`)
      } catch (error) {
        console.log(`当前的catch果是：${JSON.stringify(error.response.data)}`)
        $toast.show(error.response.data, 500).then(() => {
          console.log(error)
        })
      }

    },
    async login() {
      try {
        let token = await api.login({
          params: { 'username': 'admin', 'psw': '123456' }
        })
        store.set('token', token)
        // let result = await api.reqTest({'21':'2222'})
        console.log(`当前的结果是：${JSON.stringify(token)}`)
      } catch (error) {
        console.log(`当前的catch果是：${JSON.stringify(error)}`)
      }
    },
    async sendSocket() {
      console.log(`当前的info是：${this.info}`)
      let current = this.info
      this.info = ""
      let res = await api.sendSocket({ 'text': current })
      console.log(`当前的返回值:${JSON.stringify(res)}`)
    }
  }
}
</script>
<style>
h2 {
  font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
  color: #888;
}

.page.has-navbar .page-content {
  padding-top: 100px;
}
</style>
