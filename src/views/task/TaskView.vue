<template>
  <n-layout has-sider>
    <n-layout-sider width="240" bordered>
      <TaskMenu @createTask="showForm" @createProject="showProjectForm" />
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <RouterView />
    </n-layout-content>
  </n-layout>
  <TaskFormModal v-model:show="taskFormShow" :task="editTask" />
  <TaskDetails @editTask="showForm" />
  <ProjectFormModal v-model:show="projectFormShow" :task="editProject" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { NLayout, NLayoutSider, NLayoutContent, useMessage } from 'naive-ui'
import TaskMenu from './components/TaskMenu.vue'
import TaskFormModal from './components/TaskFormModal.vue'
import TaskDetails from './components/TaskDetails.vue'
import { useTaskStore } from '../../stores/task'
import ProjectFormModal from './components/ProjectFormModal.vue'

const store = useTaskStore()
const route = useRoute()

window.$message = useMessage()

const taskFormShow = ref(false)
const editTask = ref(null)
const showForm = (task = null) => {
  editTask.value = task
  taskFormShow.value = true
}

const projectFormShow = ref(false)
const editProject = ref(null)
const showProjectForm = (task = null) => {
  editProject.value = task
  projectFormShow.value = true
}

watch(
  () => route.hash,
  (hash) => {
    if (hash) handleHashChange()
  }
)

watch(
  () => store.task,
  (val) => {
    if (!val) window.location.hash = ''
  }
)

const handleHashChange = () => {
  const hash = window.location.hash.slice(1) // 去掉开头的 #
  const params = hash.split('&').reduce((result, item) => {
    const [key, value] = item.split('=')
    result[key] = value
    return result
  }, {})
  // 如果有 task 参数，打开需求详情抽屉
  if (params.task) {
    store.showTask(params.task)
  }
}

handleHashChange()
</script>
