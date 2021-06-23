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
                <div class="mainer-hd">
                    <p class="total">公告</p>
                    <p v-for="(item,index) in msgLists" class="desc" @click="toNotice(index)" :key='index'>
                        <span>{{item.title}}</span>
                        <span>{{item.create_time}}</span>
                    </p>
                </div>
                <p class="total">活动列表</p>
                <div class="activity-management">
                    <div class="number">
                        <!-- <span>{{userdata.new_online_act}}/{{userdata.online_act_num}}</span> -->
                        <el-button type="primary" @click="toConfig(1)" class="nodata-add-btn">+创建活动</el-button>
                    </div>
                    <div class="activity-lists" v-if="loadDown==true && activityDetail.data.length>0">
                        <el-table :data="activityDetail.data" style="width: 100%">
                            <el-table-column fixed prop="title" label="活动名称" width="220">
                            </el-table-column>
                            <el-table-column prop="activity_status_text" label="状态" width="80">
                            </el-table-column>
                            <el-table-column prop="start_time" label="开始时间" width="150">
                            </el-table-column>
                            <el-table-column prop="end_time" label="结束时间" width="150">
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="240">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="openCopy(scope.row.game_url)">地址</el-button>
                                    <el-button type="text" size="small" @click="goPage('/Gamemove',scope.row.activity_id,scope.row.corp_id,scope.row.app_id,2)">配置</el-button>
                                    <el-button type="text" size="small" @click="goPage('/Gamemove',scope.row.activity_id,scope.row.corp_id,scope.row.app_id,1)">看板</el-button>
                                    <!-- <el-button type="text" size="small" @click="copyConfig(scope.row.activity_id,scope.row.corp_id,scope.row.app_id,2)">复制</el-button> -->
                                     <el-button type="text" size="small" @click="goPage('/teamPk',scope.row.activity_id,scope.row.corp_id,scope.row.app_id,1)">团队PK</el-button>
                                    <el-button type="text" size="small" @click="confirmDelete(scope.row.activity_id)">删除</el-button>
                                   
                                </template>
</el-table-column>
</el-table>
<el-pagination v-if="loadDown && activityDetail.total_page>1" background @size-change="getActlist()" @current-change="getActlist()" :current-page.sync="activityDetail.page" :page-size="Number(activityDetail.page_size)" layout="prev, pager, next,jumper"
    :total="activityDetail.total">
</el-pagination>
</div>
<div class="no-data" v-if="loadDown==true && activityDetail.data.length==0">
    <el-table style="width: 100%">
        <el-table-column fixed label="活动名称">
        </el-table-column>
        <el-table-column label="状态">
        </el-table-column>
        <el-table-column label="开始时间">
        </el-table-column>
        <el-table-column label="结束时间">
        </el-table-column>
        <el-table-column label="操作">
        </el-table-column>
    </el-table>
    <el-button type="primary" @click="toConfig(1)" class="nodata-add-btn">+创建活动</el-button>
</div>
</div>
</div>
<!-- <div :class="searchBarFixed?'admin-mainer-right isfixed':'admin-mainer-right'" id="template">
    <p>
        <span class="title">{{userdata.corp_short_name}}</span>
        <span>账号：{{userdata.name}}</span>
        <span class="level" v-if="userdata.vip_name && userdata.vip_name!=''">{{userdata.vip_name}}：剩余{{userdata.time_range}}天</span>
    </p>
    <p class="dd">
        <span>钉钉扫码联系客服</span>
        <img src="../imgs/home_banner.png" alt="">
        <span>客服热线：0755-33942806</span>
    </p>
</div> -->
</div>
<el-dialog title="活动地址" :visible.sync="isCopy" class="address">
    <div>
        <p>
            <qriously class="demo_qrcode" :value="demoUrl" :size="150" />
        </p>
        <p class="demo_url">{{demoUrl}}</p>
    </div>
