<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    if (window.location.hash.indexOf("#/Login") > -1) {
      return;
    } else {
      this.getUserData();
    }
  },
  methods: {
    //校验用户身份信息
    getUserData() {
      this.$ajax
        .get("/manage/admin")
        .then(response => {
          if (response.data.error == 0) {
            let res = response.data.data;
            localStorage.setItem("env", response.data.data.env);
            this.$store.state.env = response.data.data.env;
            this.$store.commit("setState", {
              // 保存用户状态
              userdata: res
            });
            if (!res.corp_id && !res.is_admin) {
              // window.location.href = "//oa.dingtalk.com/#/login";
            } else {
              this.$store.commit("setState", {
                // 保存用户状态
                corpId: res.corp_id
              });
              this.$store.state.corpId = res.corp_id;
              document.title = "叮当答题管理后台 - 叮当科技";
              // if (window.location.origin.indexOf('localhost') > -1) {
              //     if (res.is_admin == 0) {
              //         this.$store.state.corpId = res.corp_id;
              //         this.$router.replace("/dingtalk");
              //     } else {}
              // } else {
              //     window.location.href = window.location.origin + "/manage";
              // }
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
@import "./fonts/iconfont.css";
@import "./css/reset.css";
body {
  font-size: 12px;
  line-height: 1.5;
  color: #495060;
  -webkit-font-smoothing: antialiased;
  background-color: #f5f7f8 !important;
  min-width: 1184px;
}

#app {
  margin: 0 auto;
  min-height: 100%;
  background: #f5f7f8;
  min-width: 1184px;
  height: auto;
}
</style>