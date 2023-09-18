<template>
  <n-drawer v-model:show="active" width="70%" placement="right">
    <n-drawer-content v-if="task" closable>
      <template #header>
        {{ task.name }}
        <n-tag v-if="status" size="small" :type="status.tag">
          {{ status.label }}
        </n-tag>
        <n-tag v-for="t in task.tags" :key="t" type="primary" size="small">{{ t }}</n-tag>
      </template>
      <n-tabs type="segment" animated>
        <n-tab-pane name="basic">
          <template #tab> 基本信息 </template>
          <BasicDetails :task="task" />
        </n-tab-pane>
        <n-tab-pane name="reply">
          <template #tab>
            讨论
            <n-badge :value="task.comments.length" />
          </template>
          <CommentDetails :task="task" />
        </n-tab-pane>
      </n-tabs>
      <template #footer>
        <n-button @click="editTask" type="info">修改任务</n-button>
        <n-button @click="active = false">关闭</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { NDrawer, NDrawerContent, NTabs, NTabPane, NButton, NTag, NBadge } from 'naive-ui'
import { computed } from 'vue'
import { useTaskStore } from '@/stores/task'
import BasicDetails from './details/BasicDetails.vue'
import CommentDetails from './details/CommentDetails.vue'
import { taskStatus } from '@/utils/constant'

const store = useTaskStore()

const task = computed(() => store.task)
const status = task.value ? taskStatus.find((s) => s.value === task.value.status) : null

const active = computed({
  get: () => !!store.task,
  set: (val) => {
    if (!val) {
      store.resetTask()
    }
  }
})

const emit = defineEmits(['editTask'])
const editTask = () => {
  emit('editTask', task.value)
}
</script>

<style scoped>
.n-button,
.n-tag {
  margin-left: 10px;
}
.n-badge {
  margin-left: 5px;
}
</style>
