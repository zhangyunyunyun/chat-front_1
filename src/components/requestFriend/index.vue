<template>
  <div>
    <el-form
      :model="ruleForm3"
      :rules="rules3"
      ref="ruleForm3"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="新的好友" prop="searchStr">
        <el-input
          v-model="ruleForm3.searchStr"
          placeholder="添加好友名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          @click="submitForm">查找</el-button>
        <el-button 
          @click="resetForm('ruleForm3')">重置</el-button>
      </el-form-item>
    </el-form>
    <hr />
    <router-view></router-view>
    <!-- <p v-if="findFriendList === []">没有相关用户</p>
    <div v-else>
      <el-card class="box-card" shadow="hover" v-for="data in findFriendList" :key="data.id">
        <div slot="header" class="clearfix">
          <span>{{data.userName}}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="sendRequest(data.id, userId)"
          >发送请求</el-button>
        </div>
        <div v-for="item in data" :key="item" class="text item">{{'用户信息：' + item }}</div>
      </el-card>
    </div>-->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import service from "@/utils/request";
import { requestFriend, searchFriend } from "@/api/friendOperation";
import MessageBox from "element-ui";

export default {
  name: "requsetFriend",
  data() {
    let validateSearch = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("好友申请不能为空"));
      } else {
        callback();
      }
    };
    return {
      // findFriendList: [],
      ruleForm3: {
        searchStr: ""
      },
      rules3: {
        searchStr: [{ validator: validateSearch, trigger: "change" }]
      }
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },
  //发送请求申请添加好友
  methods: {
    //查找是否存在好友
    submitForm() {
      this.$refs.ruleForm3.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("SearchFriend", this.ruleForm3.searchStr)
            .then(response => {
              // let findFriendList = response.data.data;
              this.$router.push({ path: "/requestFriend/result" });
            })
            .catch(err => {
              console.log("!!!!!!!!!!!!!!!", err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
