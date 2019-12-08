<template>
  <div class>
    <el-container>

      <el-header>
        <!-- <img :src='this.avatar'/> -->
        <strong>{{this.$route.params.name}}</strong>
      </el-header>

      <el-main class="wrapper">
          <ul>
              <!-- <li v-for="item in this.sendMessageList" :key="item.time"> -->
              <li v-for="item in this.messageList" :key="item.id">
                <ChatItem v-if="item.fromUser.id == userId" :img="item.fromUser.avatar" me="true" :msg="item.message" :name="item.fromUser.nickName" :time="item.time" :href=" null "></ChatItem>
              <!-- </li>
              <li v-for="item in this.getMessageList" :key="item.time"> -->
                <ChatItem v-else :img="item.fromUser.avatar" :msg="item.message" :name="item.fromUser.nickName" :time="item.time"></ChatItem>
              </li>
          </ul>
      </el-main>

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
import ChatItem from "./ChatItem"
import { type } from 'os';
import Data from 'vue';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
      ChatItem,
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
      userId:this.$store.getters.userId,
      messageList:[],
      messageId : 1,
      // myTime: new Data(),
      };
  },
  //监听属性 类似于data概念
  computed: {
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    init(){
      this.websock = this.$store.getters.sock;
      this.getUnreadList(this.$store.getters.userId, this.$route.params.friendId);
      this.websock.connect('立即与服务器通信');
      this.websockOnMessage();
    },

    websockOnMessage(){

      this.websock.ws.onmessage = e =>{
        const data = JSON.parse(e.data);
        if (data.data){
          const dat = data.data;
          dat.id = this.messageId;

          if (! this.messageList){
            this.messageList = [dat];
          }
          else{
            this.messageList.push( dat );
          }
          this.messageId = this.messageId + 1; 
        }else{
          return
        }
      }
    },


    sendMsg(){
      const toId = this.$route.params.friendId;
      // const time = this.getTime();
      // console.log("###########", time);
      const param = {
        "fromUser":{"id":this.$store.getters.userId,
        "nickName":this.$store.getters.userNickname,
        "avatar":this.$store.getters.userAvatar}, 
        "toUser":{"id":this.$route.params.friendId, 
        "nickName":this.$route.params.name, 
        "avatar":this.$route.params.avatar}, 
        "message":this.message,
        "id":this.messageId};
        this.messageId = this.messageId + 1;
      this.messageList.push(param);
      sendMessage(param, toId).then(response=>{
        const data = response.data;
        this.message = "";
        this.websockOnMessage();
      }).catch();
    },
    getTime(){
      let myTime = new Data('December 17, 1995 03:24:00');
      let y = myTime.getFullYear();
      let m = myTime.getMonth() + 1;
      let d = myTime.getData();
      let h = myTime.getHours();
      let min = myTime.getMinutes();
      let s = myTime.getSeconds();
      let t = y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
      return t;
    },
    getUnreadList(fromId, toId){
      getUnreadMessageList(fromId, toId).then(response =>{
        this.unreadList = response.data.data;
        if(this.unreadList){
          this.unreadList.forEach((data) =>{
            if(data.fromUser.id == this.userid){
              data.id = this.messageId;
              this.messageId = this.messageId + 1;
              if(!this.messageList){
                this.messageList = [data]; 
              }else{
                this.messageList.push(data);
              }
            }else{
              if(!this.messageList){
                this.messageList = [data]; 
              }else{
                this.messageList.push(data);
              }            
            }
          })
        }
      }).catch()
    },
    
    // getHistoryList(fromId, toId){
    //   getHistoryReadList(fromId, toId).then(response =>{
    //     this.historyMessageList = response.data.data;
    //     console.log("历史消息",this.historyMessageList);
    //     // this.historyMessageList.forEach((data) => {
    //     //   this.messageList.push(response.data.data);
    //     // })
        
    //   }).catch();
    // },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
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
<style lang="scss"  scoped>
@import "./chat";
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