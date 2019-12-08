<template>
  <div>
    <div class="main">
      <h3>以下好友给您发送了离线信息，请查看</h3>
    </div>
    <hr/>
    <el-row>
      <el-col :span="10" v-for="item in this.unreadList" :key="item.fromUser.id">
        <el-card :body-style="{ margin: '10px' }">
          <img :src=item.fromUser.avatar alt="图片不存在" class="image" />
          <div style="padding: 14px;">
            <span><strong>昵称:{{item.fromUser.nickName}}</strong></span>

            <div class="loc">
              <span v-if="item.status == 1"><i class="el-icon-view"/>用户上线</span>
              <span v-else><i class="el-icon-view"/>用户离线</span>
            </div>
            <div class="loc">
              <span><i class="el-icon-chat-line-round"/><strong>未读消息数:</strong>{{item.count}}</span>
            </div>

            <br/>
            <!-- <hr/> -->
            <div class="bottom">
              <el-button
                plain
                type="primary"
                @click="toChatroom(item.fromUser.id, item.fromUser.nickName, item.fromUser.avatar, 1)"
              >聊天</el-button>
              <!-- <el-button 
                plain
                type="warning"
                @click="deleteFriend(item.friendId)"
              >删除好友</el-button> -->
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetMyFriendList, GetUnreadMsgList } from "@/stores/modules/user";
import { mapGetters } from "vuex";
import { error } from 'util';
import { getUnreadMsgList } from "@/api/friendOperation";
import { logout_ } from "@/api/login";
import WebSocketClass from '@/api/webSocket';

export default {
  name: "home",
  data() {
    return {
      unread_list:[],
      messageId:1,
    }
  },
  computed: {
    ...mapGetters(["userName", "userId"]),
    unreadList:function () {
      return this.unread_list;
    }
  },
  mounted() {
    this.init();
    this.myFriendList();
    this.getUnreadMsg();
    // window.addEventListener('beforeunload', this.beforeunloadHandler())
  },
  destroyed(){
    // window.removeEventListener('beforeunload', this.beforeunloadHandler())
  },
  methods: {
    // beforeunloadHandler(){
    //   logout_(this.$store.getters.userId);
    // },
    init(){
      // const baseURL= process.env.WEB_API;
      const baseURL = "wss://10.112.48.143:8890";
      // const baseURL = "wss://104.207.153.191:8888";
      const wss = baseURL + '/chat/' + this.userId;
      // websock = new WebSocketClass(wss, null, '聊天系统');
      this.$store.dispatch('START_WEBSOCKET',  wss, null, "聊天系统").then(res =>{
        // console.log("主函数已经连接成功websocket");
      }).catch();
      
      // this.$store.dispatch('START_WEBSOCKET', this.userId).then(response => {
      //   console.log("main is running");
        // console.log("main-response", response);
        // this.$store.getters.sock.onopen = function(){};
        // setInterval(function(){ this.$store.getters.sock.send( {'heart':true} )  }, 30000);
      // }
      // ).catch();
      // console.log("main-web-open????", this.$store.getters.sock);
    },

    myFriendList() {
      this.$store
        .dispatch("GetMyFriendList", this.userId)
        .then(response => {
          // console.log("提交申请自己的好友列表成功");
        })
        .catch(error => {
          console.log("!!!!!!!!!!!!!!!!!", "error");
        });
    },
    getUnreadMsg(){
      // this.$store.dispatch("GetUnreadMsgList", this.userId).then().catch();
      // console.log(this.unreadList);
      getUnreadMsgList(this.userId).then(response =>{
        this.unread_list = response.data.data;
      }).catch(error =>{
        console.log(error);
      })
    },
    toChatroom(id, name, pic, code) {
      // console.log("11111111111", pic);
      this.$router.push({
        name: "privateChatRoom",
        params: { friendId: id, name: name, avatar: pic, code: code},
      });
    },
  }
};
</script>

<style scoped>
.main {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
}
.route {
  text-decoration: none;
}
.sidebar {
  height: 100%;
}
.loc{
  /* display: inline; */
  float: right;
  margin-right: 30px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  float: right;
}
.image{
  width: 20%;
}
</style>
