<template>
  <div class>
    <el-row>
      <el-col :span="10" v-for="item in this.friendList" :key="item.friendId">
        <el-card :body-style="{ margin: '10px' }">
          <img :src=item.friendInfo.avatar alt="图片不存在" class="image" />
          <div style="padding: 14px;">
            <span><strong>昵称:{{item.friendInfo.nickName}}</strong></span>

            <div class="loc">
              <span v-if="item.status == 1"><i class="el-icon-view"/>用户上线</span>
              <span v-else><i class="el-icon-view"/>用户离线</span>
            </div>
            <!-- <div class="loc">
              <span><strong>未读消息数:</strong>3</span>
            </div> -->

            <br/>

            <div class="bottom">
              <el-button
                plain
                type="primary"
                @click="toChatroom(item.friendId, item.friendInfo.nickName, item.friendInfo.avatar)"
              >聊天</el-button>
              <el-button 
                plain
                type="warning"
                @click="deleteFriend(item.friendId)"
              >删除好友</el-button>
              <el-button 
                plain
                type="info"
                @click="toHistoryPage(item.friendId)"
              >历史记录</el-button> 
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetMyFriendList } from "@/stores/modules/user";
import { deleteMyFriend, getHistoryReadList } from "@/api/friendOperation";

export default {
  // name: "myFriendList",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // friendList:[],
      messagelist:[],
    };
  },
  //监听属性 类似于data概念
  computed: {
    friendList: function() {
      const all = this.$store.getters.myFriendList;
      // console.log("是否得到全部的好友列表信息", all);
      const groupid = this.$route.params.groupId;
      for (let i = 0; i < all.length; i++) {
        // console.log("i", i);
        // console.log("？？？？？？groupid", groupid);
        if (all[i].id == groupid) {
          // console.log("已经得到分组的好友列表信息");
          return all[i].friends;
        }
      }
    },
    messageList: function(){
      return this.messagelist;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toHistoryPage(toId){
      this.$router.push({
        name: "privateHistoryPage",
        params: {fromId: this.$store.getters.userId, toId: toId},
      });
    },
    
    init(){
      // console.log("请求好友列表")
      this.myFriendList();
      // console.log("请求好友列表成功")
    },
    toChatroom(id, name, pic) {
      // console.log("11111111111", pic);
      this.$router.push({
        name: "privateChatRoom",
        params: { friendId: id, name: name, avatar: pic},
      });
    },
    deleteFriend(id) {
      const myid = this.$store.getters.userId;
      deleteMyFriend(myid, id)
        .then(response => {
          const data = response.data.data;
          if (data != "0") {
            this.$message({
              message: "成功删除好友",
              type: "success"
            });
            this.$store.dispatch("GetMyFriendList", myid);
          } else {
            this.$message({
              message: "删除好友失败",
              type: "warning"
            });
          }
        })
        .catch(error => {
          console.log("!!!!有错误", error);
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.init();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
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
.bottom {
  margin-top: 13px;
  line-height: 12px;
  float: right;
}
.image{
  width: 20%;
}
.loc{
  float: right;
  margin-right: 20px;
}
</style>