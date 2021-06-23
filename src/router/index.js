import Vue from "vue";
import Router from "vue-router";
import dingtalk from "../pages/dingtalk.vue";
import Login from "../pages/Login.vue";
import Gamemove from "../pages/Gamemove.vue";
import Configger from "../pages/Configger.vue";
import notice from "../pages/notice.vue";
import teamPK from "../pages/teamPK.vue";
import teamCreate from "../pages/teamCreate.vue";
Vue.use(Router);
export default new Router({
  base: "/",
  // mode: 'history',
  routes: [
    {
      path: "/Login",
      name: "Login",
      name_cn: "登录",
      component: Login
    },
    {
      path: "/Gamemove",
      name: "Gamemove",
      name_cn: "活动管理",
      component: Gamemove
    },
    {
      path: "/Configger",
      name: "Configger",
      name_cn: "活动配置",
      component: Configger
    },
    {
      path: "/notice",
      name: "notice",
      name_cn: "公告信息",
      component: notice
    },
    {
      path: "/dingtalk",
      name: "dingtalk",
      name_cn: "钉钉管理员首页",
      component: dingtalk
    },
    {
      path: "/teamPK",
      name: "teamPK",
      name_cn: "团队PK",
      component: teamPK
    },
    {
      path: "/teamCreate",
      name: "teamCreate",
      name_cn: "团队PK创建",
      component: teamCreate
    }
  ]
});
