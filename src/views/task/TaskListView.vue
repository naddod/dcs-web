<template>
  <n-h2>任务总览</n-h2>
  <n-grid x-gap="24" :cols="5">
    <n-gi v-for="(s, i) in statistics" :key="i">
      <n-card>
        <n-statistic :label="getStatusName(i)"> {{ s }} </n-statistic>
      </n-card>
    </n-gi>
  </n-grid>
  <n-divider />
  <div class="filters">
    <n-select v-model:value="filterType" :options="typeOptions" @update:value="typeChange" />
    <n-select v-model:value="filterStatus" :options="statusOptions" @update:value="statusChange" />
    <n-button @click="getTasks">刷新</n-button>
  </div>
  <n-data-table
    :columns="columns"
    :data="list"
    :pagination="pagination"
    :remote="true"
    :loading="loading"
  />
</template>

<script setup>
import { h, ref, reactive, computed, watch } from 'vue'
import {
  NDataTable,
  NButton,
  NH2,
  NSelect,
  NTime,
  NGrid,
  NGi,
  NCard,
  NStatistic,
  NDivider
} from 'naive-ui'
import { useTaskStore } from '@/stores/task'
import { getTaskList, getTaskStatistics } from '@/api/task'
import { taskStatus, taskPriority } from '@/utils/constant'

const store = useTaskStore()

const columns = [
  { title: '任务名称', key: 'name' },
  { title: '任务编号', key: 'code' },
  { title: '任务类型', key: 'type' },
  {
    title: '优先级',
    key: 'priority',
    render(row) {
      return taskPriority.find((u) => u.value === row.priority)?.label
    }
  },
  { title: '关联系统', key: 'system' },
  {
    title: '状态',
    key: 'status',
    render(row) {
      return taskStatus.find((s) => s.value === row.status)?.label
    }
  },
  {
    title: '截止时间',
    key: 'deadline',
    render(row) {
      return h(NTime, {
        type: 'relative',
        time: new Date(row.deadline)
      })
    }
  },
  {
    title: '操作',
    key: 'action',
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: 'small',
          onClick: () => showTask(row)
        },
        { default: () => '查看' }
      )
    }
  }
]

const list = ref([])
const loading = ref(false)

const getTasks = async (page = 1, type_id = '', status = '') => {
  loading.value = true
  const { data } = await getTaskList(page, type_id, status)
  list.value = data.data
  pagination.pageCount = data.meta.pagination.total_pages
  loading.value = false
}

const showTask = (row) => {
  store.showTask(row.id)
}

const pagination = reactive({
  page: 1,
  pageCount: 0,
  onChange: async (page) => {
    await getTasks(page)
    pagination.page = page
  }
})

const filterType = ref('')
const typeOptions = computed(() => [
  { label: '全部类型', value: '' },
  ...store.taskTypes.map((t) => {
    return {
      label: t.name,
      value: t.id
    }
  })
])
const typeChange = (value) => {
  getTasks(1, value, filterStatus.value)
}

const filterStatus = ref('')
const statusOptions = [{ label: '全部状态', value: '' }, ...taskStatus]
const statusChange = (value) => {
  getTasks(1, filterType.value, value)
}

const statistics = ref({})
const getStatistics = async () => {
  const { data } = await getTaskStatistics()
  statistics.value = data
}
const getStatusName = (status) => {
  return taskStatus.find((s) => s.value === status).label
}

const initTaskList = async () => {
  Promise.all([getTasks(), getStatistics()])
}

initTaskList()

watch(
  () => store.task,
  async (val) => {
    if (!val) await initTaskList()
  }
)
</script>

<style scoped>
.filters {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.n-select {
  width: 200px;
  margin-right: 20px;
}
</style>
