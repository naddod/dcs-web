<script setup>
import { h, ref, onMounted, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { NLayoutHeader, NMenu, NGradientText, NTag, NButton, NDropdown } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()
const authUser = computed(() => store.user)

const route = useRoute()
const router = useRouter()

const menuOptions = [
  {
    label: () => h(RouterLink, { to: '/demand' }, () => '需求管理'),
    key: 'demand'
  },
  {
    label: () => h(RouterLink, { to: '/task' }, () => '项目 & 任务管理'),
    key: 'task'
  },
  {
    label: () => h(RouterLink, { to: '/team' }, () => '团队管理'),
    key: 'team'
  }
]

const activeKey = ref(null)

const userOptions = [
  {
    label: '退出登录',
    key: 'logout',
    props: {
      onClick: async () => await logout()
    }
  }
]

const logout = async () => {
  await store.logout()
  location.reload()
}

onMounted(async () => {
  await router.isReady()
  if (route.name.indexOf('-') >= 0) {
    activeKey.value = route.name.substring(0, route.name.indexOf('-'))
  } else {
    activeKey.value = route.name
  }
})
</script>

<template>
  <n-layout-header class="header" bordered>
    <n-gradient-text> TASK </n-gradient-text>
    <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    <div v-if="authUser">
      <n-tag v-for="t in authUser.teams" :key="t" size="small">{{ t }}</n-tag>
      <n-dropdown trigger="hover" :options="userOptions">
        <n-button class="user" quaternary>{{ authUser.name }}</n-button>
      </n-dropdown>
    </div>
  </n-layout-header>
</template>

<style scoped>
.header {
  display: grid;
  grid-template-columns: calc(207px) 1fr auto;
  align-items: center;
  height: 64px;
  padding: 0 32px;
}
.user {
  margin-left: 10px;
}
.n-gradient-text {
  text-align: center;
  font-size: 28px;
  padding-right: 24px;
}
</style>
