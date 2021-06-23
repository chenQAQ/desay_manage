<template>
  <el-container>
    <el-main>
      <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/dingtalk' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>创建团队PK</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="save">
          <el-button type="warning" @click="saveMessage">保存</el-button>
        </div>
        <div class="create">
          <div>
            <label class="topLabel">
              <p class="tit">标题:</p>
              <div>
                <el-input v-model="subject" @blur="validateNull(subject)" placeholder="请输入内容"></el-input>
              </div>
            </label>
            <label class="topLabel">
              <p class="tit">开始时间:</p>
              <div class="times">
                <el-date-picker
                  v-model="startTime"
                  type="date"
                  @change="chooseEndDate($event)"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
                <el-time-picker
                
                  v-model="startHour"
                  placeholder="选择时间"
                  value-format="HH:mm"
                  format="HH:mm"
                ></el-time-picker>
              </div>
            </label>
            <label class="topLabel" style="height:100px;">
              <p class="tit">活动须知</p>
              <div class="times">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  @blur="validateNull(regulation)"
                  v-model="regulation"
                ></el-input>
              </div>
            </label>
            <label class="topLabel">
              <p class="tit">题目数:</p>
              <div>
                <el-input-number
                  v-model="question_num"
                  @blur="validateNull(question_num)"
                  @change="handleChange"
                  :min="1"
                  :max="100"
                  label="描述文字"
                ></el-input-number>
              </div>
            </label>
            <label class="topLabel">
              <p class="tit">第一个答对奖励:</p>
              <div>
                <el-input-number
                  controls-position="right"
                  v-model="first_correct"
                  @blur="validateNull(first_correct)"
                  @change="handleChange"
                  :min="0"
                  :max="100"
                  label="描述文字"
                ></el-input-number>
                <span class="percent">%</span>
              </div>
            </label>
            <label class="topLabel">
              <p class="tit">连续答对奖励:</p>
              <div>
                <el-input-number
                  controls-position="right"
                  v-model="continue_correct"
                  @blur="validateNull(continue_correct)"
                  @change="handleChange"
                  :min="0"
                  :max="100"
                  label="描述文字"
                ></el-input-number>
                <span class="percent">%</span>
              </div>
            </label>
            <label class="topLabel">
              <p class="tit">全对答对奖励:</p>
              <div>
                <el-input-number
                  controls-position="right"
                  v-model="all_correct"
                  @blur="validateNull(all_correct)"
                  @change="handleChange"
                  :min="0"
                  :max="100"
                  label="描述文字"
                ></el-input-number>
                <span class="percent">%</span>
              </div>
            </label>
            <div class="excel-btn">
              <div class="excel-btns">
                <p class="upload">
                  <input
                    type="file"
                    title=" "
                    ref="participantName"
                    @change="uploadTeamExcel($event,1)"
                    name="file"
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  />导入人员
                </p>
                <p class="download">
                  <a @click="download($event,1)">下载模板</a>
                </p>
              </div>
              <div class="excel-btns">
                <p class="upload">
                  <input
                    type="file"
                    title=" "
                    ref="participantName"
                    @change="uploadTeamExcel($event,2)"
                    name="file"
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  />导入题库
                </p>
                <p class="download">
                  <a @click="download($event,2)">下载模板</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="AllList" v-show="team_pk_id">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">
              <div>
                <div class="search createSearch">
                  <div class="input">
                    <el-input
                      placeholder="输入关键词"
                      v-model="searchtext1"
                      @keyup.enter.native="search(searchtext1)"
                    >
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                  </div>
                  <el-button class="center-btn" type="primary" @click="search(searchtext1)">搜索</el-button>
                  <el-button
                    type="primary"
                    @click="openAddMember()"
                    class="add-btn btn-right"
                  >+新增人员</el-button>
                </div>
                <el-dialog
                  class="add-member"
                  title="新增人员"
                  :visible.sync="dialogFormVisible"
                  @close="initialUser()"
                >
                  <el-form>
                    <el-form-item label="*员工guid" label-width="80px">
                      <el-input v-model="form.guid" auto-complete="off" placeholder="请输入员工guid"></el-input>
                    </el-form-item>
                    <el-form-item label="*团队名称" label-width="80px">
                      <el-input v-model="form.department_name" auto-complete="off" placeholder="请输入团队名称"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addUser">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
              <el-table align="center" border style="width: 100%" :data="userForm">
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="guid" label="员工guid" align="center"></el-table-column>
                <el-table-column prop="department_name" label="部门" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                layout="prev, pager, next, jumper"
                :total="total"
                @current-change="changePage"
              ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="题库管理" name="second">
              <div>
                <div class="search createSearch">
                  <div class="input">
                    <el-input
                      placeholder="输入关键词"
                      v-model="searchtext2"
                      @keyup.enter.native="search(searchtext2)"
                    >
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                  </div>
                  <el-button class="center-btn" type="primary" @click="search(searchtext1)">搜索</el-button>
                  <el-button type="primary" @click="addQuestion(1)" class="add-btn btn-right">+新增题目</el-button>
                </div>
              </div>
              <el-table align="center" border style="width: 100%" :data="questionList">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item>
                        <p v-for="(value,key) in props.row.question_options" :key="key">
                          <span>{{key}}</span>
                          <span>{{value}}</span>
                        </p>
                        <p>
                          <span>答案</span>&nbsp;&nbsp;
                          <span>{{props.row.correct_answer}}</span>
                        </p>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="题目标题" prop="question_title">
                  <template slot-scope="scope">
                    <span v-if="scope.row.question_type==2" style="color:orange;">【多选】</span>
                    <span>{{scope.row.question_title}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="120">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editQuestion(scope.row,2)">编辑</el-button>
                    <el-button
                      type="text"
                      size="small"
                      @click="deleteQues(scope.row.category_id,scope.row.question_id,scope.row.question_title)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                layout="prev, pager, next, jumper"
                :total="QuesTotal"
                @current-change="changeQuesPage"
              ></el-pagination>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-main>
    <el-dialog title="编辑题目" :visible.sync="showQuestion" class="edit-ques">
      <el-form ref="quesDesc" :model="teamQuesDesc" label-width="110px">
        <el-form-item label="题目标题">
          <el-input type="textarea" v-model="teamQuesDesc.question_title"></el-input>
        </el-form-item>
        <el-form-item label="英文版题目标题" v-if="teamQuesDescType==1">
          <el-input type="textarea" v-model="teamQuesDesc.en_question_title"></el-input>
        </el-form-item>
        <el-form-item label="选项A">
          <el-input v-model="teamQuesDesc.option_a"></el-input>
        </el-form-item>
        <el-form-item label="英文版选项A" v-if="teamQuesDescType==1">
          <el-input type="textarea" v-model="teamQuesDesc.en_option_a"></el-input>
        </el-form-item>
        <el-form-item label="选项B">
          <el-input v-model="teamQuesDesc.option_b"></el-input>
        </el-form-item>
        <el-form-item label="英文版选项B" v-if="teamQuesDescType==1">
          <el-input type="textarea" v-model="teamQuesDesc.en_option_b"></el-input>
        </el-form-item>
        <el-form-item label="选项C">
          <el-input v-model="teamQuesDesc.option_c"></el-input>
        </el-form-item>
        <el-form-item label="英文版选项C" v-if="teamQuesDescType==1">
          <el-input type="textarea" v-model="teamQuesDesc.en_option_c"></el-input>
        </el-form-item>
        <el-form-item label="选项D">
          <el-input v-model="teamQuesDesc.option_d"></el-input>
        </el-form-item>
        <el-form-item label="英文版选项D" v-if="teamQuesDescType==1">
          <el-input type="textarea" v-model="teamQuesDesc.en_option_d"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-checkbox-group v-model="teamQuesDescAnswer" :max="1">
            <el-checkbox
              v-for="option in quesOptions"
              :label="option"
              :key="option"
              border
              size="medium"
            >{{option}}</el-checkbox>
          </el-checkbox-group>
          <span>tips:团队pk只能使用单选题</span>
        </el-form-item>
        <el-form-item>
          <el-button @click="showQuestion=false">取消</el-button>
          <el-button type="primary" @click="saveTeamQuesEdit()">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="导入题库"
      :visible.sync="showUploadQues"
      class="upload-ques"
      @close="showUploadQues = false"
    >
      <div class="upload-mainer">
        <p
          v-if="!uploadQuesDown"
          class="excel-loading"
          v-loading="!uploadQuesDown"
          element-loading-text="正在导入。。。"
          element-loading-spinner="el-icon-loading"
        ></p>
        <div class="excel-detail" v-else>
          <p>导入完成</p>
          <div class="excel-down-detail">
            <p>
              <span>成功</span>
              <span>{{quesExcel.success_num}}</span>
            </p>
            <p v-if="quesExcel.error_num>0">
              <span>失败</span>
              <span>{{quesExcel.error_num}}</span>
              <!-- <span class="upload-error">
                <a @click="download($event,4)">下载excel</a>
              </span> -->
            </p>
          </div>
        </div>
      </div>
      <div class="upload-confirm add-ques-confirm" v-if="uploadQuesDown">
        <!-- <div>
          <span>题库名称</span>
          <input type="text" v-model="quesName" />
          <span @click="editQuesName()" class="confirm-ques">确定</span>
        </div>-->
      </div>
    </el-dialog>
    <el-dialog title="导入名单" :visible.sync="showUploadMember" class="upload-member">
      <div class="upload-mainer">
        <p
          v-if="!uploadMemberDown"
          class="excel-loading"
          v-loading="!uploadMemberDown"
          element-loading-text="正在导入。。。"
          element-loading-spinner="el-icon-loading"
        ></p>
        <div class="excel-detail" v-else>
          <p>导入完成</p>
          <div class="excel-down-detail">
            <p>
              <span>成功</span>
              <span>{{peopleExcel.success_num}}</span>
            </p>
            <p>
              <span>失败</span>
              <span>{{peopleExcel.error_num}}</span>
            </p>
            <p v-if="peopleExcel.uploadFail>0">
              <span>失败</span>
              <span>{{peopleExcel.uploadFail}}</span>
              <span class="upload-error">
                <a @click="download($event,2)">下载excel</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
  </el-container>
</template>


<script>
import axios from "axios";
import moment from "moment";
const options = ["A", "B", "C", "D"];
export default {
  data() {
    return {
      activity_id: "",
      team_pk_id: "",
      page: 1,
      page_size: 10,
      total: 0,
      QuesTotal:0,
      total_page: 1,
      subject: "",
      regulation:"",
      question_num: 5,
      all_correct: 0,
      continue_correct: 0,
      first_correct: 0,
      team_pk_id: "",
      activeName: "first",
      searchtext1: "",
      searchtext2: "",
      form: {
        user_id: 0,
        guid: "",
        department_name: '',
      },
      userForm: [],
      visible: false,
      dialogFormVisible: false,
      dialogDepartmentAdd: false,
      dialogDepartmentChange: false,
      activityDetail: {
        startDate: "",
        startTime: ""
      },
      questionList: [],
      startTime: "",
      startHour: "",
      // 校验活动开始结束时间
      start_time: "",
      end_time: "",
      showQuestion: false,
      teamQuesDesc: {
        question_title: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: ""
      },
      teamQuesDescType: 2,
      teamQuesDescAnswer: [],
      quesOptions: options,
      addOrSave: 0,
      showUploadMember: false, //上传文件弹窗
      showUploadQues: false, //上传文件弹窗
      uploadMemberDown: false,
      uploadQuesDown: false,
      peopleExcel: []
    };
  },
  methods: {
    openAddMember() {
      this.dialogFormVisible=true
      this.form.guid = ''
    },
    // 获取配置信息
    getTeamMessage() {
      //   console.log(this.$route.query.activity_id);
      let id = this.$route.query.activity_id;
      let team_pk_id = this.$route.query.team_pk_id;

      axios
        .get("/manage/teampk/get", {
          params: {
            activity_id: id,
            team_pk_id: team_pk_id
          }
        })
        .then(res => {
          if (res.data.error_code === 0) {
            console.log(res.data.data);
            let data = res.data.data;
            this.team_pk_id = data.team_pk_id;
            this.activity_id = data.activity_id;
            this.subject = data.subject;
            this.regulation = data.regulation;
            this.question_num = data.question_num;
            this.all_correct = data.all_correct;
            this.continue_correct = data.continue_correct;
            this.first_correct = data.first_correct;
            this.startTime = window.fecha.format(
              new Date(data.start_time * 1000),
              "YYYY-MM-DD"
            );
            this.startHour = window.fecha.format(
              new Date(data.start_time * 1000),
              "HH:mm"
            );
            this.team_pk_id = data.team_pk_id;
          }
        });
    },
    // 保存
    saveMessage() {
      let id = this.$route.query.activity_id;
  
      if (this.subject == false) {
        alert("请填写完整");
      } else {
        axios
          .post("/manage/teampk/save", {
            activity_id: id,
            team_pk_id: this.team_pk_id,
            subject: this.subject,
            regulation: this.regulation,
            start_time: this.startTime + " " + this.startHour ,
            first_correct: this.first_correct,
            continue_correct: this.continue_correct,
            all_correct: this.all_correct,
            question_num: this.question_num
          })
          .then(res => {
            // console.log(res);
            if (res.data.error_code === 0) {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
            } else {
              this.$message({
                type: "fail",
                message: res.data.message
              });
            }
          });
      }
    },

    // 校验表单不能为空
    validateNull(str) {
      if (!str) {
        if (str === 0) {
        } else {
          this.$message("不可为空");
          return;
        }
      }
    },

    //获取人员列表
    getMemberList(page) {
      let id = this.$route.query.activity_id;
      let team_pk_id = this.team_pk_id ? this.team_pk_id : this.$route.query.team_pk_id;
      axios
        .get("/manage/teampk/member/list", {
          params: {
            activity_id: id,
            team_pk_id: team_pk_id,
            page: page || 1
          }
        })
        .then(res => {
          //   console.log(res);
          if (res.data.error_code === 0) {
            this.userForm = res.data.data.data;
            let data = res.data.data;
            this.page = data.page;
            this.page_size = data.page_size;
            this.total = data.total;
            this.total_page = data.total_page;
          }
        });
    },

    // 搜索
    search(val) {
      let id = this.$route.query.activity_id;
      let team_pk_id = this.team_pk_id;
      axios
        .get("/manage/teampk/member/list", {
          params: {
            activity_id: id,
            team_pk_id: team_pk_id,
            page: this.page,
            page_size: this.page_size,
            keyword: val
          }
        })
        .then(res => {
          if (res.data.error_code === 0) {
            this.userForm = res.data.data.data;
          }
        });
    },
    // 初始化人员
    initialUser() {
      this.form.user_id = 0;
    },
    //新增人员
    addUser() {
      let id = this.$route.query.activity_id;
      let team_pk_id = this.team_pk_id;
      axios
        .post("/manage/teampk/member/add", {
          activity_id: id,
          team_pk_id:this.team_pk_id,
          guid: this.form.guid,
          department_name: this.form.department_name
        })
        .then(res => {
          if (res.data.error_code === 0) {
            this.$message({
              type: "success",
              message: "新增人员成功!"
            });
            this.getMemberList();
            this.dialogFormVisible = false;
          }else{
            this.dialogFormVisible = false;
            this.$message({
                type: "fail",
                message: res.data.message
              });
          }
        });
    },
    // 删除人员
    deleteUser(e) {
      let id = this.$route.query.activity_id;
      let team_pk_id = this.team_pk_id;
      this.$confirm("此操作将永久删除该活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        axios
          .get("/manage/teampk/member/delete", {
            params: {
              activity_id: id,
              team_pk_id: team_pk_id,
              user_id: e.user_id
            }
          })
          .then(res => {
            console.log(res);
            if (res.data.error_code === 0) {
              this.$message({
                type: "success",
                message: "删除人员成功!"
              });
              this.getMemberList();
            }
          });
      });
    },
    //分页
    changePage(e) {
      this.getMemberList(e);
    },

    changeQuesPage(e) {
      this.getQuestionList(e);
    },

    // 获取题目列表
    getQuestionList(page) {
      let id = this.$route.query.activity_id;
      let team_pk_id = this.team_pk_id ? this.team_pk_id : this.$route.query.team_pk_id;
      axios
        .get("/manage/teampk/question/list", {
          params: {
            activity_id: id,
            team_pk_id: team_pk_id,
            page: page || 1
          }
        })
        .then(res => {
          // console.log(res);
          this.questionList = res.data.data.data;
          this.QuesTotal = res.data.data.total;
          let data = res.data.data.data;
        });
    },

    //下载模板
    download(el, index) {
      if (index == 1) {
        el.target.href =
          window.location.origin +
           "/manage/brainstorming/model/download?type=member";
      } else if (index == 2) {
        el.target.href =
          window.location.origin +
          "/manage/brainstorming/model/download?type=question";
      }
    },

    uploadTeamExcel(el, index) {
      if (index == 1) {
        if (el.target.files[0]) {
          this.showUploadMember = true;
          this.uploadMemberDown = false;
          let formData = new FormData();
          formData.append("activity_id", this.activity_id);
          formData.append("team_pk_id", this.team_pk_id);
          formData.append("user", el.target.files[0]);
          this.$ajax
            .post("/manage/teampk/member/upload", formData)
            .then(response => {debugger
              console.log(response);
              el.target.files[0] = ''
              if (response.data.error_code == 0) {
                this.uploadMemberDown = true;
                this.peopleExcel = response.data.data;
                this.getMemberList();
              } else {
                this.showUploadMember = false;
                this.uploadMemberDown = false;
                this.$alert(response.data.message, "导入错误", {
                  confirmButtonText: "确定"
                });
              }
            })
            .catch(error => {
                this.showUploadMember = false;
                this.uploadMemberDown = false;
                this.getMemberList();
                this.$alert("超出响应时间，已转入后台导入", "友好提示", {
                  confirmButtonText: "确定"
                });});
        }
      }
      if (index == 2) {
        if (el.target.files[0]) {
          this.quesExcelFile = el.target.files[0];
          this.showUploadQues = true;
          this.uploadQuesDown = false;
          let formData = new FormData();
          formData.append("activity_id", this.activity_id);
          formData.append("team_pk_id", this.team_pk_id);
          formData.append("question", el.target.files[0]);
          formData.append(
            "category_name",
            el.target.files[0].name.split(".")[0]
          );
          this.quesName = el.target.files[0].name.split(".")[0];
          this.$ajax
            .post("/manage/teampk/question/upload", formData)
            .then(response => {
              if (response.data.error_code == 0) {
                this.uploadQuesDown = true;
                this.quesExcel = response.data.data;
                this.categoryId = this.quesExcel.category_id;
                this.getQuestionList();
              } else {
                this.showUploadQues = false;
                this.uploadQuesDown = false;
                this.$alert(response.data.message, "导入错误", {
                  confirmButtonText: "确定"
                });
              }
            })
            .catch(error => {});
        }
      }
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    departmentCgHolder() {},
    handleChange() {},
    // 获取活动开始结束时间
    getActivityTime() {
      let id = this.$route.query.activity_id;
      axios
        .get("/manage/teampk/activity_time", {
          params: {
            activity_id: id
          }
        })
        .then(res => {
          // console.log(res);
          this.start_time = res.data.data.start_time;
          this.end_time = res.data.data.end_time;
        });
    },
    // 开始时间选择
    chooseEndDate(el) {
      console.log(
        moment(new Date(el).getTime() / 1000).format("YYYY-MM-DD HH:mm:ss")
      );
      console.log(new Date(el).getTime() / 1000);
      if (new Date(el).getTime() / 1000 < new Date(this.start_time).getTime()) {
        this.$confirm("您的活动时间不能在活动开始之前", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      } else if (
        new Date(el).getTime() / 1000 >
        new Date(this.end_time).getTime()
      ) {
        this.$confirm("您的活动时间不能在活动开始之后", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },
    // 结束时间选择
    chooseEndTime(el, index) {
      // let start_time = this.$route.query.start_time;
      console.log(new Date(this.startTime + " " + el).getTime() / 1000);
      if (index == 1) {
        if (
          new Date(
            new Date(this.startTime + " " + el).getTime() / 1000
          ).getTime() > new Date(this.start_time).getTime()
        ) {
          this.$confirm("您的活动时间不能在您的会员期限之前", "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        }
      }
    },
    //编辑题目
    editQuestion(data) {
      console.log(data);
      this.showQuestion = true;
      this.teamQuesDesc.question_title = data.question_title;
      this.teamQuesDesc.en_question_title = data.en_question_title;
      this.teamQuesDesc.option_a = data.question_options.A;
      this.teamQuesDesc.option_b = data.question_options.B;
      this.teamQuesDesc.option_c = data.question_options.C;
      this.teamQuesDesc.option_d = data.question_options.D;
      this.teamQuesDescAnswer = data.correct_answer.split("");
      this.teamQuesDesc.questionId = data.question_id;
      this.teamQuesDesc.categoryId = data.category_id;
    },
    // 新增或保存题目编辑
    saveTeamQuesEdit() {
      // 保存
      if (this.addOrSave === 0) {
        var answerStr1 = "";
        this.teamQuesDescAnswer.forEach(item => {
          answerStr1 += item;
        });
        let sendData1 = {};
        if (this.teamQuesDescType == 2) {
          sendData1 = {
            team_pk_id: this.team_pk_id,
            activity_id: this.activity_id,
            question_id: this.teamQuesDesc.questionId,
            category_id: this.teamQuesDesc.categoryId,
            question_title: this.teamQuesDesc.question_title,
            option_a: this.teamQuesDesc.option_a,
            option_b: this.teamQuesDesc.option_b,
            option_c: this.teamQuesDesc.option_c,
            option_d: this.teamQuesDesc.option_d,
            correct_answer: answerStr1
          };
        }
        axios.post("/manage/teampk/question/save", sendData1).then(res => {
          if (res.data.error_code == 0) {
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
            this.getQuestionList();
            this.showQuestion = false;
          } else {
            this.$message(res.data.message);
          }
        });
      } else if (this.addOrSave === 1) {
        // 新增
        let sendData2 = {};
        sendData2 = {
          team_pk_id: this.team_pk_id,
          activity_id: this.activity_id,
          question_title: this.teamQuesDesc.question_title,
          option_a: this.teamQuesDesc.option_a,
          option_b: this.teamQuesDesc.option_b,
          option_c: this.teamQuesDesc.option_c,
          option_d: this.teamQuesDesc.option_d,
          correct_answer: this.teamQuesDescAnswer.join(",")
        };

        axios.post("/manage/teampk/question/save", sendData2).then(res => {
          if (res.data.error_code == 0) {
            this.$message({
              type: "success",
              message: "新增成功!"
            });
            this.getQuestionList();
            this.showQuestion = false;
          } else {
            this.$message(res.data.message);
          }
        });
      }
    },
    // 新增题目
    addQuestion(type) {
      this.addOrSave = type;
      this.showQuestion = true;
    }
  },

  created() {

    this.getActivityTime();
    this.getTeamMessage();
    this.getMemberList();
    this.getQuestionList();
  },
  updated() {}
};
</script>


<style scoped>
.el-main {
  /* background-color: #e9eef3;
  color: #333; */
  text-align: center;
}
.container {
  width: 60%;
  margin: 0 auto;
}
.save {
  float: right;
}
.create {
  margin-top: 50px;
}
.topLabel {
  display: flex;
  width: 70%;
  margin: 0 auto;
  height: 40px;
  margin-bottom: 20px;
}
.tit {
  line-height: 40px;
  width: 130px;
  /* margin-right: 60px; */
}
.times {
  width: 354px;
}
.times .el-date-editor {
  width: 50%;
  float: left;
}

.excel-btn {
  display: flex;
  margin-left: 200px;
}
/* .upload-demo {
  display: block;
  margin: 0 50px;
} */
.excel-btns {
  overflow: hidden;
  padding-right: 24px;
}
.upload {
  float: left;
  position: relative;
  border: 1px solid #1e90ff;
  background: #1e90ff;
  border-radius: 5px;
  color: #fff;
  width: 120px;
  text-align: center;
  cursor: pointer;
  height: 34px;
  line-height: 32px;
  /* margin-left: 200px; */
}
.upload input {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  opacity: 0;
  cursor: pointer;
}
.download {
  float: left;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #333;
  width: 100px;
  text-align: center;
  margin-right: 20px;
  cursor: pointer;
  height: 34px;
  line-height: 32px;
  margin-left: 20px;
}
.download a {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #333;
  outline: 0;
  cursor: pointer;
  transition: color 0.2s ease;
}
.createSearch {
  width: 100%;
}
.btn-right {
  float: right;
}
.center-btn {
  float: left;
}
.el-input-number {
  float: left;
}
.percent {
  line-height: 40px;
  font-size: 20px;
}
</style>