</el-dialog>
</div>
</template>
<script>
    import {
        burypoint
    } from '../js/burypoint.js'
    export default {
        name: "Admin",
        data() {
            return {
                index: 1,
                showQrcode: false, //活动二维码
                showLay: false, //操作提示弹层
                loadDown: false, //加载完成
                isCopy: false, //是否复制活动
                demoUrl: "http://www.baidu.com", //活动url
                activityDetail: { //活动信息列表
                    //活动列表
                    data: [],
                    page: 1,
                    page_size: 10,
                    total: 0,
                    total_page: 1
                },
                msgLists: [],
                searchtext: "", //活动列表搜索关键词
                searchBarFixed: false
            };
        },
        mounted() {
            window.addEventListener("scroll", this.handleScroll);
            if (this.$store.state.corpId != 0) {
                this.getActlist();
            } else {
                setTimeout(() => {
                    this.getActlist();
                }, 500)
            }
            this.getNoticeLists()
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
            getTime(time) {
                let M = (time.getMonth() + 1) < 10 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() +
                    1);
                let D = time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate();
                let H = time.getHours() < 10 ? ('0' + time.getHours()) : time.getHours();
                let Min = time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes();
                let S = time.getSeconds() < 10 ? ('0' + time.getSeconds()) : time.getSeconds();
                let date = (time.getFullYear()) + '/' + M + '/' + D;
                return date;
            },
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
                            res.forEach((item) => {
                                item.create_time = this.getTime(new Date(item.create_time * 1000));
                            })
                            this.msgLists = res;
                        } else {
                            this.$message(response.data.message);
                        }
                    })
                    .catch(error => {});
            },
            toNotice(index) {
                this.$router.push({
                    path: '/notice',
                    query: {
                        notice_index: index
                    }
                });
            },
            //获取活动列表
            getActlist(index) {
                this.index = 2;
                if (index) {
                    this.activityDetail.page = 1;
                }
                this.$ajax
                    .get(
                        "/manage/activity/list?corp_id=" +
                        this.$store.state.corpId +
                        "&page=" +
                        this.activityDetail.page +
                        "&page_size=" +
                        Number(this.activityDetail.page_size) + "&keyword=" + this.searchtext
                    )
                    .then(response => {
                        if (response.data.error == 0) {
                            let res = response.data.data;
                            this.loadDown = true;
                            this.activityDetail = res;
                            for (var i = 0; i < response.data.data.data.length; i++) {
                                this.activityDetail.data[i].start_time = res.data[i].start_time.slice(0, -3);
                                this.activityDetail.data[i].end_time = res.data[i].end_time.slice(0, -3);
                            }
                        } else {
                            this.$message(response.data.message);
                        }
                    })
                    .catch(error => {});
            },
            //获取应用列表
            getAppQrcode() {
                this.$ajax
                    .get("/manage/app/list?corp_id=" + this.$store.state.corpId)
                    .then(response => {
                        if (response.data.error == 0) {
                            let res = response.data.data;
                            this.demoUrl = res[0].demo_url;
                        } else {
                            this.$message(response.data.message);
                        }
                    })
                    .catch(error => {});
            },
            showHideQrcode(index) {
                if (index == 1) {
                    this.showQrcode = true;
                } else {
                    this.showQrcode = false;
                }
            },
            //删除活动
            confirmDelete(activityId) {
                this.$confirm("此操作将永久删除该活动, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                        center: true
                    })
                    .then(() => {
                        this.$ajax
                            .post("/manage/brainstorming/activity/delete", {
                                corp_id: this.$store.state.corpId,
                                activity_id: activityId,
                                status: 0
                            })
                            .then(response => {
                                if (response.data.error == 0) {
                                    this.$message({
                                        type: "success",
                                        message: "删除成功!"
                                    });
                                    if (this.activityDetail.data.length == 1 && this.activityDetail.page > 1) {
                                        this.activityDetail.page = this.activityDetail.page - 1;
                                    } else if (this.activityDetail.data.length == 1 && this.activityDetail.page ==
                                        1) {
                                        this.activityDetail.page = 1;
                                    }
                                    this.getActlist();
                                } else {
                                    this.$message(response.data.message);
                                }
                            })
                            .catch(error => {});
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            //复制活动
            copyConfig(activityId, corpId, appId, index) {
                this.$confirm("此操作将复制活动,是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                        center: true
                    })
                    .then(() => {
                        this.$ajax
                            .post(
                                "/manage/brainstorming/activity/copy", {
                                    corp_id: corpId,
                                    activity_id: activityId,
                                    prize: 0,
                                    user: 0,
                                    question: 0
                                })
                            .then(response => {
                                if (response.data.error == 0) {
                                    this.$message({
                                        type: "success",
                                        message: "复制成功!"
                                    });
                                    this.goPage(
                                        "/Gamemove",
                                        response.data.data.activity_id,
                                        corpId,
                                        appId,
                                        index
                                    );
                                } else {
                                    // this.$message(response.data.message);
                                }
                            })
                            .catch(error => {});
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消复制"
                        });
                    });
            },
            //跳转
            goPage(page, activityId, corpId, appId, index) {
                this.$router.push({
                    path: page,
                    query: {
                        activity_id: activityId,
                        corp_id: corpId,
                        app_id: appId,
                        index: index
                    }
                });
            },
            //复制链接
            openCopy(demourl) {
                this.isCopy = true;
                this.demoUrl = demourl;
            },
            //跳转使用配置
            toConfig(appId) {
                this.$ajax
                    .post("/manage/brainstorming/activity/add", {
                        activity_id: '',
                        corp_id: this.$store.state.corpId,
                        app_id: 1
                    })
                    .then(response => {
                        if (response.data.error == 0) {
                            this.$router.push({
                                path: "/Configger",
                                query: {
                                    app_id: appId,
                                    corp_id: this.$store.state.corpId,
                                    activity_id: response.data.data.activity_id
                                }
                            });
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
        display: none;
        border-bottom: 1px solid #ddd;
        min-height: 178px;
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
    
    .admin-mainer-left {
        min-height: 80vh;
    }
    
    .admin-mainer-left>.total {
        margin-left: 30px;
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
        cursor: pointer;
        padding: 0 10px;
    }
    
    .desc:hover {
        background: #f1f1f1;
    }
    
    .desc span:first-of-type {
        float: left;
    }
    
    .desc span:last-of-type {
        float: right;
        color: #999;
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
    
    .admin-mainer-right p .title {
        font-size: 14px;
        font-weight: bold;
    }
    
    .admin-mainer-right p .level {
        background: #eee;
        width: 150px;
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
        margin-bottom: 30px;
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
    
    .demo_qrcode,
    .demo_url {
        text-align: center;
    }
    
    .admin-mainer-right p.dd img {
        width: 150px;
        height: auto;
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
    
    .admin-mainer-right .el-button {
        width: 100%;
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
    
    .admin-container .address .el-dialog {
        width: 480px;
    }
</style>