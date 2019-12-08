<template>
  <div class>
    <el-container>
      <el-header>
        <!-- <img :src='this.avatar'/> -->
        <strong>{{this.$route.params.name}}</strong>
      </el-header>

      <el-scrollbar style="height:100%">
        <el-main>
            <div  v-for="obj in historyMessageList" :key="obj.time">
              <get-msg 
                ref="getMsg"
                v-if="obj.fromUser.id == friendId"
                :name="obj.fromUser.userName" 
                :img="obj.fromUser.avatar" 
                :msg="obj.message">
              </get-msg>

              <send-msg
                ref="sendMsg"
                v-if="obj.fromUser.id == userId" 
                :name="obj.fromUser.userName" 
                :img="obj.fromUser.avatar" 
                :msg="obj.message">
              </send-msg>
          </div>
        </el-main>
      </el-scrollbar>

      <el-footer>
        <i class="el-icon-folder" />
        <el-input 
          v-model="message"
          @keyup.enter.native="sendMsg()" 
          style="width:60%"></el-input>
        <el-button 
          type="primary" 
          plain 
          @click="sendMsg()" 
        >发送</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {sendMessage, getHistoryReadList, getUnreadMessageList} from "@/api/friendOperation"
import sendMsg from './sendMsg.vue'
import getMsg from './getMsg.vue'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    sendMsg,
    getMsg,
  },
  data() {
    //这里存放数据
    return { 
      message: "",
      websock: null,
      historyMessageList:[],    //历史消息列表
      unreadList:[],    //未读消息列表
      pic:this.$route.params.avatar,
      friendId:this.$route.params.friendId,
      messageList:[],
      userid:this.$store.getters.userId,
      };
  },
  //监听属性 类似于data概念
  computed: {
    userId:function () {
      return this.userid;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    init(){
      // console.log(typeof(this.friendId));
      if(this.$store.getters.sock){
        this.websock = this.$store.getters.sock;
        // console.log("1111111111111111111111");
        // this.websockOnMessage();
      }else{
        this.$store.dispatch('START_WEBSOCKET', this.$store.getters.userId).then().catch();
        this.websock = this.$store.getters.sock;
      }
      this.getHistoryList(this.$store.getters.userId, this.$route.params.friendId);
      if(this.$route.params.code == 1){
        this.getUnreadList(this.$store.getters.userId, this.$route.params.friendId);
      }
      this.websockOnMessage();
    },
    websockOnMessage(){
      console.log("开始等待接收消息");
      this.websock.onmessage = function(e){
        let that = this
        this.messageList = JSON.parse(e.data);
        console.log("接收到消息列表如下：", this.messageList);
        if(!this.messageList.data){
          this.messageList = []
        }
        else{

        }
        }
    },

    sendMsg(){
      const toId = this.$route.params.friendId;
      const param = {"fromUser":{"id":this.$store.getters.userId,"nickName":this.$store.getters.userNickname,"avatar":this.$store.getters.userAvatar}, "toUser":{"id":this.$route.params.friendId, "nickName":this.$route.params.name, "avatar":this.$route.params.avatar}, "message":this.message};

      sendMessage(param, toId).then(response=>{
        const data = response.data;

        // this.$refs.sendMsg.send(this.$store.getters.userName,this.$store.getters.userAvatar,this.message);
        
        this.message = "";
        this.websockOnMessage();
        console.log("发送成功")
      }).catch();
    },
    getHistoryList(fromId, toId){
      getHistoryReadList(fromId, toId).then(response =>{
        this.historyMessageList = response.data.data;

        this.historyMessageList.forEach((obj) => {
          console.log(obj)
          if(obj.fromUser.id == this.friendId){
            this.$refs.getMsg.get(obj.fromUser.userName, obj.fromUser.avatar, obj.message);
          }
          else{
            this.$refs.sendMsg.send(obj.fromUser.userName, obj.fromUser.avatar, obj.message);
          }
        })

        // console.log("历史消息",this.historyMessageList);
      }).catch();
    },
    getUnreadList(fromId, toId){
      getUnreadMessageList(fromId, toId).then(response =>{
        this.unreadList = response.data.data;
        this.historyMessageList.push(this.unreadList);
        // this.unreadList = response;
        console.log("未读消息列表", this.unreadList);
        console.log("历史消息列表", this.historyMessageList);
      }).catch()
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log(this.sock);
    // console.log(this.$route.params)
    // console.log(this.friendId);
    // console.log(this.$route.params.friendId);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
    // console.log(this.friendId);
    },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #ABD0F7;
  color: #333;
  text-align: center;
  line-height: 60px;
  direction: horizontal;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

/* .el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 525px;} */

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}


</style>