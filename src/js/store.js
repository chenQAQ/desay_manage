import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        userdata: {}, //用户信息
        corpId: 0,
        env: '',
        topImg: '//s1-hn.aghcdn.com/brainstorming/dbanner.png', //顶部banner图片
        homeBg: '//s1-hn.aghcdn.com//management/home_bg.jpg', //主页背景图片
        flauntBg: '//s1-hn.aghcdn.com//management/flaunt_bg.png', //炫耀背景图片
        countDownBg: '//s1-hn.aghcdn.com//management/countdown_bg.png', //倒计时背景
        prizeBg: '//s1-hn.aghcdn.com/management/default-prize.jpg', //奖品背景图
        addPriImg: '//s1-hn.aghcdn.com/management/add_prize_img.png', //奖品背景图
        appId: 1,
        activitydata: {}, //活动初始配置信息
        datedata: {} //时间相关信息
    },
    getters: {},
    mutations: {
        setState(state, payload) {
            for (let key in payload) {
                state[key] = payload[key]
            }
        },
    }
});