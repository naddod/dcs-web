<template>
  <n-h2>我的任务</n-h2>
  <n-alert type="info">该模块只展示最近 20 条任务</n-alert>
  <div class="tabs">
    <n-tabs v-model:value="filterStatus" @update:value="fetchMyTask" type="line" size="large">
      <n-tab name=""> 全部 </n-tab>
      <n-tab v-for="ts in taskStatus" :key="ts.value" :name="ts.value">
        {{ ts.label }}
        <n-badge :value="statistics[ts.value]"></n-badge>
      </n-tab>
    </n-tabs>
    <div class="content">
      <n-grid v-if="tasks.length" x-gap="12" :cols="4">
        <n-gi v-for="t in tasks" :key="t.id" class="card-item">
          <MyTaskCard :task="t" />
        </n-gi>
      </n-grid>
      <n-empty v-else size="huge" description="暂无任务"></n-empty>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { NH2, NGrid, NGi, NBadge, NEmpty, NTabs, NTab, NAlert } from 'naive-ui'
import MyTaskCard from './components/MyTaskCard.vue'
import { useTaskStore } from '@/stores/task'
import { getMyTasks, getTaskUserStatistics } from '../../api/task'
import { taskStatus } from '../../utils/constant'

const store = useTaskStore()

const tasks = ref([])

const filterStatus = ref('')

const statistics = ref({})

const fetchMyStatistics = async () => {
  const { data } = await getTaskUserStatistics()
  statistics.value = data
}

const fetchMyTask = async () => {
  const params = filterStatus.value ? { status: filterStatus.value } : {}
  const { data } = await getMyTasks(params)
  tasks.value = data.data
}

const fetchMine = async () => {
  await Promise.all([fetchMyStatistics(), fetchMyTask()])
}

fetchMine()

watch(
  () => store.task,
  async (val) => {
    if (!val) await fetchMine()
  }
)
</script>

<style lang="scss" scoped>
.n-alert {
  margin-bottom: 12px;
}
.tabs {
  .n-tabs {
    margin-bottom: 12px;
    .n-badge {
      margin-left: 4px;
    }
  }

  .content {
    .card-item {
      margin-bottom: 12px;
    }
  }
}
</style>
