<template>
  <div class="login">
    <div class="top">
      <h1 class="logo">
        <a href="javascript:void(0);">
          <img src="../imgs/logo_dingtalk.png">
        </a>
      </h1>
    </div>
    <div class="login-wrapper">
      <div class="manage-bgi">
        <div class="w1200a manage-c-con">
          <div class="manage-logSect">
            <p>企业登录</p>
            <input type="text" placeholder="请输入用户名" v-model="username">
            <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="loginin()">
            <p class="btn" @click="loginin()">登&nbsp;&nbsp;&nbsp;&nbsp;录</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    loginin() {
      this.$ajax
        .post("/manage/login/check", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          if (response.data.error == 0) {
            this.getUserData();
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    },
    getUserData() {
      this.$ajax
        .get("/manage/admin")
        .then(response => {
          if (response.data.error == 0) {
            let res = response.data.data;
            this.$store.commit("setState", {
              // 保存用户状态
              userdata: res
            });
            this.$store.state.corpId = res.corp_id;
            if (window.location.origin.indexOf("localhost") > -1) {
              if (res.is_admin == 0) {
                this.$store.state.corpId = res.corp_id;
                this.$router.replace("/dingtalk");
              } else {
              }
            } else {
              if (this.$store.state.corpId != 0) {
                document.title = "叮当答题管理后台 - 叮当科技";
                this.$store.state.corpId = res.corp_id;
                this.$router.replace("/dingtalk");
                // window.location.href = window.location.origin + "/manage";
              } else {
                setTimeout(() => {
                  document.title = "叮当答题管理后台 - 叮当科技";
                  this.$store.state.corpId = res.corp_id;
                  // this.$router.replace("/dingtalk");
                  window.location.href = window.location.origin + "/manage";
                }, 500);
              }
            }
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    }
  }
};
</script>
<style>
.login {
  height: 100vh;
  background: #fff;
}

.login .login-wrapper {
  position: relative;
  height: 80%;
  background: #000 url("../imgs/login_bg.png") center center no-repeat;
  background-size: 100% 100%;
}

.top {
  height: 64px;
  width: 1184px;
  margin: 0 auto;
}

.top h1.logo {
  float: left;
  padding-top: 10px;
}

.top .logo {
  float: right;
  padding-top: 12px;
}

a {
  color: #2d8cf0;
  background: 0 0;
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.top .logo img {
  display: inline-block;
  float: left;
  height: 42px;
  width: auto;
}

.manage-c-con {
  height: 100%;
  position: relative;
}

.w1200a {
  width: 1200px;
  margin: 0 auto;
}

.login .login-wrapper p {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.manage-logSect {
  position: absolute;
  width: 497px;
  height: 353px;
  right: 0;
  top: 83px;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
  text-align: center;
}

.login .login-wrapper input {
  width: 90%;
  padding: 6px;
  margin-bottom: 20px;
  height: 50px;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #dcdcdc;
}

.login .login-wrapper input:focus {
  border: 1px solid #59d2f9;
  box-shadow: 0px 0px 3px #59d2f9;
}

.login .login-wrapper p.btn {
  margin: 10px auto;
  width: 90%;
  font-size: 16px;
  height: 42px;
  line-height: 42px;
  color: #fff;
  text-align: center;
  background: #59d2f9;
  border-radius: 4px;
  cursor: pointer;
}

.login .login-wrapper p.btn a {
  color: #fff;
}

.footer {
  width: 100%;
  height: 96px;
  position: fixed;
  bottom: 0;
  left: 0;
}

footer.p_common {
  width: 100%;
  height: 96px;
  min-width: 1250px;
  background: #fff;
  line-height: 32px;
  text-align: center;
  padding: 15px 0;
}

footer.p_common .wrap {
  color: #333;
  font-size: 14px;
}

footer.p_common .wrap i {
  display: inline-block;
  font-size: 16px;
  margin: 0 11px;
}

.footer a {
  color: #333;
}

.footer a:hover {
  color: #59d2f9;
  text-decoration: none;
}
</style>