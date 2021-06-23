<template>
  <div class="config-container">
    <topbar></topbar>
    <div class="page_title">
      <p>
        <a href="javascript:void(0);" @click="goHome()">首页</a>
        <span>&gt;</span>创建活动
      </p>
    </div>
    <div class="content">
      <div :class="searchBarFixed?'template isfixed':'template'">
        <div class="template-wrapper" :style="{'background-color':homebgcolor}">
          <div>
            <!-- <div class="header-bar">{{activityDetail.basicConfig.title}}</div> -->
            <div class="banner">
              <span class="rule">活动须知</span>
              <img :src="activityDetail.basicConfig.top_banner" alt>
            </div>
            <div class="selfinfo">
              <div class="selfinfo-left">
                <span class="avatar">{{shortName}}</span>
                <p>
                  <span>{{userdata.name}}</span>
                  <span>部门</span>
                </p>
              </div>
              <div class="selfinfo-right">
                <p>
                  <span class="other">知识币</span>
                  <span class="other">|</span>
                  <span class="detail">抽奖</span>
                </p>
              </div>
            </div>
          </div>
          <div class="template-mainer">
            <div class="mainer-left">
              <div class="must">
                <img v-if="activityDetail.basicConfig.top_background_color == 'pink'" src="../imgs/must_bg.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'blue'" src="../blue_imgs/must_bg.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'yellow'" src="../yellow_imgs/must_bg.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'purple'" src="../purple_imgs/must_bg.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'red'" src="../red_imgs/must_bg.png" style="width:100%;height:100%;">
              </div>
              <div class="mission">
                <img v-if="activityDetail.basicConfig.top_background_color == 'pink'" src="../imgs/answer.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'blue'" src="../blue_imgs/answer.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'yellow'" src="../yellow_imgs/answer.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'purple'" src="../purple_imgs/answer.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'red'" src="../red_imgs/answer.png" style="width:100%;height:100%;">
              </div>
            </div>
            <div class="mainer-right">
              <div class="beatdown">
                <img v-if="activityDetail.basicConfig.top_background_color == 'pink'" src="../imgs/teampk.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'blue'" src="../blue_imgs/teampk.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'yellow'" src="../yellow_imgs/teampk.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'purple'" src="../purple_imgs/teampk.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'red'" src="../red_imgs/teampk.png" style="width:100%;height:100%;">
              </div>
              <div class="rank">
                <img v-if="activityDetail.basicConfig.top_background_color == 'pink'" src="../imgs/rank.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'blue'" src="../blue_imgs/rank.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'yellow'" src="../yellow_imgs/rank.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'purple'" src="../purple_imgs/rank.png" style="width:100%;height:100%;">
                <img v-if="activityDetail.basicConfig.top_background_color == 'red'" src="../red_imgs/rank.png" style="width:100%;height:100%;">
              </div>
            </div>

            <div class="mainer-line">
              <img v-if="activityDetail.basicConfig.top_background_color == 'pink'" src="../imgs/battle.png" style="width:100%;height:100%;">
              <img v-if="activityDetail.basicConfig.top_background_color == 'blue'" src="../blue_imgs/battle.png" style="width:100%;height:100%;">
              <img v-if="activityDetail.basicConfig.top_background_color == 'yellow'" src="../yellow_imgs/battle.png" style="width:100%;height:100%;">
              <img v-if="activityDetail.basicConfig.top_background_color == 'purple'" src="../purple_imgs/battle.png" style="width:100%;height:100%;">
              <img v-if="activityDetail.basicConfig.top_background_color == 'red'" src="../red_imgs/battle.png" style="width:100%;height:100%;">
            </div>
          </div>
          <div class="template-footer">
            <p>{{activityDetail.basicConfig.sponsor_corp}}</p>
            <!-- <p>技术支持：蓝凌叮当</p> -->
          </div>
        </div>
      </div>
      <div :class="searchBarFixed?'config isfixed':'config'">
        <div :class="searchBarFixed?'config-top isfixed':'config-top'" id="configTop">
          <div class="step">
            <ul class="top-bar">
              <li :class="stepIndex==1?'active':''" @click="getBasicConfig()">①基础设置</li>
              <li :class="stepIndex==2?'active':''" @click="getParticipantDetail(1)">②参与人员</li>
              <li :class="stepIndex==3?'active':''" @click="getQuesList(1)">③题库及答题</li>
              <li :class="stepIndex==4?'active':''" @click="getPrizeList(1)">④奖品抽奖</li>
            </ul>
          </div>
          <div class="publish-btn" @click="publish()">发布</div>
        </div>
        <div :class="searchBarFixed?'config-mainer isfixed':'config-mainer'">
          <div v-if="stepIndex==1" class="step-one">
            <div class="row">
              <p class="row-title">活动标题</p>
              <div class="row-content">
                <el-input
                  @blur="validateNull(activityDetail.basicConfig.title)"
                  v-model="activityDetail.basicConfig.title"
                ></el-input>
              </div>
            </div>
            <div class="row">
              <p class="row-title">活动时间</p>
              <div class="row-content">
                <el-date-picker
                  v-model="activityDetail.basicConfig.startDate"
                  type="date"
                  @change="chooseEndDate($event)"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
                <el-time-picker
                  @change="chooseEndTime($event,1)"
                  v-model="activityDetail.basicConfig.startTime"
                  placeholder="选择时间"
                  value-format="HH:mm"
                  format="HH:mm"
                ></el-time-picker>至
                <el-date-picker
                  v-model="activityDetail.basicConfig.endDate"
                  @change="chooseEndDate($event)"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                ></el-date-picker>
                <el-time-picker
                  v-model="activityDetail.basicConfig.endTime"
                  @change="chooseEndTime($event,2)"
                  placeholder="选择时间"
                  value-format="HH:mm"
                  format="HH:mm"
                ></el-time-picker>
              </div>
            </div>
            <div class="row">
              <p class="row-title">活动须知</p>
              <div class="row-content">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  @blur="validateNull(activityDetail.basicConfig.regulation)"
                  v-model="activityDetail.basicConfig.regulation"
                ></el-input>
              </div>
            </div>
            <!-- <div class="row">
              <p class="row-title">滚动文字</p>
              <div class="row-content">
                <el-input
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  @blur="validateNull(activityDetail.basicConfig.message)"
                  v-model="activityDetail.basicConfig.message"
                ></el-input>
              </div>
            </div> -->
            <div class="row">
              <p class="row-title">限制参与时间</p>
              <div class="row-content">
                <el-switch
                  v-model="activityDetail.basicConfig.is_jobtime_limit"
                  active-color="#A4D3EE"
                  inactive-color="#BFBFBF"
                ></el-switch>
                <p class="limit-msg" v-if="activityDetail.basicConfig.is_jobtime_limit">时间段内将不能参与游戏</p>
                <p class="limit-time" v-if="activityDetail.basicConfig.is_jobtime_limit">
                  <span>时间段1</span>
                  <el-time-picker
                    format="HH:mm"
                    value-format="HH:mm"
                    is-range
                    v-model="activityDetail.basicConfig.uptime"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder
                  ></el-time-picker>
                </p>
                <p class="limit-time" v-if="activityDetail.basicConfig.is_jobtime_limit">
                  <span>时间段2</span>
                  <el-time-picker
                    format="HH:mm"
                    value-format="HH:mm"
                    is-range
                    v-model="activityDetail.basicConfig.downtime"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder
                  ></el-time-picker>
                </p>
                <p class="limit-time" v-if="activityDetail.basicConfig.is_jobtime_limit">
                  <span>周末不限制</span>
                  <el-switch
                    v-model="activityDetail.basicConfig.is_weekend_limit"
                    active-color="#A4D3EE"
                    inactive-color="#BFBFBF"
                  ></el-switch>
                </p>
              </div>
            </div>
            <div class="row">
                <p class="row-title">皮肤选择</p>
                <div class="row-content">
                  <el-select v-model="activityDetail.basicConfig.top_background_color" @change="skinChange">
                    <el-option key="1" label="粉色系列" value="pink"></el-option>
                    <el-option key="2" label="紫色系列" value="purple" ></el-option>
                    <el-option key="3" label="蓝色系列" value="blue" ></el-option>
                    <el-option key="4" label="黄色系列" value="yellow" ></el-option>
                    <el-option key="5" label="红色系列" value="red" ></el-option>
                  </el-select>
                </div>
              </div>
            <div class="row">
              <p class="row-title banner-size">
                主题图片
                <span>710*230</span>
              </p>
              <div class="row-content">
                <div class="placehold-wrapper">
                  <div class="placehold placehold-bg">
                    <img ref="homeBg" :src="activityDetail.basicConfig.top_banner">
                    <form>
                      <input
                        type="file"
                        accept="png/jpg"
                        ref="homeBgInp"
                        @change="xmTanUploadImg($event,0)"
                        title="设置图片"
                      >
                    </form>
                  </div>
                  <div class="camera">
                    <i class="iconfont">&#xe64f;</i>
                  </div>
                </div>
                <span @click="backDefault(1)" class="default">恢复默认</span>
                <a @click="downDefault($event,1)" target="_blank" class="picture">查看图片</a>
                <p class="rate">{{uploadStatus==1?'上传中...':''}}</p>
              </div>
            </div>
   
            <div class="row">
              <p class="row-title">底部文案</p>
              <div class="row-content">
                <el-input
                  @blur="validateNull(activityDetail.basicConfig.sponsor_corp)"
                  v-model="activityDetail.basicConfig.sponsor_corp"
                ></el-input>
              </div>
            </div>
          </div>
          <div v-if="stepIndex==2" class="step-two">
            <div class="row">
              <p class="row-title">员工参与入口</p>
              <div class="row-content">
                <el-radio v-model="activityDetail.participantInfo.entry"  label="4"  >{{env=='ianswer'?'微信':'移事通'}}</el-radio>
              </div>
            </div>
            <div class="row">
              <p class="row-title">可参与人员</p>
              <div class="row-content">
                <el-radio v-model="activityDetail.participantInfo.origin" label="4">全员</el-radio>
                <el-radio v-model="activityDetail.participantInfo.origin" label="1">导入名单</el-radio>
              </div>
            </div>
            <div
              class="row"
              v-if="activityDetail.participantInfo.entry==4 && activityDetail.participantInfo.origin==1"
            >
              <p class="row-title"></p>
              <div class="row-content">
                <div class="search">
                  <div class="input">
                    <el-input
                      placeholder="输入关键词"
                      v-model="searchtext"
                      @keyup.enter.native="getParticipantDetail(1,1)"
                    >
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                  </div>
                  <el-button type="primary" @click="getParticipantDetail(1,1)">搜索</el-button>
                  <el-button type="primary" @click="dialogFormVisible=true" class="add-btn">+新增人员</el-button>
                </div>
                <el-dialog
                  class="add-member"
                  title="新增人员"
                  :visible.sync="dialogFormVisible"
                  @close="initialMember()"
                >
                  <el-form :model="form">
                    <el-form-item label="*姓名" label-width="80px">
                      <el-input
                        v-model="form.name"
                        auto-complete="off"
                        placeholder="请输入员工姓名"
                        @blur="validateNull(form.name)"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="*员工UserID" label-width="80px">
                      <el-input v-model="form.phone" auto-complete="off" placeholder="请输入员工UserID"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" label-width="80px">
                      <el-input v-model="form.dept" auto-complete="off" placeholder="请输入部门"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addMember()">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </div>
            <div
              class="row"
              v-if="activityDetail.participantInfo.entry==4 && activityDetail.participantInfo.origin==1"
            >
              <p class="row-title"></p>
              <div class="row-content member">
                <el-table
                  :data="memberTableData.data"
                  border
                  style="width: 100%"
                  v-if="memberTableData.data.length>0"
                >
                  <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                  <el-table-column prop="phone" label="员工UserID" align="center"></el-table-column>
                  <el-table-column prop="department_name" label="部门" align="center"></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="editMember(scope.row)">编辑</el-button>
                      <el-button type="text" size="small" @click="deleteMember(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table
                  align="center"
                  border
                  style="width: 100%"
                  v-if="memberTableData.data.length==0"
                >
                  <el-table-column label="姓名" align="center"></el-table-column>
                  <el-table-column label="员工UserID" align="center"></el-table-column>
                  <el-table-column label="部门" align="center"></el-table-column>
                  <el-table-column label="操作" align="center"></el-table-column>
                </el-table>
                <div class="excel-count" v-if="memberTableData.data.length>0">
                  <p>总计：{{memberTableData.department_info.total}}人</p>
                  <el-pagination
                    v-if="memberTableData.total_page>1"
                    background
                    :current-page.sync="memberTableData.page"
                    :page-size="Number(memberTableData.page_size)"
                    layout="prev, pager, next,jumper"
                    :total="memberTableData.total"
                    @size-change="getParticipantDetail(1)"
                    @current-change="getParticipantDetail(1)"
                  ></el-pagination>
                </div>
                <div class="preciew-dept-detail" v-if="memberTableData.data.length>0">
                  <p>部门明细</p>
                  <ul>
                    <li v-for="(value,key) in memberTableData.department_info" :key="key" v-if="key != 'total'" >
                      <p>{{key}}</p>
                      <p>{{value}}</p>
                    </li>
                  </ul>
                </div>
                <div class="dept-rank" v-if="memberTableData.data.length>0">
                  <span>部门排名</span>
                  <el-switch
                    v-model="activityDetail.participantInfo.isRank"
                    active-color="#A4D3EE"
                    inactive-color="#BFBFBF"
                  ></el-switch>
                </div>
                <p
                  class="rank-tip"
                  v-if="memberTableData.data.length>0"
                >开启部门排名后会在活动中按部门统计完成率和计算知识币排行</p>
              </div>
            </div>
            <div
              class="row"
              v-if="activityDetail.participantInfo.entry==4 && activityDetail.participantInfo.origin==1"
            >
              <div class="excel-btns">
                <p class="upload">
                  <input
                    type="file"
                    title=" "
                    ref="participantName"
                    @change="uploadExcel($event,1)"
                    name="file"
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  >excel导入名单
                </p>
                <p class="download">
                  <a @click="download($event,1)">下载模板</a>
                </p>
              </div>
            </div>
          </div>
          <div v-if="stepIndex==3" class="step-three">
            <div class="row">
              <p class="row-title">题库</p>
              <div class="row-content">
                <p v-if="activityDetail.questionList.length==0" class="null-ques">暂无题库</p>
                <div class="ques-list" v-if="activityDetail.questionList.length>0">
                  <ul>
                    <li v-for="(item,i) in activityDetail.questionList" :key="i">
                      <p>{{item.category_name}}</p>
                      <p>{{item.questionNum}}</p>
                      <p class="fixed-bottom">
                        <span
                          @click="getQuesDetail(item.category_id,item.isSlot)"
                        >{{item.isSlot?'收起':'详情'}}</span>
                        <span @click="deleteQuesList(item.category_id,item.category_name)">删除</span>
                      </p>
                    </li>
                  </ul>
                </div>
                <div class="search" v-if="showQuesList">
                  <div class="input">
                    <el-input
                      placeholder="输入关键词"
                      v-model="searchtextques"
                      @keyup.enter.native="getQuesDetails()"
                    >
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                  </div>
                  <el-button type="primary" @click="getQuesDetails()">搜索</el-button>
                </div>
                <el-table
                  v-if="showQuesList"
                  :data="quesTableData.data"
                  style="width: 100%;margin-top:20px;"
                  border
                >
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
                  <el-table-column label="题目标题" prop="question_title" align="left">
                    <template slot-scope="scope">
                      <span v-if="scope.row.question_type==2" style="color:orange;">【多选】</span>
                      <span>{{scope.row.question_title}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="120">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="editQues(scope.row)">编辑</el-button>
                      <el-button
                        type="text"
                        size="small"
                        @click="deleteQues(scope.row.category_id,scope.row.question_id,scope.row.question_title)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="excel-count" v-if="showQuesList && quesTableData.data.length>0">
                  <el-pagination
                    v-if="showQuesList && quesTableData.total_page>1"
                    background
                    :current-page.sync="quesTableData.page"
                    :page-size="Number(quesTableData.page_size)"
                    layout="prev, pager, next,jumper"
                    :total="quesTableData.total"
                    @size-change="getQuesDetail(categoryId,'1')"
                    @current-change="getQuesDetail(categoryId,'1')"
                  ></el-pagination>
                </div>
              </div>
            </div>
            <div class="row">
              <p class="row-title"></p>
              <div class="row-content">
                <div class="excel-btns">
                  <p class="upload">
                    <input
                      type="file"
                      title=" "
                      name="file"
                      ref="questionName"
                      @change="uploadExcel($event,2)"
                      accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    >excel导入题库
                  </p>
                  <p class="download">
                    <a @click="download($event,3)">下载模板</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <p class="row-title">答题设置</p>
              <div class="row-content">
                <el-tabs @tab-click="changeQuesIndex">
                  <el-tab-pane label="必答"></el-tab-pane>
                  <el-tab-pane label="闯关"></el-tab-pane>
                  <el-tab-pane label="PK"></el-tab-pane>
                </el-tabs>
                <div v-if="quesIndex==0">
                  <div class="ques-config">
                    <p class="ques-config-title">使用题目组</p>
                    <p v-if="activityDetail.questionList.length==0" class="ques-config-content null-ques" >等待上传题库</p>
                    <p v-else class="ques-config-content ques-config-list">
                      <el-checkbox-group v-model="answerQues.type">
                        <el-checkbox :label="String(item.category_id)" name="type" v-for="(item,i) in activityDetail.questionList" :key="i" >{{item.category_name}}</el-checkbox>
                      </el-checkbox-group>
                    </p>
                  </div>
                  <div class="ques-config">
                    <p class="ques-config-title">题目数</p>
                    <p class="ques-config-content">
                      <el-input-number
                        @blur="validateNull(answerQues.answerQuesCount)"
                        v-model="answerQues.answerQuesCount"
                        :min="0"
                      ></el-input-number>题
                    </p>
                  </div>
                  <div class="ques-config">
                    <p class="ques-config-title">允许答错</p>
                    <p class="ques-config-content">
                      <el-input-number
                        @blur="validateNull(answerQues.answerQuesError)"
                        v-model="answerQues.answerQuesError"
                        :min="0"
                      ></el-input-number>题
                    </p>
                  </div>
                  <div class="ques-config">
                    <p class="ques-config-title">成功奖励知识币</p>
                    <p class="ques-config-content">
                      <el-input-number
                        @blur="validateNull(answerQues.answerGoldValue)"
                        v-model="answerQues.answerGoldValue"
                        :min="0"
                      ></el-input-number>个
                    </p>
                  </div>
                  <!-- <div class="ques-config">
                    <p class="ques-config-title">每日答题上限数</p>
                    <p class="ques-config-content">
                      <el-input-number
                        @blur="validateNull(answerQues.answerNumLimit)"
                        v-model="answerQues.answerNumLimit"
                        :min="1"
                      ></el-input-number>次
                    </p>
                  </div> -->
                  <div class="ques-config">
                    <p class="ques-config-title">答题时间</p>
                    <p class="ques-config-content">
                      <el-input-number
                        @blur="validateNull(answerQues.answerQuesTime)"
                        v-model="answerQues.answerQuesTime"
                        :min="0"
                      ></el-input-number>秒
                    </p>
                  </div>
                  
                </div>
                <div v-if="quesIndex==1">
                  <div class="ques-config">
                    <p class="ques-config-title">关卡数量</p>
                    <p class="ques-config-content">
                      <el-select v-model="checkpoint">
                        <el-option v-for="(item,i) in 20" :key="i" :label="item" :value="item"></el-option>
                      </el-select>
                    </p>
                  </div>
                  <div class="ques-config">
                    <el-tabs v-model="checkpointIndex" @tab-click="handleClick" v-if="checkpoint>1">
                      <el-tab-pane  v-for="(item,index) in checkpoint" :key="index" :label="checkpointName[index]" :name="checkpointName[index]" ></el-tab-pane>
                    </el-tabs>
                  </div>
                  <div v-for="(pointItem,index) in checkpoint" :key="index" v-if="index==checkpointTab">
                    <div class="ques-config" v-if="checkpoint>1">
                      <p class="ques-config-title">关卡名称</p>
                      <p class="ques-config-content">
                        <el-input
                          @blur="validateNull(mustQuesList[index].must_blockade_name)"
                          v-model="mustQuesList[index].must_blockade_name"
                        ></el-input>
                      </p>
                    </div>
                    <div class="ques-config">
                      <p class="ques-config-title">关卡类型</p>
                      <p class="ques-config-content">
                        <el-select v-model="mustQuesList[index].checktype">
                          <el-option label="第一类型" :value="1"></el-option>
                          <el-option label="第二类型" :value="2"></el-option>
                        </el-select>
                      </p>
                    </div>
                    <!-- <div class="ques-config" v-if="checkpoint>1">
                      <p class="ques-config-title">英文关卡名称</p>
                      <p class="ques-config-content">
                        <el-input
                          @blur="validateNull(mustQuesList[index].en_must_blockade_name)"
                          v-model="mustQuesList[index].en_must_blockade_name"
                        ></el-input>
                      </p>
                    </div> -->
                    <div class="ques-config">
                      <p class="ques-config-title">使用题目组</p>
                      <p
                        v-if="activityDetail.questionList.length==0"
                        class="ques-config-content null-ques"
                      >等待上传题库</p>
                      <p v-else class="ques-config-content ques-config-list">
                        <el-checkbox-group v-model="mustQuesTypeNow" @change="test">
                          <el-checkbox :label="String(item.category_id)" name="type" v-for="(item,i) in activityDetail.questionList" :key="i" >{{item.category_name}}</el-checkbox>
                        </el-checkbox-group>
                      </p>
                    </div>
                    <div class="ques-config" style="display:inline-flex;"> 
                      <p class="ques-config-title">开始时间</p>
                        <div class="row-content">
                          <el-date-picker
                            v-model="mustQuesList[index].startDate"
                            type="datetime"
                            @change="chooseCustomsDate($event,index)"
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm"
                            placeholder="选择日期"
                          ></el-date-picker>
                          <!-- <el-time-picker
                            @change="chooseEndTime($event,1)"
                            v-model="mustQuesList[index].startTime"
                            placeholder="选择时间"
                            value-format="HH:mm"
                            format="HH:mm"
                          ></el-time-picker> -->
                        </div>
                    </div>
                    <div class="ques-config">
                      <p class="ques-config-title">题目数</p>
                      <p class="ques-config-content">
                        <el-input-number
                          @blur="validateNull(mustQuesList[index].must_question_num)"
                          v-model="mustQuesList[index].must_question_num"
                          :min="0"
                        ></el-input-number>题
                      </p>
                    </div>
                    <div class="ques-config">
                      <p class="ques-config-title">允许答错</p>
                      <p class="ques-config-content">
                        <el-input-number
                          @blur="validateNull(mustQuesList[index].must_answer_wrong_num)"
                          v-model="mustQuesList[index].must_answer_wrong_num"
                          :min="0"
                        ></el-input-number>题
                      </p>
                    </div>
                    <div class="ques-config">
                      <p class="ques-config-title">成功奖励知识币</p>
                      <p class="ques-config-content">
                        <el-input-number
                          @blur="validateNull(mustQuesList[index].must_answer_success_km)"
                          v-model="mustQuesList[index].must_answer_success_km"
                          :min="0"
                        ></el-input-number>个
                      </p>
                    </div>
                    <div class="ques-config">
                      <p class="ques-config-title">答题时间</p>
                      <p class="ques-config-content">
                        <el-input-number
                          @blur="validateNull(mustQuesList[index].must_answer_count_down)"
                          v-model="mustQuesList[index].must_answer_count_down"
                          :min="0"
                        ></el-input-number>秒
                      </p>
                    </div>
                    <div class="ques-config">
                      <p class="ques-config-title">出题算法规则</p>
                      <p class="ques-config-content">
                        <el-radio-group v-model="mustQuesList[index].get_question_mode">
                          <div>
                            <el-radio :label="0">随机</el-radio>
                          </div>
                          <div>
                            <el-radio :label="1">优先出现未答过的题目，次优先出现答错的题目</el-radio>
                          </div>
                          <div>
                            <el-radio :label="2">优先出现答错的题目，次优先出现未答过的题目</el-radio>
                          </div>
                        </el-radio-group>
                      </p>
                    </div>
                  </div>
                </div>
                <div v-if="quesIndex==2">
                  <div class="ques-config">
                    <p class="ques-config-title">使用题目组</p>
                    <p
                      v-if="activityDetail.questionList.length==0"
                      class="ques-config-content null-ques"
                    >等待上传题库</p>
                    <p v-else class="ques-config-content ques-config-list">
                      <el-checkbox-group v-model="pkQues.type">
                        <el-checkbox :label="String(item.category_id)"  name="type" v-for="(item,i) in activityDetail.questionList" :key="i" >{{item.category_name}}</el-checkbox>
                      </el-checkbox-group>
                    </p>
                  </div>
                  <div class="ques-config">
                    <p class="ques-config-title">题目数</p>
                    <p class="ques-config-content">
                      <el-input-number
                        @blur="validateNull(pkQues.pkQuesCount)"
                        v-model="pkQues.pkQuesCount"
                        :min="0"
                      ></el-input-number>题
                    </p>
                  </div>
                  <div class="ques-config">
                    <p class="ques-config-title">PK学分</p>
                    <p class="ques-config-content">
                      <el-input-number @blur="validateNull(pkQues.km)" v-model="pkQues.km" :min="0"></el-input-number>分
                    </p>
                  </div>
                  <div class="ques-config double">
                    <p class="ques-config-title">最后一题双倍得分</p>
                    <p class="ques-config-content">
                      <el-switch v-model="pkQues.pkDoubleScore"></el-switch>
                    </p>
                  </div>
                  <div class="ques-config level-config">
                    <p class="ques-config-title">段位名称</p>
                    <p class="ques-config-content">
                      <span>{{levelLists.one}}/{{levelLists.two}}/{{levelLists.three}}/{{levelLists.four}}/{{levelLists.five}}/{{levelLists.six}}</span>
                      <br>
                      <el-button type="primary" @click="dialogLevel=true" class="level-btn">设置名称</el-button>
                      <el-dialog title="编辑段位名称" :visible.sync="dialogLevel" class="level-dialog">
                        <el-form label-width="80px" :model="levelLists">
                          <el-form-item label="段位1">
                            <el-input
                              v-model="levelLists.one"
                              maxlength="6"
                              auto-complete="off"
                              :placeholder="levelLists.one"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="段位2">
                            <el-input
                              v-model="levelLists.two"
                              maxlength="6"
                              auto-complete="off"
                              :placeholder="levelLists.two"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="段位3">
                            <el-input
                              v-model="levelLists.three"
                              maxlength="6"
                              auto-complete="off"
                              :placeholder="levelLists.three"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="段位4">
                            <el-input
                              v-model="levelLists.four"
                              maxlength="6"
                              auto-complete="off"
                              :placeholder="levelLists.four"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="段位5">
                            <el-input
                              v-model="levelLists.five"
                              maxlength="6"
                              auto-complete="off"
                              :placeholder="levelLists.five"
                            ></el-input>
                          </el-form-item>
                          <el-form-item label="段位6">
                            <el-input
                              v-model="levelLists.six"
                              maxlength="6"
                              auto-complete="off"
                              :placeholder="levelLists.six"
                            ></el-input>
                          </el-form-item>
                        </el-form>
                        <p class="level-tip">数字越大，段位越高</p>
                        <div slot="footer" class="dialog-footer">
                          <el-button @click="dialogLevel = false">取 消</el-button>
                          <el-button type="primary" @click="saveLevelName()">确 定</el-button>
                        </div>
                      </el-dialog>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="stepIndex==4" class="step-four">
          <div class="row">
            <p class="row-title">开启抽奖</p>
            <div class="row-content">
              <el-switch
                v-model="activityDetail.prizeInfo.isOpenPrize"
                active-color="#A4D3EE"
                inactive-color="#BFBFBF"
              ></el-switch>
            </div>
          </div>
          <div class="row" v-if="activityDetail.prizeInfo.isOpenPrize">
            <p class="row-title">奖品设置</p>
            <div class="row-content">
              <el-tabs @tab-click="changePrizeIndex">
                <el-tab-pane v-for="(item,i) in prizeBoxInfo" :key="i" :label="item.lottery_name"></el-tab-pane>
              </el-tabs>
              <!-- <ul>
                <li v-for="(item,i) in prizeBoxInfo" @click="getPrizeList(item.lottery_level)" :class="lotteryIndex==item.lottery_level?'active':''">{{prizeBoxInfo[i].lottery_name!=''?prizeBoxInfo[i].lottery_name:i==0?'铜宝箱':i==1?'银宝箱':i==2?'金宝箱':'幸运宝箱'}}</li>
              </ul>-->
              <div v-if="lotteryIndex==prize.lottery_level" v-for="(prize,i) in prizeBoxInfo" :key="i">
                <div class="prize-row">
                  <div class="prize-title">奖项状态</div>
                  <div class="prize-content">
                    <el-switch
                      v-model="prize.status"
                      active-color="#A4D3EE"
                      inactive-color="#BFBFBF"
                      active-text="显示"
                      inactive-text="隐藏"
                      @change="validataOpenPrize(i)"
                    ></el-switch>
                  </div>
                </div>
                <div class="prize-row">
                  <div class="prize-title">奖项名称</div>
                  <div class="prize-content">
                    <el-input
                      @blur="validateNull(prize.lottery_name)"
                      v-model="prize.lottery_name"
                      maxlength="8"
                      style="width:150px;"
                      size="small"
                    ></el-input>
                  </div>
                </div>
                <div class="prize-row">
                  <div class="prize-title">开启条件</div>
                  <div class="prize-content box-rule">
                    <el-radio v-model="prize.open_mode" label="km">
                      <span>知识币达到</span>
                      <el-input-number
                        size="small"
                        @blur="validateNull(prizeKm[i])"
                        v-model="prizeKm[i]"
                        controls-position="right"
                        :min="0"
                      ></el-input-number>个
                    </el-radio>
                    <el-radio v-model="prize.open_mode" label="pk">
                      <span>段位达到&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <el-select size="small" v-model="prizeLevelName[i]">
                        <el-option v-for="(item,index) in levelLists" :key="index" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-radio>
                  </div>
                </div>
                <div class="prize-list">
                  <div>
                    <p class="prize-title">奖品</p>
                    <div class="prize-content">
                      <p class="null-prize" v-if="prizeList.length==0">暂无奖品</p>
                      <table class="table" v-if="prizeList.length>0">
                        <thead>
                          <tr>
                            <th>奖品名称</th>
                            <th>图片</th>
                            <th>数量</th>
                            <th>中奖率（%）</th>
                            <th>每日抽取上限</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in prizeList" :key="index">
                            <td>{{item.prize_name}}</td>
                            <td>
                              <img :src="item.prize_image_url" alt>
                            </td>
                            <td>{{item.prize_count}}</td>
                            <td>{{item.prize_weights}}</td>
                            <td>{{item.prize_day_rule}}</td>
                            <td>
                              <span
                                class="table-btn"
                                @click="editPrize(item.prize_id,item.prize_name,item.prize_day_rule,item.prize_count,item.prize_weights,item.prize_image_url)"
                              >编辑</span>
                              <span class="table-btn" @click="deletePrize(item.prize_id)">删除</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p class="add-prize" @click="lotteryShowLay=true">+添加奖品</p>
                      <p class="prize-tip">抽奖会优先判断库存，库存为 0 的奖品不会被抽中</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="activityDetail.prizeInfo.isOpenPrize">
            <p class="row-title">奖品展示图片</p>
            <div class="row-content">
              <div class="placehold-wrapper">
                <div class="placehold placehold-bg">
                  <img ref="prizeBg" :src="prizeBg" alt>
                  <form>
                    <input
                      type="file"
                      accept="png/jpg"
                      @change="xmTanUploadImg($event,4)"
                      title="设置图片"
                    >
                  </form>
                </div>
                <div class="camera">
                  <i class="iconfont">&#xe64f;</i>
                </div>
              </div>
              <span @click="backDefault(2)" class="default">恢复默认</span>
              <a @click="downDefault($event,2)" target="_blank" class="picture">查看图片</a>
              <p class="rate">{{uploadStatus==1?'上传中...':''}}</p>
            </div>
          </div>
          <div class="row">
            <p class="row-title">排名奖励提示</p>
            <div class="row-content">
              <el-switch
                v-model="activityDetail.prizeInfo.isPrize"
                active-color="#A4D3EE"
                inactive-color="#BFBFBF"
              ></el-switch>
              <div class="prize-row" v-if="activityDetail.prizeInfo.isPrize">
                <p class="prize-title">奖励名次</p>
                <div class="prize-content">
                  前
                  <el-input-number
                    @blur="validateNull(activityDetail.prizeInfo.prizeCount)"
                    v-model="activityDetail.prizeInfo.prizeCount"
                    :min="0"
                  ></el-input-number>名
                </div>
              </div>
              <div class="prize-row" v-if="activityDetail.prizeInfo.isPrize">
                <p class="prize-title">提示文案</p>
                <div class="prize-content">
                  <el-input
                    @blur="validateNull(activityDetail.prizeInfo.wordTip)"
                    v-model="activityDetail.prizeInfo.wordTip"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="导入题库"
      :visible.sync="showUploadQues"
      class="upload-ques"
      @close="getQuesList(2)"
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
              <span class="upload-error">
                <a @click="download($event,4)">下载excel</a>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="upload-confirm add-ques-confirm" v-if="uploadQuesDown">
        <div>
          <span>题库名称</span>
          <el-input v-model="quesName"></el-input>
          <el-button type="primary" @click="editQuesName()">确定</el-button>
          <!-- <span @click="editQuesName()" class="confirm-ques">确定</span> -->
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="导入名单"
      :visible.sync="showUploadMember"
      class="upload-member"
      @close="getParticipantDetail(2)"
    >
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
              <span>新增</span>
              <span>{{participantExcel.insertNum}}</span>
            </p>
            <p>
              <span>更新</span>
              <span>{{participantExcel.updateNum}}</span>
            </p>
            <p v-if="participantExcel.uploadFail>0">
              <span>失败</span>
              <span>{{participantExcel.uploadFail}}</span>
              <span class="upload-error">
                <a @click="download($event,2)">下载excel</a>
              </span>
            </p>
          </div>
          <div class="excel-dept-detail" v-if="participantExcel.departmentCount">
            <p>部门明细</p>
            <ul>
              <li v-for="(value,key) in participantExcel.departmentCount" :key="key">
                <p>{{key}}</p>
                <p>{{value}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="upload-confirm">
        <el-button type="primary" @click="getParticipantDetail(2)">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="添加奖品"
      :visible.sync="lotteryShowLay"
      class="addprize"
      @close="cancelPrizeEdit()"
    >
      <div class="add-prize-mainer">
        <div class="add-row">
          <p class="add-title">名称</p>
          <div class="add-content">
            <el-input v-model="addPrize.prizeName"></el-input>
          </div>
        </div>
        <div class="add-row add-prize-img">
          <p class="add-title">奖品展示图片</p>
          <div class="add-content">
            <div class="placehold-wrapper">
              <div :class="addPriImg!=''?'placehold':'placehold placehold-bg'">
                <img ref="addPriImg" :src="addPriImg" alt>
                <form>
                  <input
                    class="upload-prizeimg"
                    type="file"
                    accept="png/jpg"
                    @change="xmTanUploadImg($event,5)"
                    title="设置图片"
                  >
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="add-row">
          <div class="add-title">数量</div>
          <div class="add-content">
            <span></span>
            <div>
              <el-input-number
                size="small"
                v-model="addPrize.prizeMount"
                controls-position="right"
                :min="0"
              ></el-input-number>
              <p class="unit">个</p>
            </div>
          </div>
        </div>
        <div class="add-row">
          <div class="add-title">中奖率</div>
          <div class="add-content">
            <span></span>
            <div>
              <el-input-number
                size="small"
                v-model="addPrize.prizePercent"
                controls-position="right"
                :min="0"
              ></el-input-number>
              <p class="unit">%</p>
            </div>
          </div>
        </div>
        <div class="add-row">
          <div class="add-title">每日抽取上限数</div>
          <div class="add-content">
            <span></span>
            <div>
              <el-input-number
                size="small"
                v-model="addPrize.prizeMost"
                controls-position="right"
                :min="0"
              ></el-input-number>
              <p class="unit">个</p>
            </div>
          </div>
        </div>
      </div>
      <div class="add-prize-btns">
        <el-button type="text" @click="cancelPrizeEdit()" class="cancel-btn">取消</el-button>
        <el-button type="primary" @click="savePrize()">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑题目" :visible.sync="showQuesDesc" class="edit-ques">
      <el-form ref="quesDesc" :model="quesDesc" label-width="110px">
        <el-form-item label="题目标题">
          <el-input type="textarea" v-model="quesDesc.question_title"></el-input>
        </el-form-item>
        <el-form-item label="英文版题目标题" v-if="quesDescType==1">
          <el-input type="textarea" v-model="quesDesc.en_question_title"></el-input>
        </el-form-item>
        <el-form-item label="选项A">
          <el-input v-model="quesDesc.option_a"></el-input>
        </el-form-item>
        <el-form-item label="英文版选项A" v-if="quesDescType==1">
          <el-input type="textarea" v-model="quesDesc.en_option_a"></el-input>
        </el-form-item>
        <el-form-item label="选项B">
          <el-input v-model="quesDesc.option_b"></el-input>
        </el-form-item>
        <el-form-item label="英文版选项B" v-if="quesDescType==1">
          <el-input type="textarea" v-model="quesDesc.en_option_b"></el-input>
        </el-form-item>
        <el-form-item label="选项C">
          <el-input v-model="quesDesc.option_c"></el-input>
        </el-form-item>
        <el-form-item label="英文版选项C" v-if="quesDescType==1">
          <el-input type="textarea" v-model="quesDesc.en_option_c"></el-input>
        </el-form-item>
        <el-form-item label="选项D">
          <el-input v-model="quesDesc.option_d"></el-input>
        </el-form-item>
        <el-form-item label="英文版选项D" v-if="quesDescType==1">
          <el-input type="textarea" v-model="quesDesc.en_option_d"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-checkbox-group v-model="quesDescAnswer">
            <el-checkbox
              v-for="option in quesOptions"
              :label="option"
              :key="option"
              border
              size="medium"
            >{{option}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="showQuesDesc=false">取消</el-button>
          <el-button type="primary" @click="saveQuesEdit()">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title
      :visible.sync="showPreview"
      class="preview"
      :close-on-click-modal="false"
      @close="goHome()"
    >
      <div class="preview-config">
        <p class="preview-succ">
          <span>
            <i class="iconfont">&#xe655;</i>
          </span>
          <span>发布成功</span>
        </p>
        <div>
          <p>活动发布成功，可前往钉钉移动端 叮当答题 应用，查看/参与答题</p>
        </div>
        <div>
          <el-button type="primary" @click="viewConfigDetail()">查看活动配置</el-button>
          <el-button plain @click="goHome()">返回首页</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import topbar from "../components/topbar.vue";
const options = ["A", "B", "C", "D"];
export default {
  name: "Gamecenter",
  data() {
    return {
      activeName: 1,
      homebgcolor: "#FFE2E4", //主题背景色
      dialogLevel: false, //pk段位编辑
      levelLists: {
        //段位等级
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",
        six: ""
      },
      levelListsArr: [],
      slotIndex: false, //详情折叠
      uploadStatus: 0, //上传进度
      prizeId: 0,
      stepIndex: 0,
      quesIndex: 0,
      activityId: "",
      showPreview: false,
      dialogFormVisible: false,
      form: {
        name: "",
        phone: "",
        dept: "",
        userid: 0
      },
      searchtext: "", //人员关键词搜索
      searchtextques: "", //题目关键词搜索
      categoryIdNow: 0, //当前搜索题库id
      showUploadMember: false, //上传文件弹窗
      showUploadQues: false, //上传文件弹窗
      uploadMemberDown: false, //上传完成
      uploadQuesDown: false,
      searchBarFixed: false,
      quesExcel: {}, //题库信息
      showQuesList: false,
      memberTableData: {
        data: [],
        page: 1,
        page_size: 10,
        total: 0,
        total_page: 1
      },
      quesTableData: {
        data: [],
        page: 1,
        page_size: 10,
        total: 0,
        total_page: 1
      },
      categoryId: 0, //题库id
      activityDetail: {
        //活动配置信息
        basicConfig: {
          isEng: false, //支持英文版
          message: "团队积分排行榜",
          title: "", //活动标题
          startDate: "",
          endDate: "",
          startTime: "",
          top_background_color: "",
          endTime: "",
          datetime: [], //活动时间
          is_weekend_limit: false,
          is_jobtime_limit: false, //是否参与限制时间
          uptime: ["09:00", "12:00"], //参与限制时间1
          downtime: ["14:00", "18:30"], //参与限制时间2
          regulation: "", //活动规则
          sponsor_corp: "", //底部文案
          home_background: this.$store.state.homeBg,
          top_banner: "",
          count_down_background: this.$store.state.countDownBg,
          mark_background: this.$store.state.flauntBg
        }, //基础配置
        participantInfo: {
          isRank: false,
          entry: "4", //4 钉钉
          origin: "4" //4 全员  1导入名单
        }, //参与人员
        questionInfo: {}, //答题及题库
        //答题题库
        questionList: [],
        prizeInfo: {
          isPrize: false, //开启排名奖励
          wordTip: "排行前100名还可获得额外奖励！", //提示文案
          prizeCount: 100,
          isOpenPrize: false //是否开启抽奖
        } //奖品抽奖
      },
      isOpenQues: false, //展开题目
      mustQues: [
        {
          type: [],
          tabName: "关卡一",
          must_category_ids: "",
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: "",
        }
      ],
      mustQuesList: [
        {
          type: [],
          tabName: "关卡一",
          must_blockade_name: "第一关",
          en_must_blockade_name: "The First Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: "",
        },
        {
          type: [],
          tabName: "关卡二",
          must_blockade_name: "第二关",
          en_must_blockade_name: "The Second Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode: 0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡三",
          must_blockade_name: "第三关",
          en_must_blockade_name: "The Third Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡四",
          must_blockade_name: "第四关",
          en_must_blockade_name: "The Fourth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡五",
          must_blockade_name: "第五关",
          en_must_blockade_name: "The Fifth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡六",
          must_blockade_name: "第六关",
          en_must_blockade_name: "The Sixth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡七",
          must_blockade_name: "第七关",
          en_must_blockade_name: "The Seventh Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡八",
          must_blockade_name: "第八关",
          en_must_blockade_name: "The Eigth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡九",
          must_blockade_name: "第九关",
          en_must_blockade_name: "The Ninth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡十",
          must_blockade_name: "第十关",
          en_must_blockade_name: "The Tenth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡十一",
          must_blockade_name: "第十一关",
          en_must_blockade_name: "The Tenth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡十二",
          must_blockade_name: "第十二关",
          en_must_blockade_name: "The Tenth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡十三",
          must_blockade_name: "第十三关",
          en_must_blockade_name: "The Tenth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡十四",
          must_blockade_name: "第十四关",
          en_must_blockade_name: "The Tenth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡十五",
          must_blockade_name: "第十五关",
          en_must_blockade_name: "The Tenth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡十六",
          must_blockade_name: "第十六关",
          en_must_blockade_name: "The Tenth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡十七",
          must_blockade_name: "第十七关",
          en_must_blockade_name: "The Tenth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡十八",
          must_blockade_name: "第十八关",
          en_must_blockade_name: "The Tenth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡十九",
          must_blockade_name: "第十九关",
          en_must_blockade_name: "The Tenth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        },
        {
          type: [],
          tabName: "关卡二十",
          must_blockade_name: "第二十关",
          en_must_blockade_name: "The Tenth Pass",
          must_category_ids: "",
          checktype:1,
          must_question_num: 5, //必答题目总数
          must_answer_wrong_num: 2, //必答可错题数
          must_answer_count_down: 10,
          must_answer_success_km: 10, //必答奖励
          get_question_mode:0,
          startDate: ""
        }
      ],
      mustQuesTypeNow: [],
      answerQues: {
        type: [],
        answerQuesCount: 5, //必答题目总数
        answerQuesError: 2, //必答可错题数
        answerQuesTime: 10,
        answerGoldValue: 100, //必答奖励
        quesOrder: 1,
        answerNumLimit: 1
      },
      pkQues: {
        type: [],
        pkQuesCount: 5, //pk题目总数
        needGoldValue: "10/20/50", //可投入知识币
        pkDoubleScore: true,
        km: 10
      },
      quesName: "", //题库名
      quesExcelFile: {}, //题库表格
      prizeBg: "",
      addPriImg: "",
      addPrize: {
        prizeName: "",
        prizeMount: 0,
        prizePercent: 0,
        prizeMost: 0,
        prizeRank: "1",
        prizeUrl: ""
      },
      env: "", //环境
      lotteryIndex: 1, //当前选择宝箱等级
      lotteryShowLay: false, //抽奖弹层
      prizeList: [],
      publishMsg: {},
      quesDesc: {
        question_title: "",
        en_question_title: "",
        option_a: "",
        en_option_a: "",
        option_b: "",
        en_option_b: "",
        option_c: "",
        en_option_c: "",
        option_d: "",
        en_option_d: ""
      },
      quesDescType: 2,
      quesDescAnswer: [],
      quesOptions: options,
      showQuesDesc: false,
      prizeBoxInfo: [], //宝箱信息
      prizeLevelName: ["", "", "", ""],
      prizeKm: [200, 300, 400, 500],
      uploadFile: {},
      checkpoint: 1, //关卡数量
      checktype:'',
      checkpointName: [
        "关卡一",
        "关卡二",
        "关卡三",
        "关卡四",
        "关卡五",
        "关卡六",
        "关卡七",
        "关卡八",
        "关卡九",
        "关卡十",
        "关卡十一",
        "关卡十二",
        "关卡十三",
        "关卡十四",
        "关卡十五",
        "关卡十六",
        "关卡十七",
        "关卡十八",
        "关卡十九",
        "关卡二十"
      ],
      checkpointIndex: "关卡一",
      checkpointTab: 0,
      checkpointInfo: [
        {
          tabName: "关卡一",
          must_answer_count_down: 10,
          must_answer_success_km: 10,
          must_answer_wrong_num: 2,
          must_blockade_name: "第一关",
          en_must_blockade_name: "The First Pass",
          must_category_ids: "",
          must_question_num: 5,
          get_question_mode:0,
          startDate: ""
        }
      ]
    };
  },
  beforeCreate() {},
  created() {
    this.$data.env = localStorage.getItem("env");
  },
  computed: {
    userdata() {
      return this.$store.state.userdata;
    },
    corpId() {
      return this.$store.state.corpId;
    },
    activitydata() {
      return this.$store.state.activitydata;
    },
    shortName() {
      let showName = this.$store.state.userdata.name || "";
      let arr = [];
      let _isEnglish =
        showName.match(/^([a-zA-Z]|\s|,|\.)+$/) !== null ? true : false;

      if (_isEnglish) {
        // 英文名字
        //将“,.”转为空格 & 将连续空格转换为单个空格
        showName = showName.replace(/,|\./g, " ").replace(/\s+/g, " ");
        arr = showName.split(" ");
        if (arr.length === 1) {
          return showName.slice(0, 2);
        }
        return arr[0].slice(0, 1) + arr[1].slice(0, 1);
      }
      // 中文名字 - 取后两位
      return showName.replace(/,|\.|\s+/g, "").slice(-2);
    }
  },
  components: {
    topbar
  },
  mounted() {
    this.$store.state.corpId = this.$route.query.corp_id;
    //滚动元素吸顶事件
    var nav = $(".config-top");
    var temp = $(".template");
    var win = $(window);
    var sc = $(document);
    win.scroll(() => {
      if (sc.scrollTop() >= 126) {
        this.searchBarFixed = true;
      } else {
        this.searchBarFixed = false;
      }
    });
    this.getActDetail();
  },
  methods: {
    skinChange(value){
      switch (value) {
        case "pink":
          this.activityDetail.basicConfig.top_banner = "https://kuyi.shengws.com/activity/banner.png"
          this.homebgcolor = "#FFE2E4"
          break
        case "blue":
          this.activityDetail.basicConfig.top_banner = "https://kuyi.shengws.com/activity/blue/banner.jpg"
          this.homebgcolor = "#3757e7"
          break
        case "purple":
          this.activityDetail.basicConfig.top_banner = "https://kuyi.shengws.com/activity/purple/banner.jpg"
          this.homebgcolor = "#34007e"
          break
        case "yellow":
          this.activityDetail.basicConfig.top_banner = "https://kuyi.shengws.com/activity/yellow/banner.jpg"
          this.homebgcolor = "#ffd452"
          break
        case "red":
          this.activityDetail.basicConfig.top_banner = "https://kuyi.shengws.com/activity/red/banner.jpg"
          this.homebgcolor = "#b82e23"
          break
        default:
          this.activityDetail.basicConfig.top_banner = "https://kuyi.shengws.com/activity/banner.png"
          this.homebgcolor = "#242f55"
          break
      }
        
    },
    //获取活动初始配置
    getActDetail() {
      this.$ajax
        .post("/manage/brainstorming/activity/add", {
          activity_id: this.$route.query.activity_id,
          corp_id: this.corpId,
          app_id: 1
        })
        .then(response => {
          if (response.data.error == 0) {
            this.$store.commit("setState", {
              // 保存用户状态
              activitydata: response.data.data
            });
      
            this.activityId = this.activitydata.activity_id;
            this.activityDetail.basicConfig.title = this.activitydata.baseInfo.title;
            this.activityDetail.basicConfig.regulation = this.activitydata.baseInfo.regulation;
            this.activityDetail.basicConfig.is_jobtime_limit = Boolean(
              this.activitydata.baseInfo.is_jobtime_limit
            );
            this.activityDetail.basicConfig.is_weekend_limit = !Boolean(
              this.activitydata.baseInfo.is_weekend_limit
            );
            this.activityDetail.basicConfig.sponsor_corp = this.activitydata.baseInfo.sponsor_corp;
            this.activityDetail.basicConfig.home_background = this.activitydata.baseInfo.home_background;
            this.activityDetail.basicConfig.top_banner = this.activitydata.baseInfo.top_banner;
            this.activityDetail.basicConfig.count_down_background = this.activitydata.baseInfo.count_down_background;
            this.activityDetail.basicConfig.startDate = window.fecha.format(
              new Date(this.activitydata.baseInfo.start_time),
              "YYYY-MM-DD"
            );
            this.activityDetail.basicConfig.startTime = window.fecha.format(
              new Date(this.activitydata.baseInfo.start_time),
              "HH:mm"
            );
            this.activityDetail.basicConfig.endDate = window.fecha.format(
              new Date(this.activitydata.baseInfo.end_time),
              "YYYY-MM-DD"
            );
            this.activityDetail.basicConfig.endTime = window.fecha.format(
              new Date(this.activitydata.baseInfo.end_time),
              "HH:mm"
            );
            this.activityDetail.prizeInfo.isOpenPrize = Boolean(
              this.activitydata.baseInfo.is_open_prize
            );

            this.activityDetail.basicConfig.top_background_color = "pink";
            this.homebgcolor = "#FFE2E4";
            if( this.activitydata.baseInfo.top_background_color == "purple"){
              this.activityDetail.basicConfig.top_background_color = "purple";
              this.homebgcolor = "#34007e";
            }
            if( this.activitydata.baseInfo.top_background_color == "red"){
              this.activityDetail.basicConfig.top_background_color = "red";
              this.homebgcolor = "#b82e23";
            }
            if( this.activitydata.baseInfo.top_background_color == "yellow"){
              this.activityDetail.basicConfig.top_background_color = "yellow";
              this.homebgcolor = "#ffd452";
            }
            if( this.activitydata.baseInfo.top_background_color == "blue"){
              this.activityDetail.basicConfig.top_background_color = "blue";
              this.homebgcolor = "#3757e7";
            }
            
            this.activityDetail.prizeInfo.isPrize = Boolean(
              this.activitydata.baseInfo.extend_configs.top_prize_open
            );
            this.activityDetail.prizeInfo.wordTip = this.activitydata.baseInfo.extend_configs.top_prize_text;
            this.activityDetail.prizeInfo.prizeCount = this.activitydata.baseInfo.extend_configs.top_prize_num;
           
            this.mustQues = this.activitydata.baseInfo.extend_configs.must_blockade;
            this.mustQues.forEach(item => {
              item.type = item.must_category_ids.split(",");
            });
            for (var i = 0; i < this.mustQues.length; i++) {
              this.mustQuesList[i] = this.mustQues[i];
            }
            for (var i=0;i < this.mustQuesList.length;i++){
               this.$set(this.mustQuesList[i],"startDate", new Date(this.activityDetail.basicConfig.startDate + ' ' + this.activityDetail.basicConfig.startTime))
            }
            this.checkpoint = this.mustQues.length;
            this.mustQuesTypeNow = this.mustQuesList[0].type;
            this.answerQues.answerQuesCount = this.activitydata.baseInfo.extend_configs.blockade_question_num;
            this.answerQues.answerQuesError = this.activitydata.baseInfo.extend_configs.blockade_answer_wrong_num;
            this.answerQues.answerGoldValue = this.activitydata.baseInfo.extend_configs.blockade_answer_success_km;
            this.answerQues.type = this.activitydata.baseInfo.extend_configs.blockade_category_ids.split(
              ","
            );
            this.answerQues.quesOrder = this.activitydata.baseInfo.get_question_mode;
            this.pkQues.pkQuesCount = this.activitydata.baseInfo.extend_configs.pk_question_num;
            this.pkQues.pkDoubleScore = Boolean(
              this.activitydata.baseInfo.extend_configs.pk_last_double
            );
            this.pkQues.needGoldValue = this.activitydata.baseInfo.extend_configs.pk_kms;
            this.pkQues.type = this.activitydata.baseInfo.extend_configs.pk_category_ids.split(
              ","
            );
            this.prizeBg = this.activitydata.baseInfo.prize_banner;
            this.activityDetail.participantInfo.isRank = Boolean(
              this.activitydata.baseInfo.open_department_top
            );
            if (this.activitydata.baseInfo.client_type == "wechat") {
              this.activityDetail.participantInfo.entry = "4";
            }
            if (this.activitydata.baseInfo.auth_type == "wechat_add") {
              this.activityDetail.participantInfo.origin = "4";
            } else {
              this.activityDetail.participantInfo.origin = "1";
            }
            console.log("participantInfo",this.activityDetail.participantInfo)
            this.getQuesList(1);
            this.stepIndex = 1;
            for (var key in JSON.parse(
              this.activitydata.baseInfo.level_star_config
            )) {
              this.levelListsArr.push(
                JSON.parse(this.activitydata.baseInfo.level_star_config)[key]
                  .name
              );
            }
            this.levelLists.one = this.levelListsArr[0];
            this.levelLists.two = this.levelListsArr[1];
            this.levelLists.three = this.levelListsArr[2];
            this.levelLists.four = this.levelListsArr[3];
            this.levelLists.five = this.levelListsArr[4];
            this.levelLists.six = this.levelListsArr[5];
            this.homebgcolor = this.activitydata.baseInfo.top_background_color;
            this.getPrizeInfo();
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    },
    //获取宝箱初始配置
    getPrizeInfo() {
      this.$ajax
        .post("/manage/brainstorming/prize/lottery/open", {
          activity_id: this.activityId,
          corp_id: this.corpId
        })
        .then(response => {
          let res = response.data.data;
          if (response.data.error == 0) {
            res.forEach((item, index) => {
              item.status = Boolean(item.status);
              if (item.open_mode == "km") {
                this.prizeLevelName[index] = this.levelListsArr[0];
                this.prizeKm[index] = item.open_rule;
                console.log("km", this.prizeKm[index]);
              } else if (item.open_mode == "pk") {
                this.prizeLevelName[index] = this.levelListsArr[
                  item.open_rule - 1
                ];
              }
            });
            console.log("km", this.prizeKm);
            this.prizeBoxInfo = res;
            console.log("prizebox", this.prizeBoxInfo);
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    },
    validateNull(str) {
      if (!str) {
        if (str === 0) {
        } else {
          this.$message("不可为空");
          return;
        }
      }
    },
    //监控宝箱是否添加奖品
    validataOpenPrize(index) {
      if (this.prizeBoxInfo[index].status == true) {
        if (this.prizeList.length == 0) {
          this.$confirm(
            "奖项中暂无奖品，请至少添加一个奖品后再将奖项设置为显示状态。",
            "提示",
            {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "warning"
            }
          )
            .then(() => {
              this.prizeBoxInfo[index].status = false;
            })
            .catch(() => {
              this.prizeBoxInfo[index].status = false;
            });
        }
      }
    },
    //自定义主题色
    printColor(el) {
      this.homebgcolor = el;
    },
    //查看原图
    downDefault(el, index) {
      if (index == 1) {
        el.target.href = this.activityDetail.basicConfig.top_banner;
      } else if (index == 2) {
        el.target.href = this.prizeBg;
      }
    },
    // 闯关开始时间选择
    chooseCustomsDate(el,index){
      if(new Date(el).getTime() < new Date( this.activityDetail.basicConfig.startDate + ' ' + this.activityDetail.basicConfig.startTime ).getTime() || new Date(el).getTime() > new Date( this.activityDetail.basicConfig.endDate + ' '+this.activityDetail.basicConfig.endTime).getTime()){
        this.$confirm("您的闯关开始时间必须在活动时间范围内", "提示", {
                  confirmButtonText: "确定",
                  showCancelButton: false,
                  type: "warning"
                })
                  .then(() => {})
                  .catch(() => {});
      }
      for (let j = 0; j < index; j++) {
        if (new Date(el).getTime() < new Date(this.mustQuesList[j].startDate).getTime()){
           this.$confirm("您当前闯关开始时间必须大于"+this.mustQuesList[j].must_blockade_name+"的时间", "提示", {
                  confirmButtonText: "确定",
                  showCancelButton: false,
                  type: "warning"
                })
                  .then(() => {})
                  .catch(() => {});
        }
        
      }
    },
    // 开始时间选择
    chooseEndDate(el) {
      if (
        new Date(el).getTime() > new Date(this.userdata.vip_end_time).getTime()
      ) {
        this.$confirm("您的活动时间不能在您的会员期限之后", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        })
          .then(() => {})
          .catch(() => {});
      }
    },
    //结束时间选择
    chooseEndTime(el, index) {
      if (index == 1) {
        if (
          new Date(
            this.activityDetail.basicConfig.startDate 
          ).getTime() > new Date(this.userdata.vip_end_time).getTime()
        ) {
          this.$confirm("您的活动时间不能在您的会员期限之后", "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          })
            .then(() => {})
            .catch(() => {});
        }
      } else if (index == 2) {
        if (
          new Date(
            this.activityDetail.basicConfig.endDate + " " + el
          ).getTime() > new Date(this.userdata.vip_end_time).getTime()
        ) {
          this.$confirm("您的活动时间不能在您的会员期限之后", "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          })
            .then(() => {})
            .catch(() => {});
        }
      }
    },
    //返回首页
    goHome(index) {
      window.location.href = window.location.origin + "/manage";
    },
    //背景图片设置
    bgstyle(bg) {
      return {
        backgroundSize: "cover",
        backgroundOrigin: "content-box",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
      };
    },
    formatDate: function (dataStr) {  //这里的 value 就是需要过滤的数据
      var time = new Date(dataStr);
      function timeAdd0(str) {
        if (str < 10) {
          str = '0' + str;
        }
        return str
      }
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) ;
    },
    //活动配置发布
    publish() {
      if (this.activityDetail.basicConfig.startTime == null) {
        this.$confirm("您的活动开始时间不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        })
          .then(() => {})
          .catch(() => {});
        return;
      } else if (this.activityDetail.basicConfig.endTime == null) {
        this.$confirm("您的活动结束时间不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      let jobTime = "";
      if (
        this.activityDetail.basicConfig.uptime == null &&
        this.activityDetail.basicConfig.downtime != null
      ) {
        jobTime =
          '{"jobtime2":{"start_time":"' +
          this.activityDetail.basicConfig.downtime[0] +
          '","end_time":"' +
          this.activityDetail.basicConfig.downtime[1] +
          '"}}';
      } else if (
        this.activityDetail.basicConfig.downtime == null &&
        this.activityDetail.basicConfig.uptime != null
      ) {
        jobTime =
          '{"jobtime1":{"start_time":"' +
          this.activityDetail.basicConfig.uptime[0] +
          '","end_time":"' +
          this.activityDetail.basicConfig.uptime[1] +
          '"}}';
      } else if (
        this.activityDetail.basicConfig.downtime == null &&
        this.activityDetail.basicConfig.uptime == null
      ) {
        jobTime = "";
      } else {
        jobTime =
          '{"jobtime1":{"start_time":"' +
          this.activityDetail.basicConfig.uptime[0] +
          '","end_time":"' +
          this.activityDetail.basicConfig.uptime[1] +
          '"},"jobtime2":{"start_time":"' +
          this.activityDetail.basicConfig.downtime[0] +
          '","end_time":"' +
          this.activityDetail.basicConfig.downtime[1] +
          '"}}';
      }
      let box_config = {};
      this.prizeBoxInfo.forEach((item, index) => {
        var open_rule = [];
        if (item.open_mode == "km") {
          open_rule[index] = this.prizeKm[index];
          console.log(index, open_rule[index]);
        } else if (item.open_mode == "pk") {
          this.levelListsArr.forEach((li, i) => {
            if (li == this.prizeLevelName[index]) {
              open_rule[index] = i + 1;
            }
          });
        }
        box_config[item.lottery_level] = {
          lottery_name: item.lottery_name,
          status: Number(item.status),
          open_mode: item.open_mode,
          open_rule: open_rule[index]
        };
      });
      console.log("box_config", box_config);
      let sendMustQues = [];
      for (var i = 0; i < this.checkpoint; i++) {
        let obj = {
          must_answer_count_down: this.mustQuesList[i].must_answer_count_down,    // 答题时间
          must_answer_success_km: this.mustQuesList[i].must_answer_success_km,    // 通过奖励
          must_answer_wrong_num: this.mustQuesList[i].must_answer_wrong_num,      // 可错题数
          must_blockade_name: this.mustQuesList[i].must_blockade_name,            // 关卡名称
          en_must_blockade_name: this.mustQuesList[i].en_must_blockade_name,      // 英文名称
          checktype: this.mustQuesList[i].checktype,
          must_question_num: this.mustQuesList[i].must_question_num,              // 题目数量
          must_category_ids: String(this.mustQuesList[i].type),                    // 题库
          get_question_mode: this.mustQuesList[i].get_question_mode,
          startDate: this.formatDate(this.mustQuesList[i].startDate)
        };
        sendMustQues.push(obj);
      }
      console.log("sendMustQues", sendMustQues);
      let authType = "wechat_add";
      if (this.activityDetail.participantInfo.origin == "1") {
        authType = "wechat";
      } else {
        authType = "wechat_add";
      }
      let sendData = {
        activity_id: this.activityId,
        app_id: this.$route.query.app_id,
        corp_id: this.corpId,
        title: this.activityDetail.basicConfig.title,
        activity_notice: this.activityDetail.basicConfig.message,
        regulation: this.activityDetail.basicConfig.regulation,
        is_jobtime_limit: Number(
          this.activityDetail.basicConfig.is_jobtime_limit
        ),
        is_weekend_limit: Number(
          !this.activityDetail.basicConfig.is_weekend_limit
        ),
        jobtimes: jobTime,
        start_time:
          this.activityDetail.basicConfig.startDate +
          " " +
          this.activityDetail.basicConfig.startTime,
        end_time:
          this.activityDetail.basicConfig.endDate +
          " " +
          this.activityDetail.basicConfig.endTime,
        auth_type: authType,
        client_type: "wechat",
        top_banner: this.activityDetail.basicConfig.top_banner,
        home_background: this.activityDetail.basicConfig.home_background,
        mark_background: this.activityDetail.basicConfig.mark_background,
        count_down_background: this.activityDetail.basicConfig
          .count_down_background,
        sponsor_corp: this.activityDetail.basicConfig.sponsor_corp,
        share_image: "",
        share_home_title: "",
        share_home_desc: "",
        share_pk_title: "",
        share_pk_desc: "",
        prize_banner: this.prizeBg,
        copper_box_km: 0,
        silver_box_km: 0,
        gold_box_km: 0,
        pk_km: this.pkQues.km,
        is_open_prize: Number(this.activityDetail.prizeInfo.isOpenPrize),
        open_department_top: Number(this.activityDetail.participantInfo.isRank),
        must_blockade: sendMustQues,
        blockade_question_num: this.answerQues.answerQuesCount,
        blockade_answer_wrong_num: this.answerQues.answerQuesError,
        blockade_everyday_limit: this.answerQues.answerNumLimit,
        blockade_answer_success_km: this.answerQues.answerGoldValue,
        blockade_category_ids: String(this.answerQues.type),
        pk_question_num: this.pkQues.pkQuesCount,
        pk_last_double: Number(this.pkQues.pkDoubleScore),
        pk_kms: this.pkQues.needGoldValue,
        pk_category_ids: String(this.pkQues.type),
        top_prize_open: Number(this.activityDetail.prizeInfo.isPrize),
        top_prize_text: this.activityDetail.prizeInfo.wordTip,
        top_prize_num: this.activityDetail.prizeInfo.prizeCount,
        must_answer_count_down: this.mustQues.mustQuesTime,
        blockade_answer_count_down: this.answerQues.answerQuesTime,
        get_question_mode: this.answerQues.quesOrder,
        top_background_color: this.activityDetail.basicConfig.top_background_color,
        box_config: box_config
      };

      this.$ajax
        .post("/manage/brainstorming/activity/save", sendData)
        .then(response => {
          if (response.data.error == 0) {
            this.showPreview = true;
            this.publishMsg = response.data.data;
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    },
    //预览详情
    viewConfigDetail() {
      let index = 2;
      this.$router.push({
        path: "/Gamemove",
        query: {
          activity_id: this.activityId,
          corp_id: this.corpId,
          app_id: this.$route.query.app_id,
          index: index
        }
      });
    },
    //上传图片
    xmTanUploadImg(el, index) {
      this.uploadStatus = 1;
      let formData = new FormData();
      formData.append("file", el.target.files[0]);
      this.$ajax
        .post("/manage/brainstorming/upload", formData)
        .then(response => {
          if (response.data.error == 0) {
            this.uploadStatus = 0;
            if (index == 0) {
              this.activityDetail.basicConfig.top_banner =
                response.data.data.url;
            }
            if (index == 4) {
              this.prizeBg = response.data.data.url;
            }
            if (index == 5) {
              this.addPriImg = response.data.data.url;
            }
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    },
    //恢复默认
    backDefault(index) {
      if (index == 1) {
        this.activityDetail.basicConfig.top_banner = this.$store.state.topImg;
      } else if (index == 2) {
        this.prizeBg = this.$store.state.prizeBg;
      }
    },
    //下载模板
    download(el, index) {
      if (index == 1) {
        el.target.href =
          window.location.origin +
          "/manage/brainstorming/model/download?type=user";
      } else if (index == 2) {
        el.target.href =
          window.location.origin +
          "/manage/brainstorming/upload/fail?activity_id=" +
          this.activityId +
          "&corp_id=" +
          this.corpId +
          "&type=user";
      } else if (index == 3) {
        el.target.href =
          window.location.origin +
          "/manage/brainstorming/model/download?type=question";
      } else if (index == 4) {
        el.target.href =
          window.location.origin +
          "/manage/brainstorming/upload/fail?activity_id=" +
          this.activityId +
          "&corp_id=" +
          this.corpId +
          "&type=question";
      }
    },
    //上传文件
    uploadExcel(el, index) {
      if (index == 1) {
        if (el.target.files[0]) {
          this.showUploadMember = true;
          this.uploadMemberDown = false;
          let formData = new FormData();
          formData.append("activity_id", this.activityId);
          formData.append("corp_id", this.corpId);
          formData.append("user", el.target.files[0]);
          this.$ajax
            .post("/manage/brainstorming/user/upload", formData)
            .then(response => {
              if (response.data.error == 0) {
                this.uploadMemberDown = true;
                this.participantExcel = response.data.data;
              } else {
                this.showUploadMember = false;
                this.uploadMemberDown = false;
                this.$alert(response.data.message, "导入错误", {
                  confirmButtonText: "确定"
                });
              }
            })
            .catch(error => {});
        }
      } else if (index == 2) {
        if (el.target.files[0]) {
          this.quesExcelFile = el.target.files[0];
          this.showUploadQues = true;
          this.uploadQuesDown = false;
          let formData = new FormData();
          formData.append("activity_id", this.activityId);
          formData.append("corp_id", this.corpId);
          formData.append("question", el.target.files[0]);
          formData.append(
            "category_name",
            el.target.files[0].name.split(".")[0]
          );
          this.quesName = el.target.files[0].name.split(".")[0];
          this.$ajax
            .post("/manage/brainstorming/question/upload", formData)
            .then(response => {
              if (response.data.error == 0) {
                this.uploadQuesDown = true;
                this.quesExcel = response.data.data;
                this.categoryId = this.quesExcel.category_id;
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
    //pk段位编辑保存
    saveLevelName() {
      this.$ajax
        .post("/manage/brainstorming/activity/level/modify", {
          activity_id: this.activityId,
          level_one: this.levelLists.one,
          level_two: this.levelLists.two,
          level_three: this.levelLists.three,
          level_four: this.levelLists.four,
          level_five: this.levelLists.five,
          level_six: this.levelLists.six
        })
        .then(response => {
          if (response.data.error == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.levelListsArr[0] = this.levelLists.one;
            this.levelListsArr[1] = this.levelLists.two;
            this.levelListsArr[2] = this.levelLists.three;
            this.levelListsArr[3] = this.levelLists.four;
            this.levelListsArr[4] = this.levelLists.five;
            this.levelListsArr[5] = this.levelLists.six;
            this.dialogLevel = false;
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    },
    getParticipantDetail(index, isfirst) {
      this.uploadStatus = 0;
      if (isfirst) {
        this.memberTableData.page = 1;
      }
      this.showUploadMember = false;
      this.stepIndex = 2;
      if (index == 2) {
        this.$refs.participantName.value = "";
      }
      this.$ajax
        .get(
          "/manage/brainstorming/user/list?corp_id=" +
            this.corpId +
            "&activity_id=" +
            this.activityId +
            "&page=" +
            this.memberTableData.page +
            "&page_size=" +
            Number(this.memberTableData.page_size) +
            "&keyword=" +
            this.searchtext
        )
        .then(response => {
          if (response.data.error == 0) {
            this.memberTableData = response.data.data;
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    },
    //获取题库表详情
    getQuesList(index) {
      this.uploadStatus = 0;
      this.showUploadQues = false;
      this.stepIndex = 3;
      if (index == 2) {
        this.$refs.questionName.value = "";
      }
      this.$ajax
        .get(
          "/manage/brainstorming/question/category/list?corp_id=" +
            this.corpId +
            "&activity_id=" +
            this.activityId
        )
        .then(response => {
          if (response.data.error == 0) {
            this.activityDetail.questionList = response.data.data;
            this.activityDetail.questionList.forEach(item => {
              item.isSlot = false;
            });
            if (this.activityDetail.questionList.length == 1) {
              this.answerQues.type[0] = String(
                this.activityDetail.questionList[0].category_id
              );
              this.pkQues.type[0] = String(
                this.activityDetail.questionList[0].category_id
              );
              this.mustQuesList.forEach(item => {
                item.type[0] = String(
                  this.activityDetail.questionList[0].category_id
                );
              });
            }
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    },
    //修改题库名
    editQuesName() {
      if (this.quesExcelFile.name.split(".")[0] == this.quesName) {
        this.getQuesList(2);
      } else {
        this.$ajax
          .post("/manage/brainstorming/question/category/modify", {
            activity_id: this.activityId,
            corp_id: this.corpId,
            category_id: this.categoryId,
            category_name: this.quesName
          })
          .then(response => {
            if (response.data.error == 0) {
              this.getQuesList(2);
            } else {
              this.$message(response.data.message);
            }
          })
          .catch(error => {});
      }
    },
    //删除题库
    deleteQuesList(categoryId, categoryName) {
      this.$confirm(
        "确认删除 " + "“" + categoryName + "”" + " 题库吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }
      )
        .then(() => {
          this.$ajax
            .post("/manage/brainstorming/question/del/category", {
              activity_id: this.activityId,
              category_id: categoryId
            })
            .then(response => {
              if (response.data.error == 0) {
                if (categoryId == this.categoryId) {
                  this.showQuesList = false;
                }
                this.getQuesList(1);
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
    //获取题库详情
    getQuesDetail(categoryId, isSlot) {
      this.categoryId = categoryId;
      this.searchtextques = "";
      if (typeof isSlot == "boolean") {
        this.quesTableData.page = 1;
        this.activityDetail.questionList.forEach(item => {
          item.isSlot = false;
          if (item.category_id == categoryId) {
            item.isSlot = !isSlot;
            this.slotIndex = item.isSlot;
            this.categoryIdNow = categoryId;
          }
        });
      }
      this.getQuesDetails();
    },
    //获取题库详情
    getQuesDetails() {
      this.$ajax
        .get(
          "/manage/brainstorming/question/list?activity_id=" +
            this.activityId +
            "&corp_id=" +
            this.corpId +
            "&category_id=" +
            this.categoryId +
            "&page=" +
            this.quesTableData.page +
            "&page_size=" +
            this.quesTableData.page_size +
            "&keyword=" +
            this.searchtextques
        )
        .then(response => {
          if (response.data.error == 0) {
            this.showQuesList = this.slotIndex;
            this.quesTableData = response.data.data;
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    },
    //编辑题目
    editQues(data) {
      this.showQuesDesc = true;
      this.quesDesc.question_title = data.question_title;
      this.quesDesc.en_question_title = data.en_question_title;
      this.quesDesc.option_a = data.question_options.A;
      this.quesDesc.en_option_a = data.en_question_options.A;
      this.quesDesc.option_b = data.question_options.B;
      this.quesDesc.en_option_b = data.en_question_options.B;
      this.quesDesc.option_c = data.question_options.C;
      this.quesDesc.en_option_c = data.en_question_options.C;
      this.quesDesc.option_d = data.question_options.D;
      this.quesDesc.en_option_d = data.en_question_options.D;
      this.quesDescAnswer = data.correct_answer.split("");
      this.quesDesc.questionId = data.question_id;
      this.quesDesc.categoryId = data.category_id;
      this.quesDescType = data.language_type;
    },
    //保存题目编辑
    saveQuesEdit() {
      var answerStr = "";
      this.quesDescAnswer.forEach(item => {
        answerStr += item;
      });
      let sendData = {};
      if (this.quesDescType == 0) {
        sendData = {
          corp_id: this.corpId,
          activity_id: this.activityId,
          question_id: this.quesDesc.questionId,
          category_id: this.quesDesc.categoryId,
          question_title: this.quesDesc.question_title,
          option_a: this.quesDesc.option_a,
          option_b: this.quesDesc.option_b,
          option_c: this.quesDesc.option_c,
          option_d: this.quesDesc.option_d,
          correct_answer: answerStr
        };
      } else if (this.quesDescType == 1) {
        sendData = {
          corp_id: this.corpId,
          activity_id: this.activityId,
          question_id: this.quesDesc.questionId,
          category_id: this.quesDesc.categoryId,
          question_title: this.quesDesc.question_title,
          en_question_title: this.quesDesc.en_question_title,
          option_a: this.quesDesc.option_a,
          en_option_a: this.quesDesc.en_option_a,
          option_b: this.quesDesc.option_b,
          en_option_b: this.quesDesc.en_option_b,
          option_c: this.quesDesc.option_c,
          en_option_c: this.quesDesc.en_option_c,
          option_d: this.quesDesc.option_d,
          en_option_d: this.quesDesc.en_option_d,
          correct_answer: answerStr
        };
      }
      this.$ajax
        .post("/manage/brainstorming/question/modify", sendData)
        .then(response => {
          if (response.data.error == 0) {
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
            this.getQuesDetail(this.quesDesc.categoryId);
            this.showQuesDesc = false;
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    },
    //删除题目
    deleteQues(categoryId, questionId, questionTitle) {
      this.$confirm(
        "确认删除 " + "“" + questionTitle + "”" + " 这道题吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }
      )
        .then(() => {
          this.$ajax
            .post("/manage/brainstorming/question/delete", {
              corp_id: this.corpId,
              activity_id: this.activityId,
              category_id: categoryId,
              question_id: questionId
            })
            .then(response => {
              if (response.data.error == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                if (
                  this.quesTableData.data.length == 1 &&
                  this.quesTableData.page > 1
                ) {
                  this.quesTableData.page = this.quesTableData.page - 1;
                } else if (
                  this.quesTableData.data.length == 1 &&
                  this.quesTableData.page == 1
                ) {
                  this.quesTableData.page = 1;
                }
                this.getQuesDetail(categoryId);
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
    //删除奖品
    deletePrize(prizeId) {
      this.$confirm("此操作将删除该奖品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$ajax
            .post("/manage/brainstorming/prize/sold/out", {
              corp_id: this.corpId,
              activity_id: this.activityId,
              lottery_level: this.lotteryIndex,
              prize_id: prizeId,
              status: 0
            })
            .then(response => {
              if (response.data.error == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getPrizeList(this.lotteryIndex);
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
    //编辑奖品
    editPrize(
      prize_id,
      prize_name,
      prize_day_rule,
      prize_count,
      prize_weights,
      prize_image_url
    ) {
      this.lotteryShowLay = true;
      this.prizeId = prize_id;
      this.addPrize.prizeName = prize_name;
      this.addPrize.prizeMost = prize_day_rule;
      this.addPrize.prizeMount = prize_count;
      this.addPrize.prizePercent = prize_weights;
      this.addPriImg = prize_image_url;
    },
    //删除人员信息行
    deleteMember(row) {
      this.$confirm("确认删除该行人员信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$ajax
            .post("/manage/brainstorming/user/delete", {
              corp_id: this.corpId,
              activity_id: this.activityId,
              user_id: row.user_id
            })
            .then(response => {
              if (response.data.error == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                if (
                  this.memberTableData.data.length == 1 &&
                  this.memberTableData.page > 1
                ) {
                  this.memberTableData.page = this.memberTableData.page - 1;
                } else if (
                  this.memberTableData.data.length == 1 &&
                  this.memberTableData.page == 1
                ) {
                  this.memberTableData.page = 1;
                }
                this.getParticipantDetail();
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
    editMember(row) {
      this.dialogFormVisible = true;
      this.form = {
        name: row.name,
        phone: row.phone,
        dept: row.department_name,
        userid: row.user_id
      };
    },
    initialMember() {
      this.form.name = "";
      this.form.dept = "";
      this.form.phone = "";
      this.form.userid = 0;
    },
    //获取奖品列表
    getPrizeList(index) {
      this.uploadStatus = 0;
      this.lotteryIndex = index;
      this.stepIndex = 4;
      this.prizeBoxInfo.forEach((item, index) => {
        if (item.open_mode == "km") {
          this.prizeLevelName[index] = this.levelListsArr[0];
        }
      });
      this.$ajax
        .get(
          "/manage/brainstorming/prize/list?corp_id=" +
            this.corpId +
            "&activity_id=" +
            this.activityId +
            "&lottery_level=" +
            index
        )
        .then(response => {
          if (response.data.error == 0) {
            this.prizeList = response.data.data;
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    },
    //保存奖品
    savePrize() {
      this.$ajax
        .post("/manage/brainstorming/prize/save", {
          activity_id: this.activityId,
          corp_id: this.corpId,
          lottery_level: this.lotteryIndex,
          prize_name: this.addPrize.prizeName,
          prize_day_rule: this.addPrize.prizeMost,
          prize_count: this.addPrize.prizeMount,
          prize_weights: this.addPrize.prizePercent,
          prize_image_url: this.addPriImg,
          prize_id: this.prizeId
        })
        .then(response => {
          if (response.data.error == 0) {
            this.getPrizeList(this.lotteryIndex);
            this.cancelPrizeEdit();
          } else {
            this.$message(response.data.message);
          }
        })
        .catch(error => {});
    },
    getBasicConfig() {
      this.stepIndex = 1;
      this.uploadStatus = 0;
    },
    //取消奖品编辑
    cancelPrizeEdit() {
      this.lotteryShowLay = false;
      this.addPrize.prizeName = "";
      this.addPrize.prizeMost = 0;
      this.addPrize.prizePercent = 0;
      this.addPrize.prizeMount = 0;
      this.prizeId = 0;
      this.addPriImg = "";
    },
    //新增人员
    addMember() {
      if (this.form.userid == 0) {
        this.$ajax
          .post("/manage/brainstorming/user/add", {
            activity_id: this.activityId,
            corp_id: this.corpId,
            name: this.form.name,
            department_name: this.form.dept,
            phone: this.form.phone
          })
          .then(response => {
            if (response.data.error == 0) {
              this.$message({
                message: "新增成功",
                type: "success"
              });
              this.getParticipantDetail(1);
              this.dialogFormVisible = false;
              this.form.name = "";
              this.form.dept = "";
              this.form.phone = "";
              this.form.userid = 0;
            } else {
              this.$message(response.data.message);
            }
          })
          .catch(error => {});
      } else {
        this.$ajax
          .post("/manage/brainstorming/user/modify", {
            activity_id: this.activityId,
            user_id: this.form.userid,
            name: this.form.name,
            department_name: this.form.dept,
            phone: this.form.phone
          })
          .then(response => {
            if (response.data.error == 0) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.getParticipantDetail(1);
              this.dialogFormVisible = false;
              this.form.name = "";
              this.form.dept = "";
              this.form.phone = "";
              this.form.userid = 0;
            } else {
              this.$message(response.data.message);
            }
          })
          .catch(error => {});
      }
    },
    handleClick(tab, event) {
      this.checkpointTab = tab.index;
      this.mustQuesTypeNow = this.mustQuesList[this.checkpointTab].type;
    },
    changeQuesIndex(tab, event) {
      console.log(tab.index);
      this.quesIndex = tab.index;
    },
    changePrizeIndex(tab, event) {
      console.log(tab.index);
      this.lotteryIndex = this.prizeBoxInfo[tab.index].lottery_level;
      console.log(this.lotteryIndex);
      this.getPrizeList(this.lotteryIndex);
    },
    test(value) {
      this.mustQuesList[this.checkpointTab].type = value;
    },

    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style>
/* 头部 */

.config-container {
  width: 100%;
  margin: 0 auto;
  height: 100%;
}

.content {
  margin: 0 auto 20px;
  width: 1184px;
  overflow: hidden;
}

.page_title {
  margin: 0 auto;
  width: 1184px;
  overflow: hidden;
  margin-bottom: 21px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #757575;
}

.page_title a {
  color: #757575;
  text-decoration: none;
}

.page_title a:hover {
  color: #3dc6f2;
  text-decoration: none;
}
/* 模板 */

.template {
  float: left;
  width: 375px;
  margin-right: 30px;
  height: 100%;
}

.template.isfixed {
  position: fixed;
  top: 0;
  z-index: 999;
}

.template-wrapper {
  width: 100%;
  height: 715px;
  background-size: cover;
  color: #fff;
  border: 1px solid #ccc;
  position: relative;
  overflow-y: scroll;
}

.template-wrapper::-webkit-scrollbar {
  display: none;
}

.template-wrapper .header-bar {
  width: 100%;
  height: 44px;
  line-height: 44px;
  color: #fff;
  background: #666;
  opacity: 0.5;
  filter: alpha(opacity=50);
  text-align: center;
  font-size: 17px;
}

.banner {
  position: relative;
  width: 355px;
  margin: 0 10px;
  font-size: 13px;
}

.banner img {
  margin-top: 40px;
  width: 100%;
  height: auto;
  vertical-align: middle;
}

.crop-name {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  color: #fefefe;
  line-height: 40px;
  z-index: 100;
}

.rule {
  display: inline-block;
  position: absolute;
  right: 0;
  z-index: 100;
  padding: 3px 3px 1px;
  width: 40px;
  height: 40px;
  border: 1px solid #fefefe;
  border-top: none;
  background: rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  text-align: center;
  line-height: 15px;
  color: rgba(255, 255, 255, 0.8);
}

.selfinfo {
  width: 355px;
  margin: 14px 10px 0;
  background: rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  height: 60px;
  padding: 5px 0 5px 10px;
}

.selfinfo-left {
  float: left;
  width: 45%;
}

.selfinfo-left img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #fff;
  margin-right: 10px;
  vertical-align: middle;
}

.selfinfo-left p span {
  display: block;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
}

.selfinfo-left p span:first-of-type {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 30px;
}

.selfinfo-left .avatar {
  float: left;
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 48px;
  border-radius: 50%;
  border: 1px solid #fff;
  margin-right: 10px;
  background-color: #3f9af4;
  color: #fff;
  text-align: center;
  font-size: 16px;
}

.selfinfo-right {
  float: right;
  padding: 14px 0;
  max-width: 54%;
}

.selfinfo-right img {
  width: 20px;
  height: 20px;
  margin-top: 1px;
}

.selfinfo-right img,
.selfinfo-right span {
  display: inline-block;
  float: left;
  margin-right: 5px;
  line-height: 23px;
}

.other {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  height: 25px;
  line-height: 25px;
  margin-right: 10px;
}

.split {
  height: 25px;
  line-height: 20px;
  color: #485580;
}

.selfinfo-right .detail {
  height: 24px;
  line-height: 22px;
  opacity: 0.7;
  background: url("../imgs/add_prize_img.png") 8px center no-repeat;
  background-size: 22% auto;
  border: 1px solid #7a89bb;
  text-align: center;
  color: #cbd1e8;
  padding: 0 8px 0 22px;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 0;
}

.selfinfo-right {
  padding-right: 15px;
  text-align: right;
  font-size: 12px;
}

.template-mainer {
  margin: 9px auto;
  width: 356px;
  height: 369px;
  overflow: hidden;
  margin-top: 15px;
}

.mainer-left,
.mainer-right {
  float: left;
}

.mainer-line{
  width: 100%;
  float: left;
  margin-top: 10px;
}

.mainer-left {
  margin-right: 10px;
}

.pk{
  position: relative;
  width: 100%;
  /* background: url("../imgs/answer.png") 0 0 no-repeat;
  background-size: 100% 100%; */
  padding: 14px 0 0;
}

.must {
  position: relative;
  width: 200px;
  height: 100px;
  /* background: url("../imgs/must_bg.png") 0 0 no-repeat;
  background-size: 100% 100%; */
  padding: 14px 0 0;
  margin-bottom: 9px;
}

.mission {
  position: relative;
  width: 200px;
  height: 165px;
  /* background: url("../imgs/answer.png") 0 0 no-repeat;
  background-size: 100% 100%; */
  padding: 14px 0 0;
}

.must p,
.mission p,
.beatdown p {
  text-align: left;
  padding-left: 18px;
  font-size: 29px;
  color: #ffffff;
}

.beatdown p {
  font-size: 38px;
}

.must .number,
.mission .number,
.beatdown .number {
  text-align: left;
  padding-left: 19px;
  font-size: 26px;
  color: #ffeed9;
}

.beatdown {
  position: relative;
  width: 145px;
  height: 205px;
  /* background: url("../imgs/battle.png") 0 0 no-repeat;
  background-size: 100% 100%; */
  padding: 10px 0 0;
}

.rank {
  position: relative;
  margin-top: 9px;
  width: 145px;
  height: 57px;
  line-height: 57px;
  /* background: url("../imgs/rank.png") 0 0 no-repeat;
  background-size: 100% 100%; */
}

.rank p {
  font-size: 23px;
  color: #ffffff;
  text-align: left;
  padding-left: 15px;
}

.mission,
.beatdown {
  display: inline-block;
}

.template-wrapper-all {
  margin: 0 auto;
  width: 355px;
  height: 60px;
  color: #fff;
  line-height: 60px;
  text-align: right;
  font-size: 29px;
  background: url("../imgs/other.png") 0 0 no-repeat;
  background-size: 100% 100%;
  padding: 0 22%;
}

.template-footer {
  margin: 10px auto;
  width: 100%;
  text-align: center;
  color:#fff;
  font-size: 12px;
}

.template-footer p {
  line-height: 18px;
}
/* 分步配置 */

.config {
  float: left;
  width: 778px;
  min-height: 615px;
  background: #fff;
}

.config.isfixed {
  position: relative;
  left: 405px;
}

.config .config-top {
  width: 100%;
  height: 42px;
  line-height: 42px;
  overflow: hidden;
}

.config .config-top.isfixed {
  width: 778px;
  position: fixed;
  top: 0;
  z-index: 999;
  background: #fff;
}

.config .config-top ul,
.config .config-top .config-btns {
  float: left;
  height: 42px;
  overflow: hidden;
}

.config .config-top .publish-btn {
  float: right;
}

.config-top li {
  float: left;
  height: 42px;
  line-height: 42px;
  padding: 0 25px;
  background: #ededed;
  color: #333;
  cursor: pointer;
}

.config-top li.active {
  background: #fff;
}

.config-top .config-btns span {
  display: inline-block;
  float: left;
  height: 42px;
  border: 1px solid #ccc;
  line-height: 40px;
  width: 34px;
  text-align: center;
  color: #333;
  cursor: pointer;
}

.config-top .config-btns span:first-of-type {
  border-right: 0;
}

.config-top .publish-btn {
  width: 112px;
  background: #eeb01c;
  color: #fff;
  text-align: center;
  height: 42px;
  line-height: 42px;
  cursor: pointer;
}

.config-mainer.isfixed {
  margin-top: 80px;
}
/* 第一步 */

.step-one,
.step-two,
.step-three,
.step-four {
  width: 100%;
  padding-left: 60px;
  padding-bottom: 15px;
}

.row {
  overflow: hidden;
  margin: 20px 0;
}

.row-title,
.row-content {
  float: left;
  overflow: hidden;
  font-size: 12px;
}

.row-title {
  width: 80px;
  margin-right: 24px;
  line-height: 40px;
  min-height: 10px;
}

.row-content {
  max-width: 590px;
}

.row-content .el-textarea {
  width: 350px;
}

.row-content .el-switch {
  height: 40px;
}

.row-content .el-color-picker {
  padding-top: 4px;
}

.row-content .el-date-editor {
  width: 220px;
}

.row-content .el-date-editor .el-range-separator {
  width: 10%;
}

.step-one .row .row-content .el-date-editor--date {
  width: 170px;
}

.step-one .row .row-content .el-date-editor--time {
  width: 100px;
}

.limit-msg,
.limit-time {
  height: 40px;
  line-height: 40px;
  margin: 10px 0;
}

.limit-msg {
  background: #eee;
  padding-left: 5px;
  margin: 10px 0;
}

.limit-time > span {
  margin-right: 10px;
}

.default,
.picture {
  margin-left: 10px;
  text-decoration: underline;
  cursor: pointer;
  color: #495060;
}

.banner-size {
  padding-top: 8px;
  line-height: 20px;
}

.banner-size span {
  color: #999;
  font-size: 10px;
}
/* 第二步 */

.step-two .row {
  margin: 10px 0;
}

.step-two .el-radio {
  line-height: 40px;
}

.search {
  float: left;
  overflow: hidden;
  margin-bottom: 20px;
  width: 590px;
}

.search .input {
  float: left;
  margin-right: 20px;
}

.search .input input {
  width: 100%;
  font-size: 12px;
}

.add-btn {
  float: right;
}

.member {
  margin-bottom: 10px;
  overflow: hidden;
  width: 590px;
}

.excel-btns {
  overflow: hidden;
  padding-right: 24px;
}

.row .download {
  float: right;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #333;
  width: 100px;
  text-align: center;
  margin-right: 20px;
  cursor: pointer;
  height: 34px;
  line-height: 32px;
}

.row .download a {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #333;
}

.row .download a:hover {
  color: #2d8cf0;
}

.row .upload {
  float: right;
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
}

.row .upload input {
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

.preciew-dept-detail {
  overflow: hidden;
}

.preciew-dept-detail p {
  height: 46px;
  line-height: 46px;
  color: #333;
  font-weight: 500;
  text-align: right;
  font-weight: bold;
}

.preciew-dept-detail ul {
  text-align: right;
}

.preciew-dept-detail li {
  min-width: 120px;
  padding-top: 8px;
  /* padding: 6px 10px; */
  height: 64px;
  border-radius: 5px;
  border: 1px solid #999;
  background: #eee;
  margin-left: 10px;
  float: right;
  margin-bottom: 10px;
}

.preciew-dept-detail li p {
  text-align: center;
  height: 26px;
  line-height: 26px;
}

.dept-rank {
  text-align: right;
  height: 40px;
  line-height: 40px;
}

.dept-rank > span {
  display: inline-block;
  text-decoration: none;
  margin-right: 15px;
}

.excel-count {
  text-align: right;
  margin-top: 10px;
  overflow: hidden;
}

.excel-count p {
  margin: 10px 0;
  float: left;
}

.rank-tip {
  display: inline-block;
  text-align: right;
  background: #eee;
  padding: 10px;
  float: right;
}
/* 第三步 */

.step-three .row-content {
  width: 590px;
}

.ques-list {
  height: 120px;
  width: 580px;
  margin-bottom: 20px;
}

.ques-list p,
.ques-list ul {
  float: left;
}

.ques-list > p {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: #e1e1e1;
  margin: 40px 5px;
  cursor: pointer;
}

.ques-list ul {
  height: 130px;
  overflow-y: auto;
}

.ques-list ul li {
  position: relative;
  width: 100px;
  height: 120px;
  margin-right: 10px;
  float: left;
  background: #fff;
  border: 1px solid #eee;
  text-align: center;
  border-radius: 4px;
  margin-bottom: 10px;
}

.ques-list ul li:active {
  border: 1px solid #ccc;
}

.ques-list ul li p {
  width: 100%;
  text-align: left;
  color: #999;
  margin-top: 10px;
  padding-left: 5px;
}

.ques-list ul li p:first-of-type {
  color: #333;
  font-weight: bold;
}

.ques-list ul li p.fixed-bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 0;
}

.ques-list ul li p.fixed-bottom span {
  float: left;
  display: inline-block;
  width: 50%;
  color: #444;
  text-align: center;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  background: #ddd;
}

.ques-config {
  overflow: hidden;
  margin-bottom: 20px;
  line-height: 40px;
}

.ques-config-title,
.ques-config-content {
  float: left;
}

.el-input-number {
  margin-right: 6px;
}

.ques-config-title {
  width: 100px;
  margin-right: 10px;
}

.step-three .el-radio-group > div {
  margin: 5px 0;
}

.ques-config-list {
  width: 480px;
}

.ques-config-list .el-checkbox-group .el-checkbox {
  margin-left: 0;
  margin-right: 20px;
}
/* 第四步 */

.prize-row {
  overflow: hidden;
  line-height: 40px;
  margin-bottom: 10px;
}

.prize-title,
.prize-content {
  float: left;
}

.prize-title {
  width: 70px;
  margin-right: 10px;
}

.box-rule {
  display: inline-block;
}

.box-rule > label.el-radio {
  display: block;
  margin-left: 0;
  line-height: 40px;
}

.box-rule > label .el-select {
  width: 130px;
}

.null-prize {
  width: 500px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background: #eee;
  margin-bottom: 20px;
}

.add-prize {
  width: 120px;
  height: 40px;
  background: #409eff;
  line-height: 40px;
  border-radius: 5px;
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
  margin-left: 380px;
  margin-top: 20px;
  cursor: pointer;
}

.prize-tip {
  width: 500px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #eee;
  margin-bottom: 20px;
}
/* 预览发布详情 */

.preview-mainer {
  width: 520px;
}

.preview-config {
  width: 100%;
  padding: 10px 20px;
}

.preview-config > p {
  color: #333;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
}

.preview-succ span {
  display: block;
  text-align: center;
}

.preview-succ span:first-of-type {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #30c387;
  text-align: center;
  line-height: 50px;
  margin: 15px auto;
  color: #fff;
  padding-top: 20px;
}

.preview-succ span:first-of-type i {
  font-size: 50px;
  font-weight: bold;
}

.preview-config div,
.preview-config div p {
  text-align: center;
}

.preview-config div p {
  margin: 50px auto 80px;
}
/* 添加奖品弹层 */

.add-row {
  overflow: hidden;
  line-height: 40px;
  margin-bottom: 15px;
}

.add-title,
.add-content {
  float: left;
}

.add-title {
  width: 100px;
  margin-right: 20px;
}

.unit {
  display: inline-block;
}

.add-prize-btns {
  width: 100%;
  overflow: hidden;
  text-align: right;
}

.add-prize-img {
  height: 102px;
}

.add-prize-img .placehold-bg {
  background: url("../imgs/add_prize_img.png") center no-repeat;
  background-size: contain;
}

.cancel-btn {
  color: #333;
  margin-right: 15px;
}
/* 图片上传样式 */

.placehold-wrapper {
  position: relative;
  float: left;
  width: 102px;
  height: 102px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
}

.placehold-wrapper .camera {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 100px;
}

.placehold-wrapper .camera i {
  font-size: 40px;
  color: #fff;
}

.placehold-wrapper:hover .camera {
  display: block;
}

.step-four .placehold-wrapper + span,
.add-prize-mainer .placehold-wrapper + span {
  cursor: pointer;
  text-decoration: underline;
}

.placehold {
  position: relative;
  width: 100%;
  height: 100px;
  height: 100%;
  text-align: center;
}

.placehold img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 100px;
  height: auto;
  max-height: 100px;
  width: auto;
  vertical-align: middle;
}

.placehold input {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 120;
  opacity: 0;
  width: 100%;
  height: 100%;
  color: transparent;
  cursor: pointer;
}
/* 上传文件弹层 */

.upload-confirm {
  width: 100%;
  overflow: hidden;
  margin-top: 30px;
}

.add-ques-confirm {
  /* text-align: right; */
}

.add-ques-confirm .el-input {
  width: 200px;
}
/* .upload-confirm p {
        float: right;
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        background: #2d8cf0;
        cursor: pointer;
    } */

.excel-down-detail p {
  height: 34px;
  line-height: 34px;
  color: #333;
}

.excel-down-detail p span {
  display: inline-block;
  margin-right: 25px;
}

.excel-down-detail p span:first-of-type {
  width: 40px;
  text-align: left;
  margin-right: 80px;
}

.excel-down-detail p:last-of-type span.upload-error {
  cursor: pointer;
  height: 28px;
  line-height: 28px;
  width: 86px;
  color: #fff;
  background: #1e90ff;
  text-align: center;
  border-radius: 5px;
}

.excel-down-detail p:last-of-type span.upload-error a {
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #fff;
  text-decoration: none;
}

.excel-dept-detail p {
  height: 46px;
  line-height: 46px;
  color: #333;
  font-weight: 500;
}

.excel-dept-detail ul {
  overflow: hidden;
}

.excel-dept-detail li {
  min-width: 120px;
  padding: 6px 10px;
  height: 64px;
  border-radius: 5px;
  border: 1px solid #999;
  background: #eee;
  margin-right: 10px;
  margin-bottom: 10px;
  float: left;
}

.excel-dept-detail li p {
  text-align: center;
  height: 26px;
  line-height: 26px;
}
/* 表格样式 */

.table {
  width: 100%;
  font-size: 12px;
  color: #333333;
  border: 1px solid #bcbcbc;
  border-collapse: collapse;
}

.table th {
  border: 1px solid #bcbcbc;
  padding: 6px 0;
}

.table td {
  max-width: 86px;
  padding: 2px 10px;
  border: 1px solid #bcbcbc;
  text-align: center;
}

.table td .table-btn {
  color: #409eff;
  cursor: pointer;
}

.table td img {
  max-width: 50px;
  max-height: 50px;
  vertical-align: middle;
  width: auto;
  height: auto;
}
/* 各种弹层 */

.edit-ques .el-dialog,
.addprize .el-dialog,
.upload-ques .el-dialog,
.upload-member .el-dialog,
.level-dialog .el-dialog {
  width: 440px;
  border-radius: 10px;
}

.add-member .el-dialog {
  width: 540px;
  border-radius: 10px;
}

.preview .el-dialog {
  width: 540px;
  border-radius: 10px;
}

.el-upload-list {
  display: none;
}

.el-dialog .el-checkbox {
  width: 35%;
}

.el-dialog .el-checkbox.is-bordered + .el-checkbox.is-bordered:nth-of-type(3) {
  margin-left: 0;
}

.level-tip {
  padding-left: 36px;
}

.step-one .row .row-content .el-date-editor--date {
  width: 170px;
}

.step-one .row .row-content .el-date-editor--time {
  width: 100px;
}
</style>