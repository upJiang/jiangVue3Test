<template>
  <p>测试i18n：{{ $t("message.hello") }}</p>
  <span>测试vuex：{{ age }}</span>
  <a-button type="primary" @click="addAge" style="margin-left: 26px"
    >点击age++(这是ant-design组件)</a-button
  >
  <div style="margin-top: 20px">测试全局变量，且符合ts：{{ $TRACK }}</div>
  <a-button type="primary" @click="clickThrowError" style="margin-top: 20px"
    >点击抛出错误，测试sentry</a-button
  >

  <div style="margin-top: 20px">
    <d-back-button
      text="这是全局导入的自定义组件，不需要在页面中单独导入"
    ></d-back-button>
  </div>

  <div style="margin-top: 20px">
    <a-button @click="clickOpenFunComponent"
      >这是自定义全局函数组件，点击打开</a-button
    >
  </div>

</template>
<script setup>
import { getCurrentInstance, computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import homeApi from "./home";

const store = useStore(key); // 调用 vuex 的 Composition API 获取 store ，相当于 $store
const age = computed(() => store.getters["user/age"]);
const addAge = () => store.dispatch("user/addAge", 1);
const { proxy } = getCurrentInstance();
console.log("全局变量 $TRACK", proxy.$TRACK);
console.log("env变量VITE_BASE_URL", import.meta.env.VITE_BASE_URL);

const clickThrowError = () => {
  throw new Error("抛出错误");
};

const clickOpenFunComponent = () => {
  proxy.$TipsDialog({
    handleOk: () => {
      console.log("点击成功");
    },
  });
};


</script>
<style scoped></style>
