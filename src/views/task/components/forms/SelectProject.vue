<template>
    <n-alert title="搜索项目" type="info">
      请在下面搜索框中输入项目名称或者项目编号进行选择，并点击确认，支持模糊匹配
    </n-alert>
    <n-select
      v-model:value="projectId"
      filterable
      placeholder="搜索项目"
      :options="options"
      :loading="loading"
      clearable
      remote
      :clear-filter-after-select="false"
      @search="handleSearch"
      size="large"
    />
    <n-button @click="confirm" type="info" block>确认</n-button>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { NSelect, NAlert, NButton } from 'naive-ui'
  import { searchProject } from '@/api/project'
  
  const projectId = ref(null)
  
  const loading = ref(false)
  const options = ref([])
  
  const handleSearch = async (query) => {
    if (!query) return
    loading.value = true
    await searchProject({ keyword: query }).then((res) => {
      options.value = res.data.data.map((item) => {
        return {
          label: item.name + ' - ' + item.code,
          value: item.id
        }
      })
      loading.value = false
    })
  }
  
  const emit = defineEmits(['setProject'])
  
  const confirm = () => {
    if (!projectId.value) return
    emit('setProject', {
      id: projectId,
      name: options.value.find((item) => item.value === projectId.value).label
    })
  }
  </script>
  
  <style scoped>
  .n-select {
    margin: 24px 0;
  }
  </style>
  