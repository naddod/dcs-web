<template>
  <n-h2>需求总览</n-h2>
  <n-grid x-gap="24" :cols="5">
    <n-gi v-for="(s, i) in statistics" :key="i">
      <n-card>
        <n-statistic :label="getStatusName(i) + `任务`"> {{ s }}</n-statistic>
      </n-card>
    </n-gi>
  </n-grid>
  <n-divider />
  <div class="filters">
    <n-select v-model:value="filterType" :options="typeOptions" @update:value="typeChange" />
    <n-select v-model:value="filterStatus" :options="statusOptions" @update:value="statusChange" />
    <n-button @click="getDemands">刷新</n-button>
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
import { useRouter } from 'vue-router'
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
import { useDemandStore } from '@/stores/demand'
import { getDemandList } from '@/api/demand'
import { demandStatus, demandUrgency } from '@/utils/constant'
import { getDemandStatistics } from '@/api/demand'

const router = useRouter()
const store = useDemandStore()

const columns = [
  { title: '需求名称', key: 'name' },
  { title: '需求编号', key: 'code' },
  { title: '需求类型', key: 'type' },
  {
    title: '紧急程度',
    key: 'urgency',
    render(row) {
      return demandUrgency.find((u) => u.value === row.urgency).label
    }
  },
  { title: '关联系统', key: 'system' },
  {
    title: '状态',
    key: 'status',
    render(row) {
      return demandStatus.find((s) => s.value === row.status).label
    }
  },
  {
    title: '创建时间',
    key: 'created_at',
    render(row) {
      return h(NTime, {
        type: 'relative',
        time: new Date(row.created_at)
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
          onClick: () => showDemand(row)
        },
        { default: () => '查看' }
      )
    }
  }
]

const list = ref([])
const loading = ref(false)

const getDemands = async (page = 1, type_id = '', status = '') => {
  loading.value = true
  const { data } = await getDemandList(page, type_id, status)
  list.value = data.data
  pagination.pageCount = data.meta.pagination.total_pages
  loading.value = false
}

const showDemand = (row) => {
  router.push('#demand=' + row.id)
}

const pagination = reactive({
  page: 1,
  pageCount: 0,
  onChange: async (page) => {
    await getDemands(page)
    pagination.page = page
  }
})

const filterType = ref('')
const typeOptions = computed(() => [
  { label: '全部类型', value: '' },
  ...store.demandTypes.map((t) => {
    return {
      label: t.name,
      value: t.id
    }
  })
])
const typeChange = (value) => {
  getDemands(1, value, filterStatus.value)
}

const filterStatus = ref('')
const statusOptions = [{ label: '全部状态', value: '' }, ...demandStatus]

const statusChange = (value) => {
  getDemands(1, filterType.value, value)
}

const statistics = ref([])
const fetchStatistics = async () => {
  const { data } = await getDemandStatistics()
  statistics.value = data
}

const getStatusName = (status) => {
  return demandStatus.find((s) => s.value === status).label
}

Promise.all([fetchStatistics(), getDemands()])

watch(
  () => store.demand,
  async (val) => {
    if (!val) await getDemands()
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
