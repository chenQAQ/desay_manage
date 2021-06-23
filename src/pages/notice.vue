<template>
    <div class="admin-container">
        <div class="header">
            <div id="club-header">
                <div class="club-header-main">
                    <h1 class="logo">
                        <a href="javascript:void(0);">
                            <img src="../imgs/logo_dingtalk.png">
                        </a>
                    </h1>
                </div>
            </div>
        </div>
        <div class="admin-mainer">
            <div class="admin-mainer-left">
                <div v-html="msg"></div>
            </div>
            <div :class="searchBarFixed?'admin-mainer-right isfixed':'admin-mainer-right'" id="template">
                <!-- <p>
                    <img src="../imgs/home_banner.png" alt="">
                </p> -->
                <p>
                    <span>{{userdata.corp_short_name}}</span>
                    <span>账号：{{userdata.name}}</span>
                    <span>客服热线：0755-33942806</span>
                    <span v-if="userdata.vip_name && userdata.vip_name!=''">{{userdata.vip_name}}：剩余{{userdata.time_range}}天</span>
                </p>
                <!-- <div>
                    <el-popover placement="bottom-end" width="200" trigger="click">
                        <div>
                            <qriously :value="demoUrl" :size="135" />
                            <p>用手机钉钉扫描开通/续费</p>
                        </div>
                        <el-button slot="reference" type="primary">服务购买</el-button>
                    </el-popover>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Admin",
        data() {
            return {
                demoUrl: "", //活动url
                msgLists: [],
                msg: '',
                searchBarFixed: false
            };
        },
        mounted() {
            window.addEventListener("scroll", this.handleScroll);
            this.getNoticeLists();
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll)
        },
        computed: {
            userdata() {
                return this.$store.state.userdata
            }
        },
        methods: {
            //元素吸顶事件
            handleScroll() {
                var scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                var offsetTop = document.querySelector("#template").offsetTop;
                if (scrollTop > offsetTop) {
                    this.searchBarFixed = true;
                } else {
                    this.searchBarFixed = false;
                }
            },
            getNoticeLists() {
                this.$ajax
                    .get("/manage/message/list")
                    .then(response => {
                        if (response.data.error == 0) {
                            let res = response.data.data;
                            this.msgLists = res;
                            res.forEach((item, index) => {
                                if (index == this.$route.query.notice_index) {
                                    this.msg = item.content;
                                }
                            })
                        } else {
                            this.$message(response.data.message);
                        }
                    })
                    .catch(error => {});
            }
        }
    };
