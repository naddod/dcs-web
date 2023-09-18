<template>
  <n-h2>数据统计</n-h2>
  <n-grid x-gap="24" :cols="5">
    <n-gi v-for="(s, i) in statistics" :key="i">
      <n-card>
        <n-statistic :label="getStatusName(i) + `任务`"> {{ s }}</n-statistic>
      </n-card>
    </n-gi>
  </n-grid>
  <n-h2> 我发布的 </n-h2>
  <n-grid v-if="createds.length" x-gap="12" :cols="4">
    <n-gi v-for="c in createds" :key="c.id" class="card-item">
      <DemandCard :demand="c" />
    </n-gi>
  </n-grid>
  <n-empty v-else size="huge" description="暂无需求"></n-empty>
</template>

<script setup>
import { NH2, NGrid, NGi, NCard, NStatistic, NEmpty } from 'naive-ui'
import { getMyDemands, getDemandUserStatistics } from '@/api/demand'
import { ref, watch } from 'vue'
import { useDemandStore } from '@/stores/demand'
import DemandCard from './components/DemandCard.vue'
import { demandStatus } from '@/utils/constant'

const store = useDemandStore()
const createds = ref([])
const statistics = ref([])

const fetchCreated = async () => {
  const { data } = await getMyDemands()
  createds.value = data.data
}

const fetchMyStatistics = async () => {
  const { data } = await getDemandUserStatistics()
  statistics.value = data
}

const fetchMine = async () => {
  await Promise.all([fetchCreated(), fetchMyStatistics()])
}

const getStatusName = (status) => {
  return demandStatus.find((s) => s.value === status).label
}

fetchMine()

watch(
  () => store.demand,
  async (val) => {
    if (!val) await fetchMine()
  }
)
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;
}
.card-item {
  margin-bottom: 12px;
}
</style>
