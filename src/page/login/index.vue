<template>
  <div>
    <Header title="登陆页面" />
    <div>
      <el-form ref="ruleForm1" :model="ruleForm1" :rules="rules1">
        <el-form-item class="input_outer" prop="userName">
          <el-input
            placeholder="请输入账号"
            v-model="ruleForm1.userName"
            auto-complete="on"
            style="margin-top:100px "
          ></el-input>
        </el-form-item>
        <el-form-item class="input_outer" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="ruleForm1.password"
            type="password"
            auto-complete="on"
            style="margin-top:50px "
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item class="login">
          <el-button
            type="primary"
            plain
            :loading="loading"
            @click.native.prevent="handleLogin"
          >登陆</el-button>
          <el-button
            type="primary"
            plain
            @click="gotoRegister"
          >注册</el-button>
        </el-form-item>
      </el-form>
      <!-- <p @click="gotoRegister" style="margin-left:43.5%">没有帐号，注册一个</p> -->
    </div>
    <!-- <keep-alive>
      <router-view />
    </keep-alive>-->
  </div>
</template>

<script>
import Header from "@/components/header";
import { isvalidUserName } from "@/utils/validate";
import { callbackify } from "util";
import mapActions from "vuex"

export default {
  name: "loginPage",
  components: {
    Header
  },
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入合法用户"));
      } else if (isvalidUserName(value) === false) {
        callback(new Error("输入的用户名格式不对"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };

    return {
      ruleForm1: {
        userName: "",
        password: ""
      },
      rules1: {
        userName: [{ validator: validateUsername, trigger: "change" }],
        password: [{ validator: validatePass, trigger: "change" }]
      },
      loading: false
    };
  },

  methods: {
    // ...mapActions([
    //   'Login'
    // ]),
    gotoRegister() {
      this.$router.push({ path: "/register" });
    },
    handleLogin() {
      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      this.$refs.ruleForm1.validate(valid => {
        if (valid) {
          // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          this.loading = true;
          this.$store
            .dispatch("Login", this.ruleForm1) //调用的是store里面的Login函数，传入参数是自己的表单
            .then(() => {
              // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
              this.loading = false;
              // console.log("跳转主页！！！！！！！！！！！！！！！！！")
              this.$router.push({ path: "/home" }); //这儿有问题，之后改路由的时候好好看看！
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("参数验证不合法");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.input_outer {
  width: 50%;
  margin-left: 25%;
  position: relative;
}
.logButton {
  text-decoration: none;
}
.login {
  margin-left:45%;
  margin-right:0 auto;
  margin-top: 100px;
  /* margin-left: 48; */
  text-decoration: none;
}
/* #registerBtn {
  margin-left: 48%;
  text-decoration: none;
} */
</style>
