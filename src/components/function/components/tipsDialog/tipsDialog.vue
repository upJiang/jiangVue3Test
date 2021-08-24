<template>
  <Modal
    v-model:visible="pageVisible"
    title="自定义全局函数组件"
    @ok="_sure"
    @cancel="pageVisible = false"
    :okText="okText"
  >
    {{content}}
  </Modal>
</template>

<script setup>
import { ref, watch } from "vue";
//自定义函数组件无法使用全局组件，需要单独引入
import { Modal } from "ant-design-vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  okText: {
    type: String,
    default: "确定",
  },
  handleOk: {
    type: Function, //成功回调
    default: null,
  },
  remove: {
    type: Function, //传入移除节点方法,这里是createApp中的方法
    default: null,
  },
  content:{
    type: String,
    default: "自定义全局函数组件......",
  }
});

const pageVisible = ref(false);
pageVisible.value = props.visible;
// 监听显示的消失，需要移除dom
watch(
  () => pageVisible.value,
  (val) => {
    !val && props.remove();
  }
);

// 确认
const _sure = () => {
  typeof props.handleOk === "function" && props.handleOk("组件参数");
  pageVisible.value = false;
};
</script>
