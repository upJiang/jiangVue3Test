<template>
  <p style="margin-top: 20px;">测试i18n：{{ $t("message.hello") }}</p>
  <span>测试vuex：{{ age }}</span>
  <a-button type="primary" @click="addAge" style="margin-left: 26px"
    >点击age++(这是ant-design组件)</a-button
  >
  <div style="margin-top: 20px">测试全局变量，且符合ts：{{ $TRACK }}</div>
  <a-button type="primary" @click="clickThrowError" style="margin-top: 20px"
    >点击抛出错误，测试sentry</a-button
  >

  <div style="margin-top: 50px">
    <b-button text="最简单的导入组件"></b-button>
  </div>

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

  <div style="margin-top: 20px">
    <a-button @click="clickMock"
      >点击mock请求，并且在request.ts文件中使用自定义全局函数组件弹窗</a-button
    >
  </div>
  <div style="margin-top: 20px">
    <a-button @click="clickAllLoading">点击测试多个请求实现loading</a-button>
  </div>

  <div style="margin-top: 20px">
    <a-button @click="router.push('/JsxTest')">点击跳转到Jsx测试页面</a-button>
  </div>

  <div style="margin-top: 20px">
    这是组件库jiang-vui的组件：
    <my-button @submitCallback="submitCallback"></my-button>
  </div>
</template>
<script setup>
import { getCurrentInstance, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { key } from "@/store";
import request from "@/config/request";
import BButton from "@/components/import/BButton.vue";
import { MyButton } from "jiang-vui";
import { requestTest1, requestTest2 } from "@/api/apiTest";

console.log("MyButton0", MyButton);
const submitCallback = () => {
  console.log("组件库点击回调");
};

const router = useRouter();
const store = useStore(key); // 调用 vuex 的 Composition API 获取 store ，相当于 $store
const age = computed(() => store.getters["user/age"]);
const addAge = () => store.dispatch("user/addAge", 1);
const { proxy } = getCurrentInstance();
// console.log("全局变量 $TRACK", proxy.$TRACK);
// console.log("env变量VITE_BASE_URL", import.meta.env.VITE_BASE_URL);

const clickThrowError = () => {
  throw new Error("抛出错误");
};

const clickOpenFunComponent = () => {
  proxy.$TipsDialog({
    handleOk: (str) => {
      console.log("点击成功，可以在此处做回调操作。" + str);
    },
  });
};

const clickMock = async () => {
  await request({
    url: "/mock/getUser",
    method: "GET",
  });
};

const clickAllLoading = () => {
  requestTest1({}, true).then((res) => {
    console.log("请求1完成",res);
  });
  requestTest2({}, true).then((res) => {
    console.log("请求2完成",res);
  });
};
</script>
