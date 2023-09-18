<template>
  <n-card>
    <template #header>
      <n-ellipsis>{{ task.name }}</n-ellipsis>
    </template>
    <div class="tags">
      <div class="info-tags">
        <n-tag size="small">{{ task.type }}需求</n-tag>
        <n-tag v-if="status" size="small" :type="status.tag">
          {{ status.label }}
        </n-tag>
      </div>
      <n-tag v-if="priority" :type="priority.tag" size="small">
        {{ priority.label }}
      </n-tag>
    </div>
    <n-thing>
      <template #description> </template>
      <div class="content">
        <span>{{ task.code }}</span>
      </div>
    </n-thing>
    <template #footer>
      <div class="footer">
        <n-button type="primary" text @click="showDetails(task.id)"> 查看详情 </n-button>
        <n-time :time="new Date(task.created_at)" type="relative"></n-time>
      </div>
    </template>
  </n-card>
</template>

<script setup>
import { NCard, NThing, NButton, NEllipsis, NTime, NTag } from 'naive-ui'
import { useRouter } from 'vue-router'
import { taskStatus, taskPriority } from '@/utils/constant'
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const status = computed(() => {
  return taskStatus.find((s) => s.value === props.task.status)
})
const priority = computed(() => {
  return taskPriority.find((s) => s.value === props.task.priority)
})

const showDetails = (id) => {
  router.push('#task=' + id)
}
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.n-tag {
  margin-right: 5px;
}
.content {
  display: flex;
  justify-content: space-between;
}
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
