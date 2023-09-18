<template>
  <n-menu v-model:value="activeKey" :options="menuOptions" />
</template>

<script setup>
import { h, ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { NMenu } from 'naive-ui'
import { useTeamStore } from '@/stores/team'

const route = useRoute()
const router = useRouter()

const menuOptions = computed(() => [
  {
    type: 'group',
    label: '工作台',
    key: 'overview',
    children: [
      {
        label: () => h(RouterLink, { to: '/team/overview' }, () => '总览'),
        key: 'team-overview'
      }
    ]
  },
  {
    type: 'group',
    label: '团队列表',
    key: 'teams',
    children: useTeamStore().teams.map((i) => {
      return {
        label: i.name,
        key: i.id
      }
    })
  }
])

const activeKey = ref(null)

onMounted(async () => {
  await router.isReady()
  activeKey.value = route.name
})
</script>

<style scoped></style>
