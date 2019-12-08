<template>
  <!-- <el-scrollbar> -->
    <div id="app">
      <router-view v-if="!$route.meta.keepAlive" />
      <el-container v-if="$route.meta.keepAlive">
        <!-- 页面头部 -->
        <el-header style="padding:0px; height:30px">
          <keep-alive>
            <Header></Header>
          </keep-alive>
        </el-header>

        <el-container>
          <!-- 下面是侧边栏 -->
          <!-- <el-scrollbar style="height:100%"> -->
            <el-aside width="300px">
              <keep-alive>
                <friendOperationLeft></friendOperationLeft>
              </keep-alive>
            </el-aside>
          <!-- </el-scrollbar> -->

          <!-- 下面的主体部分 -->
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  <!-- </el-scrollbar> -->
</template>

<script>
import Header from "@/components/header";
import friendOperationLeft from "@/components/friendOperationLeft";
// import { logout_ } from "@/api/login"

export default {
  name: "App",
  created() {},
  mounted(){
    // window.addEventListener('beforeunload', this.beforeunloadHandler())
    },
  destroyed(){
    // window.removeEventListener('beforeunload', this.beforeunloadHandler())
    // this.logout;
    },
  components: {
    Header,
    friendOperationLeft
  },
  methods: {
  },
};
</script>

<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: scroll;
}
*{
    margin:0;
    padding:0;
}
html,body{
    width:100% ;
    height:100%;
    font-size: 20px;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
/* div{
    width:100%;
    height:100%;
    } */
</style>
