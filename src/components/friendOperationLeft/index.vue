<template>
  <div >
    <!-- <el-scrollbar style="height:100% overflow:hidden position:relative"> -->
      <el-row style="height:100%">
        <!-- <el-scrollbar style="height:100% "> -->
          <el-col>
            <el-menu
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#409EFF"
              text-color="#fff"
              active-text-color="#ffd04b"
              margin-top="3px"
            >
              <h3 style="text-align:center">
                <a href="#/home" style="text-decoration:none">
                  <span >首页</span>
                </a>
              </h3>

              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>
                    <strong>好友操作</strong>
                  </span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/friendGroup">
                    <span @click="toPath0">新建好友分组</span>
                  </el-menu-item>
                  <el-menu-item index="/requestFriend">
                    <span @click="toPath1">添加新的好友</span>
                  </el-menu-item>
                  <el-menu-item index="/solveRequest">
                    <span @click="toPath2">查询好友申请并处理申请</span>
                  </el-menu-item>
                  <el-menu-item index="/acceptRejectFriend">
                    <span @click="toPath3">查询已处理的好友申请</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span @click="getFriendList()">
                    <strong>好友列表</strong>
                  </span>
                </template>
                <el-menu-item-group>
                  <div v-for="item in this.myFriendList" :key="item.id">
                    <el-menu-item index="/myFriendList">
                      <span @click="toPath(item.id)">{{item.typeName}}</span>
                    </el-menu-item>                
                  </div>
                </el-menu-item-group>
              </el-submenu>

              <!-- <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-more" />
                  <span>
                    <strong>其他操作</strong>
                  </span>
                </template>
                <el-menu-item index="3-1">聊天记录</el-menu-item>
                <el-menu-item index="3-1">退出登录</el-menu-item>
              </el-submenu> -->

              <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title" @click="logout()">登出</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        <!-- </el-scrollbar> -->
      </el-row>
    <!-- </el-scrollbar> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { logout_ } from "@/api/login";

export default {
  name: "sidebar",
  props: {},
  computed: {
    ...mapGetters(["myFriendList"])
  },
  // data() {
  //   return {
  //     myFriendList:this.$store.getters.myFriendList,
  //   }
  // },
  mounted() {
    // this.getFriendList()
    window.addEventListener('beforeunload', this.beforeunloadHandler())
  },
  created() {
    
  },
  destroyed(){
    window.removeEventListener('beforeunload', this.beforeunloadHandler())
  },
  methods: {
    beforeunloadHandler(){
      logout_(this.$store.getters.userId);
    },
    getFriendList() {
      this.$store
        .dispatch("GetMyFriendList", this.$store.getters.userId)
        .then(response => {
          // console.log("提交申请自己的好友列表成功");
        })
        .catch(error => {
          console.log("!!!!!!!!!!!!!!!!!", "error");
        });
    },
    logout(){
      this.$router.push({path:"/login"})
      logout_(this.$store.getters.userId);
    },
    handleOpen(key, keyPath) {
      // console.log("getted friend list", this.myFriendList);
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toPath0() {
      this.$router.push({ path: "/newFriendGroup" });
    },
    toPath1() {
      this.$router.push({ path: "/requestFriend" });
    },
    toPath3(){
      this.$router.push({path:"/acceptRejectFriend"});
    },
    toPath2() {
      this.$router.push({ path: "/solveRequest" });
    },
    toPath(groupid) {
      // console.log("跳转好友分组的groupid", groupid);
      this.$router.push({ name: "friendList", params: { groupId: groupid } });
    }
  }
};
</script>
<style scoped>
/* .el-scrollbar__wrap {
  overflow-x: hidden;
} */
</style>
