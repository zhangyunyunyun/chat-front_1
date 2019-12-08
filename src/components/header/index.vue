<template>
  <div class="headerOfChat">
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  name: "chatHeader",
  props: {
    title: {
      type: String,
      default: "网页聊天"
    }
  }
};
</script>
<style scoped>
.span {
  width: 100%;
  height: 60px;
  /* font-size: 50px;
    text-align: center; */
}
.headerOfChat {
  text-align: center;
  background: #409EFF;
  height: 30px;
}
</style>
