<template>
  <n-alert title="搜索需求" type="success">
    请在下面搜索框中输入需求名称或者需求编号进行选择，并点击确认，支持模糊匹配
  </n-alert>
  <n-select
    v-model:value="demandId"
    filterable
    placeholder="搜索需求"
    :options="options"
    :loading="loading"
    clearable
    remote
    :clear-filter-after-select="false"
    @search="handleSearch"
    size="large"
  />
  <n-button @click="confirm" type="primary" block>确认</n-button>
</template>

<script setup>
import { ref } from 'vue'
import { NSelect, NAlert, NButton } from 'naive-ui'
import { searchDemand } from '@/api/demand'

const demandId = ref(null)

const loading = ref(false)
const options = ref([])

const handleSearch = async (query) => {
  if (!query) return
  loading.value = true
  await searchDemand({ keyword: query }).then((res) => {
    options.value = res.data.data.map((item) => {
      return {
        label: item.name + ' - ' + item.code,
        value: item.id
      }
    })
    loading.value = false
  })
}

const emit = defineEmits(['setDemand'])

const confirm = () => {
  if (!demandId.value) return
  emit('setDemand', {
    id: demandId,
    name: options.value.find((item) => item.value === demandId.value).label
  })
}
</script>

<style scoped>
.n-select {
  margin: 24px 0;
}
</style>
