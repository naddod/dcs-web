<template>
  <div class="create-button">
    <n-button style="margin-bottom: 12px" @click="showProjectForm" block> 新建项目 </n-button>
    <n-button type="info" @click="showForm" block> 新建任务 </n-button>
  </div>
  <n-menu v-model:value="activeKey" :options="menuOptions" />
</template>

<script setup>
import { h, ref, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { NMenu, NButton } from 'naive-ui'

const route = useRoute()
const router = useRouter()

const emit = defineEmits(['createTask', 'createProject'])
const showForm = () => {
  emit('createTask')
}
const showProjectForm = () => {
  emit('createProject')
}

const menuOptions = [
  {
    type: 'group',
    key: 'overview',
    label: '工作台',
    children: [
      {
        label: () => h(RouterLink, { to: '/task/my' }, () => '我的任务'),
        key: 'task-my'
      }
    ]
  },
  {
    type: 'group',
    label: '任务列表',
    key: 'task',
    children: [
      {
        label: () => h(RouterLink, { to: '/task/list' }, () => '任务列表'),
        key: 'task-list'
      }
    ]
  },
  {
    type: 'group',
    label: '项目管理',
    key: 'project',
    children: [
      {
        label: () => h(RouterLink, { to: '/task/project' }, () => '项目列表'),
        key: 'task-project'
      }
    ]
  }
]

const activeKey = ref(null)

onMounted(async () => {
  await router.isReady()
  activeKey.value = route.name
})
</script>

<style scoped>
.create-button {
  padding: 24px;
}
</style>
