<template>
  <n-divider title-placement="left"> 关联项目 </n-divider>
  <div v-if="demand.projects.length">
    <n-descriptions class="task" v-for="p in demand.projects" :key="p.id" bordered :column="4">
      <n-descriptions-item label="名称" :span="4"> {{ p.name }} </n-descriptions-item>
      <n-descriptions-item label="编号"> {{ p.code }} </n-descriptions-item>
      <n-descriptions-item label="状态"> {{ p.status }} </n-descriptions-item>
      <n-descriptions-item label="发布时间">
        <n-time :time="new Date(p.created_at)" type="relative"></n-time>
      </n-descriptions-item>
      <n-descriptions-item label="操作">
        <n-button text type="primary">查看</n-button>
      </n-descriptions-item>
    </n-descriptions>
  </div>
  <n-empty description="暂无关联项目" />
  <n-divider title-placement="left"> 关联任务 </n-divider>
  <div v-if="demand.tasks.length">
    <n-descriptions
      class="task"
      v-for="t in demand.tasks"
      :key="t.id"
      :column="6"
      size="small"
      bordered
    >
      <n-descriptions-item label="名称" :span="6"> {{ t.name }} </n-descriptions-item>
      <n-descriptions-item label="编号"> {{ t.code }} </n-descriptions-item>
      <n-descriptions-item label="类型"> {{ t.type }} </n-descriptions-item>
      <n-descriptions-item label="状态"> {{ t.status }} </n-descriptions-item>
      <n-descriptions-item label="负责人"> {{ t.owner }} </n-descriptions-item>
      <n-descriptions-item label="发布时间">
        <n-time :time="new Date(t.created_at)" type="relative"></n-time>
      </n-descriptions-item>
      <n-descriptions-item label="操作">
        <n-button text type="primary" @click="toTask(t.id)">查看</n-button>
      </n-descriptions-item>
    </n-descriptions>
  </div>
  <n-empty v-else description="暂无关联任务" />
</template>

<script setup>
import { NEmpty, NDescriptions, NDescriptionsItem, NButton, NTime, NDivider } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  demand: {
    type: Object,
    required: true
  }
})

const toTask = (id) => {
  router.push(`/task#task=${id}`)
}
</script>

<style lang="scss" scoped>
.task {
  margin-bottom: 20px;
}
</style>
