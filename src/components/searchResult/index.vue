<template>
  <div>
    <div v-if="findList !== []">
    <el-row>
      <el-col :span="8" v-for="item in findList" :key="item.id" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <img :src=item.avatar class="image"/>
          <div style="padding: 14px;">
            <span>好友名: {{item.userName}}</span>
          </div>
          <div class="friendG">
            <el-button
              type="info"
              plain
              @click="dialogVisible = true"
            >选择好友分组</el-button>
            <el-button
              class="pos clearfix"
              type="primary"
              plain
              margin-right='10px'
              @click="sendRequest(item.id, userid)"
            >发送请求</el-button>
            </div>

            <!-- 弹出框 -->
            <el-dialog title="好友分组" :visible.sync="dialogVisible">
              <div v-for="item in friendGroupList" :key="item.id">
                <el-radio-group v-model="choicedGroupId">
                  <el-radio :label="item.id">{{item.typeName}}</el-radio>
                </el-radio-group>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button 
                  plain 
                  type="success"
                  @click="dialogVisible = false">完成</el-button>
              </span>
            </el-dialog>

        </el-card>
      </el-col>
    </el-row>
    </div>
    <div v-else>没有相关用户信息</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import service from "@/utils/request";
import { requestFriend, searchFriend } from "@/api/friendOperation";
import MessageBox from "element-ui";

export default {
  name: "requsetFriendResult",
  data() {
    return {
      dialog_visible:false,
      choiced_groupId:-1,
    };
  },
  computed: {
    ...mapGetters(["beSearchFriend", "userId", "myFriendList"]),
    findList: function() {
      return this.beSearchFriend;
    },
    userid: function() {
      return this.userId;
    },
    friendGroupList:function(){
      return this.myFriendList;
    },
    // choicedGroupId:function(){
    //   return -1;
    // },
    choicedGroupId:{
      get:function(){
        return this.choiced_groupId;
      },
      set:function(v){
        this.choiced_groupId = v;
      }
    },
    // dialogVisible:function(){
    //   return false;
    // }
    dialogVisible:{
      get:function(){
        return this.dialog_visible;
      },
      set:function(v){
        this.dialog_visible = v;
      }
    }
    // remark: function(){
    //   const lenght = this.beSearchFriend.lenght;
    //   return new Array(lenght, "");
    // }
  },
  mounted(){
    // console.log("find list is:", this.findList);
  },
  //发送请求申请添加好友
  methods: {
    //提交好友申请
    sendRequest(friendId, userId) {
      if (this.choicedGroupId == -1){
        this.$message({
          message:"请选择分组",
          type:"error"
        })
        return 0
      }
      requestFriend(this.choicedGroupId, friendId, userId)
        .then(response => {
          let data = response.data.data;
          // console.log("返回的申请添加好友的提示代号", data);
          if (data === "1") {
            this.$message({
              message: "好友申请已经发出",
              type: "success"
            });
          } else if (data === 0) {
            this.$message({
              message: "没有找到该用户",
              type: "warning"
            });
          } else if (data === -1 || data === "ALREADY_FRIENDS") {
            this.$message({
              message: "该用户已经是你的好友",
              type: "warning"
            });
          } else if (data === -2 || data === "NOT_YOURSELF") {
            this.$message({
              message: "无法添加自己为好友",
              type: "warning"
            });
          } else if (data === -3 || data === "ALREADY_SENT") {
            this.$message({
              message: "请不要重复发送好友请求",
              // cancelButtonText: "取消",
              type: "warning"
            });
          }
        })
        .catch(err => {
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!", err);
        });
    }
  }
};
</script>
<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .image {
    width: 20%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .pos{
    float: right;
  }
  .friendG{
    margin-right: 10px;
    float: right;
  }
</style>