</script>
<style scoped>
    .admin-container {
        width: 100%;
        margin: 0 auto;
        height: 100%;
    }
    
    .admin-container.no-scroll {
        position: fixed;
        overflow: hidden;
    }
    
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
        /* border-bottom: 1px solid #eee; */
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
    
    a {
        color: #2d8cf0;
        background: 0 0;
        text-decoration: none;
        outline: 0;
        cursor: pointer;
        transition: color .2s ease;
    }
    
    .admin-mainer {
        margin: 0 auto;
        width: 1184px;
        overflow: hidden;
        margin-bottom: 20px;
    }
    
    .admin-mainer-left {
        position: relative;
        width: 900px;
        background: #fff;
        float: left;
        padding-bottom: 50px;
    }
    
    .admin-mainer-right {
        width: 220px;
        float: left;
        margin-left: 34px;
    }
    
    .admin-mainer-right.isfixed {
        position: fixed;
        top: 0;
        left: 930px;
        z-index: 999;
    }
    
    .admin-mainer-right div {
        width: 100%;
        padding-bottom: 15px;
        /* padding: 15px; */
    }
    
    .admin-mainer-right div p {
        line-height: 22px;
        margin: 15px;
    }
    
    .admin-mainer-right div p:last-of-type {
        margin-bottom: 0px;
    }
    
    .admin-mainer-right div p img {
        width: 80%;
        display: block;
        margin: 0 auto;
    }
    
    .admin-mainer-right span {
        display: inline-block;
        width: 100%;
    }
    
    .admin-mainer-left>div {
        padding: 20px 30px;
        margin-bottom: 20px;
    }
    
    .mainer-hd {
        border-bottom: 1px solid #ddd;
    }
    
    .mainer-hd div {
        height: 50px;
        margin-bottom: 15px;
    }
    
    .total {
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        font-size: 18px;
        color: #333;
    }
    
    .admin-mainer-left>.total {
        margin-left: 30px;
    }
    
    .admin-mainer-left {
        min-height: 80vh;
    }
    
    .mainer-hd .contact {
        float: right;
    }
    
    .contact>span {
        display: inline-block;
        line-height: 50px;
        cursor: pointer;
        text-decoration: underline;
    }
    
    .contact-left {
        float: left;
        width: 100px;
    }
    
    .contact-left img {
        width: 100px;
        height: auto;
    }
    
    .contact-right {
        float: right;
        width: 120px;
    }
    
    .contact-right span {
        display: inline-block;
        line-height: 20px;
        font-size: 15px;
        color: #666;
        text-align: left;
    }
    
    .contact-title {
        color: #c6c6c6;
        margin-bottom: 10px;
    }
    
    .mainer-hd .title {
        color: #333;
        font-size: 30px;
        font-weight: bold;
    }
    
    .mainer-hd .brand {
        display: inline-block;
        position: absolute;
        top: 5px;
        right: -50px;
        height: 16px;
        line-height: 16px;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        padding: 0 10px;
        background: #FF7F50;
    }
    
    .dl-title {
        font-size: 14px;
        font-weight: bold;
        color: #333;
        height: 28px;
        line-height: 28px;
        margin-bottom: 10px;
    }
    
    .dl-title.intro {
        margin-bottom: 0;
    }
    
    .desc {
        color: #444;
        line-height: 32px;
        height: 32px;
    }
    
    .desc span:first-of-type {
        float: left;
    }
    
    .desc span:last-of-type {
        float: right;
    }
    
    .admin-mainer-right.isfixed {
        position: fixed;
        left: 50%;
        top: 20px;
        transform: translate(308px);
    }
    
    .admin-mainer-right p span {
        font-size: 12px;
        color: #333;
        line-height: 30px;
    }
    
    .admin-mainer-right p span:first-of-type {
        font-size: 14px;
        font-weight: bold;
    }
    
    .admin-mainer-right p span:last-of-type {
        background: #eee;
        width: 136px;
        text-align: center;
        margin-top: 8px;
    }
    
    .admin-mainer-right .tip {
        width: 50px;
        height: 24px;
        line-height: 20px;
        font-size: 12px;
        border: 1px solid #ccc;
        border-radius: 6px;
        margin-left: 15px;
        display: inline-block;
        text-align: center;
    }
    
    .admin-mainer-right .tip+span {
        display: inline-block;
        float: right;
        font-size: 12px;
        color: #666;
        line-height: 25px;
        padding-right: 5px;
    }
    
    .admin-mainer-right p img {
        width: 130px;
        height: auto;
        border-radius: 6px;
    }
    
    .admin-mainer-right p {
        margin-bottom: 16px;
    }
    
    .admin-mainer-right p button {
        width: 100%;
    }
    
    .swiper-slide img,
    .swiper-slide-active img {
        width: 100%;
        height: auto;
    }
    
    .swiper1,
    .swiper {
        width: 840px;
        margin: 0 auto;
        position: relative;
    }
    
    .slide1 {
        width: 100%;
        height: 150px;
        margin-bottom: 15px;
        cursor: pointer;
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.05);
    }
    
    .case-banner {
        float: left;
        margin-right: 15px;
        padding: 0;
        position: relative;
    }
    
    .case-banner .logo {
        width: auto;
        vertical-align: middle;
        height: 150px;
    }
    
    .case-banner .qrcode {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 100;
        background: rgba(0, 0, 0, 0.6);
    }
    
    .case-banner .qrcode img {
        position: absolute;
        z-index: 200;
        width: 120px;
        height: auto;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    
    .slide1:hover .case-banner .qrcode {
        display: block;
    }
    
    .case-desc {
        float: left;
        max-width: 560px;
        padding: 20px;
    }
    
    .case-desc p {
        line-height: 20px;
        color: #444;
    }
    
    .case-desc .case-desc-title {
        line-height: 30px;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    
    iframe {
        width: 100%;
        border: none;
    }
    
    .admin-mainer-right a {
        display: block;
        height: 100%;
        width: 100%;
        text-decoration: none;
        color: #fff;
    }
    
    .admin-mainer-right div .service {
        border: 1px solid #ccc;
        margin: 0;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
    }
    
    .detail {
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        font-size: 16px;
        color: #333;
        padding-left: 30px;
    }
    
    .activity-qrcode p {
        text-align: center;
    }
    
    .admin-mainer-left .activity-management {
        width: 100%;
        background: #fff;
        padding: 30px 0;
        border-radius: 6px;
        margin-bottom: 40px;
        padding: 0 30px;
    }
    
    .number {
        text-align: right;
        margin-bottom: 20px;
    }
    
    .number>span {
        margin-right: 20px;
    }
    
    .search {
        margin: 0 0 30px;
    }
    
    .search .input {
        width: 22%;
    }
    
    .search .input {
        margin-right: 10px;
    }
    
    .search .input input {
        width: 100%;
        padding-left: 8px;
        font-size: 12px;
    }
    
    .activity-management .search span {
        display: inline-block;
        width: 60px;
        background: #59d2f9;
        color: #fff;
        text-align: center;
        cursor: pointer;
    }
    
    .activity-management .no-data {
        height: 220px;
        background: url('../imgs/nodata.png') no-repeat;
        background-position: 46.8% 120px;
        background-size: 30px 30px;
        text-align: center;
        color: #666;
        font-size: 16px;
        border-top: 1px solid #ebeef5;
    }
    
    .activity-management .el-pagination {
        margin: 40px 0 0;
        text-align: right;
    }
    
    .activity-management .no-data p {
        position: relative;
        top: 220px;
    }
    
    .add-btn {
        float: right;
    }
    
    .activity-qrcode p {
        text-align: center;
    }
    
    .admin-container .swiper-button-white {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.6);
        background-size: 20px 28px;
        opacity: 0.5;
        filter: alpha(opacity=50);
    }
    
    .admin-container .swiper-button-white:hover {
        opacity: 1;
        filter: alpha(opacity=100);
    }
</style>
<style>
    .activity-lists .el-table td {
        border: 0;
    }
    
    .activity-management .el-table::before {
        height: 0;
    }
    
    .activity-management .el-table__fixed-right::before,
    .activity-management .el-table__fixed::before {
        height: 0;
    }
    
    .no-data .el-table {
        background: transparent;
    }
    
    .no-data .el-table__empty-block {
        margin-top: 200px;
    }
    
    .no-data .el-table__empty-block .el-table__empty-text {
        color: #666;
    }
    
    .admin-mainer .no-data .el-table__empty-text {
        position: absolute;
        left: 52.5%;
        top: -115px;
    }
    
    .admin-mainer .el-carousel__item img {
        width: 100%;
        height: auto;
    }
    
    .admin-mainer .el-carousel__item {
        background: rgba(0, 0, 0, 0.6);
        opacity: .85;
    }
    
    .admin-mainer .el-carousel__item.is-active {
        background-color: #fff;
        opacity: 1;
    }
    
    .admin-container .el-dialog {
        width: 400px;
        border-radius: 5px;
    }
</style>