<template>
  <n-descriptions label-placement="top" bordered>
    <n-descriptions-item label="任务编号"> {{ task.code }} </n-descriptions-item>
    <n-descriptions-item label="任务类型"> {{ task.type }} </n-descriptions-item>
    <n-descriptions-item label="任务状态">
      <n-select
        :value="task.status"
        :options="statusOptions"
        @update:value="statusChange"
        size="small"
      />
    </n-descriptions-item>
    <n-descriptions-item label="优先级"> {{ task.priority }} </n-descriptions-item>
    <n-descriptions-item label="创建人"> {{ task.created_by }} </n-descriptions-item>
    <n-descriptions-item label="创建时间">
      <n-time :time="new Date(task.created_at)" type="relative" />
    </n-descriptions-item>
    <n-descriptions-item label="负责人员">
      {{ task.owner || '-' }}
    </n-descriptions-item>
    <n-descriptions-item label="关联需求">
      <n-button v-for="d in task.demands" :key="d.id" text>{{ d.name }}</n-button>
    </n-descriptions-item>
    <n-descriptions-item label="关联系统">
      {{ task.system || '-' }}
    </n-descriptions-item>
    <n-descriptions-item label="任务描述" :span="3">
      {{ task.description }}
    </n-descriptions-item>
    <n-descriptions-item label="文档链接" :span="3">
      {{ task.document_link || '-' }}
    </n-descriptions-item>
    <n-descriptions-item label="附件" :span="3">
      <span v-if="!task.media.length">-</span>
      <div v-else v-for="m in task.media" :key="m.uuid">
        <n-button text tag="a" href="" target="_blank" type="primary">
          {{ m.name }}
        </n-button>
      </div>
    </n-descriptions-item>
  </n-descriptions>
</template>

<script setup>
import { computed } from 'vue'
import {
  NDescriptions,
  NDescriptionsItem,
  NSelect,
  NButton,
  NTime,
  useMessage
} from 'naive-ui'
import { useTaskStore } from '@/stores/task'

const store = useTaskStore()
const message = useMessage()

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const task = computed(() => props.task)

const statusOptions = [
  { label: '未开始', value: 'not_started' },
  { label: '处理中', value: 'in_progress' },
  { label: '已提交', value: 'submitted' },
  { label: '已关闭', value: 'closed' },
  { label: '已完成', value: 'completed' }
]

const statusChange = (val) => {
  store.fetchTaskStatusUpdate(task.value.id, {
    status: val
  })
  message.success('任务状态更新成功')
}
</script>

<style lang="scss" scoped>
.n-tag {
  margin-left: 10px;
}
</style>
