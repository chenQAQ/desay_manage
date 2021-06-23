<template>
    <div class="header">
        <div id="club-header">
            <div class="club-header-main">
                <h1 class="logo">
                    <a href="javascript:void(0);" @click="goHome()">
                        <img src="../imgs/logo_dingtalk.png">
                    </a>
                </h1>
                <div class="club-header-btn btn-align-r">
                    <span>{{userdata.corp_id!=0?userdata.corp_short_name:''}}&nbsp;&nbsp;&nbsp;&nbsp;
                        <i :class="userdata.vip_name && userdata.vip_name!=''?'add-person':''">{{userdata.name}}</i>
                    </span>
                    <span class="compute" v-if="userdata.vip_name && userdata.vip_name!=''"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "topbar",
        data() {
            return {

            };
        },
        computed: {
            userdata() {
                return this.$store.state.userdata
            }
        },
        methods: {
            logout() {
                window.location.href = window.location.origin + "/manage/logout";
            },
            goHome() {
                window.location.href = window.location.origin + "/manage";
            },
            toPersonal() {
                if (this.userdata.vip_name && this.userdata.vip_name != '') {
                    this.$router.push({
                        path: "/Personal"
                    });
                } else {
                    return;
                }
            }
        }
    };
</script>
<style scoped>
    .header {
        height: 64px;
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;
        background: #fff;
        width: 100%;
    }
    
    .header img {
        display: inline-block;
        float: left;
        height: 40px;
        width: auto;
    }
    
    .header button {
        display: inline-block;
        margin-left: 20px;
    }
    
    #club-header {
        height: 64px;
        border-bottom: 1px solid #eee;
        margin-bottom: 20px;
        background: #fff;
        position: relative;
        z-index: 1;
    }
    
    #club-header .club-header-main {
        height: 64px;
        width: 1184px;
        margin: 0 auto;
    }
    
    #club-header .club-header-main h1.logo {
        float: left;
        padding-top: 10px;
    }
    
    #club-header .club-header-main .club-header-btn {
        float: right;
        padding-top: 12px;
    }
    
    .btn-align-r {
        text-align: right;
    }
    
    a {
        color: #2d8cf0;
        background: 0 0;
        text-decoration: none;
        outline: 0;
        cursor: pointer;
        transition: color .2s ease;
    }
    
    #club-header button {
        border: 1px solid #dcdcdc;
        background: transparent;
        color: #666;
    }
    
    #club-header button:hover {
        background: #3dc6f2;
        border: 1px solid #3dc6f2;
        color: #fff;
    }
    
    #club-header .club-header-btn span {
        color: #666;
        font-size: 14px;
    }
    
    i {
        font-style: normal;
    }
    
    .add-person {
        /* text-decoration: underline; */
        /* cursor: pointer; */
    }
    
    .compute {
        visibility: hidden;
        display: inline-block;
        padding: 0 10px;
        height: 28px;
        line-height: 28px;
        background: #eee;
        margin-left: 5px;
    }
</style>