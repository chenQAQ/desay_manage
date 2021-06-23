<template>
  <el-container>
    <el-main>
      <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/dingtalk' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>团队PK</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="team-header">
          <h1 class="title">团队PK</h1>
          <el-button type="primary" @click="createTeam(activity_id)">创建团队PK</el-button>
        </div>
        <div class="teamTable">
          <el-table style="width: 100%" :data="tableData">
            <el-table-column prop="subject" fixed label="主题" align="center"></el-table-column>
            <el-table-column prop="start_time" label="开始时间" align="center"></el-table-column>
            <el-table-column prop="pk_status" label="状态" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="goPage(scope.row)" type="text" size="small">数据看板</el-button>
                <el-button @click="handleChange(scope.row)" type="text" size="small">修改</el-button>
                <el-button type="text" size="small" @click="deleteTeam(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </el-container>
</template>


<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      activity_id: "",
      tableData: [],
      team_pk_id: ""
    };
  },

  methods: {
    // 加载列表数据
    getTeamList() {
      let id = this.$route.query.activity_id;
      this.activity_id = id;
      axios
        .get("/manage/teampk/list", {
          params: {
            activity_id: id
          }
        })
        .then(res => {
          let data = res.data.data;
          this.tableData = data;
          this.tableData.map(item => {
            item.start_time = moment(item.start_time * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            if (item.pk_status === 0) {
              item.pk_status = "未开始";
            } else if (item.pk_status === 1) {
              item.pk_status = "正在PK";
            } else if (item.pk_status === 2) {
              item.pk_status = "PK结束";
            }
          });
        });
    },
    // 跳转到创建页面
    createTeam(id) {
      this.$router.push({ path: "/teamCreate", query: { activity_id: id } });
      //   this.$router.push(`/teamCreate?activity_id=${id}`);
    },
    goPage(e) {
      const routeUrl = "https://game.sgjyun.com/manage/teampk/board?activity_id="+ e.activity_id+"&team_pk_id="+ e.team_pk_id
      window.open(routeUrl,'_blank')
    },
    // 删除
    deleteTeam(item) {
      this.$confirm("此操作将永久删除该活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        axios
          .get("/manage/teampk/delete", {
            params: {
              activity_id: this.activity_id,
              team_pk_id: item.team_pk_id
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.error_code === 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTeamList();
            }
          });
      });
    },
    // 修改
    handleChange(e) {
      console.log(e);
      this.$router.push({
        path: "/teamCreate",
        query: {
          activity_id: e.activity_id,
          team_pk_id: e.team_pk_id
        }
      });
    }
  },

  created() {
    this.getTeamList();
  }
};
</script>


<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.container {
  width: 60%;
  margin: 0 auto;
}
.team-header {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
.title {
  font-size: 30px;
  margin-left: 40px;
}
.teamTable {
  margin-top: 30px;
}
</style>
