<template>
  <div>
    <div v-if="findList !== []">
      <el-card class="box-card" shadow="hover" v-for="data in findList" :key="data.id">
        <div slot="header" class="clearfix">
          <span>{{data.fromUserId}}</span>
          <el-button
            primary
            style="float: right; padding: 3px 6px; "
            @click="sendRequest(data.id, 2, data.friendTypeId)"
          >不同意</el-button>
          <el-button
            style="float: right; padding: 3px 6px;"
            @click="sendRequest(data.id, 1, data.friendTypeId)"
          >同意</el-button>
        </div>
        <div v-for="item in 1" :key="item" class="text item">{{'用户昵称：' + data.fromUserId }}</div>
      </el-card>
    </div>
    <div v-else>没有相关用户信息</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import service from "@/utils/request";
import { solveRequest } from "@/api/friendOperation";
import MessageBox from "element-ui";

export default {
  name: "friendResquestedResult",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["toSearchMe"]),
    findList: function() {
      return this.toSearchMe;
    }
    // userid: function() {
    //   return this.userId;
    // }
  },
  mounted() {
    console.info("!!!!!!!!!!!!!!!", this.findList);
  },
  methods: {
    //处理好友申请,!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!这里的toTypeId暂时还没定好
    sendRequest(id, status, fromTypeId, toTypeId) {  //fromTypeId是自己的，toTypeId是好友的分组信息？？？？？？？？？？？？？？？？？？
      if (status === 1) {
        status = "1";
      } else if (status === 2) {
        status = "2";
      }
      solveRequest(id, status, fromTypeId, "7") //同意添加好友，最后是添加的分组,最后还没改？？？？？？？？？？？？？？
        .then(response => {
          let data = response.data.data;
          // console.log("返回的申请添加好友的提示代号", data);
          if (data === "1") {
            this.$message({
              message: "操作已经成功",
              type: "success"
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
