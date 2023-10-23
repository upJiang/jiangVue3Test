<template>
  <a-button @click="clickBack" type="primary" plain> {{ text }} </a-button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  text: { type: String, default: '返回' },
  backLevel: {
    type: Number,
    default: 1,
  },
})

const router = useRouter()
const clickBack = () => {
  router.go(-props.backLevel)
}
</script>
