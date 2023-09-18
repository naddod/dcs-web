<template>
  <n-space justify="center" align="center" size="large">
    <n-spin size="large">
      <template #description> 登陆中，请稍后 </template>
    </n-spin>
  </n-space>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { NSpace, NSpin } from 'naive-ui'

const store = useAuthStore()
const route = useRoute()
const router = useRouter()

const login = async () => {
  const { code } = route.query
  if (code) await store.login(code)
  router.push('/')
}

login()
</script>

<style scoped>
.n-space {
  height: 50vh;
}
</style>
