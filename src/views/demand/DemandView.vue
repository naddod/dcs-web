<template>
  <n-layout has-sider>
    <n-layout-sider width="240" bordered>
      <DemandMenu @createDemand="showForm" />
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <RouterView />
    </n-layout-content>
  </n-layout>
  <DemandFormModal v-model:show="formShow" :demand="editDemand" />
  <DemandDetails @editDemand="showForm" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { NLayout, NLayoutSider, NLayoutContent, useMessage } from 'naive-ui'
import DemandMenu from './components/DemandMenu.vue'
import DemandDetails from './components/DemandDetails.vue'
import DemandFormModal from './components/DemandFormModal.vue'
import { useDemandStore } from '../../stores/demand'

const store = useDemandStore()
const route = useRoute()

window.$message = useMessage()

const formShow = ref(false)
const editDemand = ref(null)
const showForm = (demand = null) => {
  editDemand.value = demand
  formShow.value = true
}

watch(
  () => route.hash,
  (hash) => {
    if (hash) handleHashChange()
  }
)

watch(
  () => store.demand,
  (val) => {
    if (!val) window.location.hash = ''
  }
)

const handleHashChange = () => {
  const hash = window.location.hash.slice(1) // 去掉开头的 #
  const params = hash.split('&').reduce((result, item) => {
    const [key, value] = item.split('=')
    result[key] = value
    return result
  }, {})
  // 如果有 demand 参数，打开需求详情抽屉
  if (params.demand) {
    store.showDemand(params.demand)
  }
}

handleHashChange()
</script>
