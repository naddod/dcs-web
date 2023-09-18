<template>
  <n-drawer v-model:show="active" width="70%" placement="right">
    <n-drawer-content v-if="demand" closable>
      <template #header>
        {{ demand.name }}
        <n-tag v-if="status" size="small" :type="status.tag">
          {{ status.label }}
        </n-tag>
        <n-tag v-for="t in demand.tags" :key="t" type="primary" size="small">{{ t }}</n-tag>
      </template>
      <n-tabs type="segment" animated>
        <n-tab-pane name="basic">
          <template #tab> 基本信息 </template>
          <BasicDetails :demand="demand" />
        </n-tab-pane>
        <n-tab-pane name="pandt">
          <PAndT :demand="demand" />
          <template #tab>
            项目 & 任务
            <n-badge :value="demand.projects.length + demand.tasks.length" />
          </template>
        </n-tab-pane>
        <n-tab-pane name="reply">
          <template #tab>
            讨论
            <n-badge :value="demand.comments.length" />
          </template>
          <CommentDetails :demand="demand" />
        </n-tab-pane>
      </n-tabs>
      <template #footer>
        <n-button @click="editDemand" type="info">修改需求</n-button>
        <n-button @click="active = false">关闭</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { NDrawer, NDrawerContent, NTabs, NTabPane, NButton, NTag, NBadge } from 'naive-ui'
import { computed } from 'vue'
import { useDemandStore } from '@/stores/demand'
import BasicDetails from './details/BasicDetails.vue'
import PAndT from './details/PAndT.vue'
import CommentDetails from './details/CommentDetails.vue'
import { demandStatus } from '@/utils/constant'

const store = useDemandStore()

const demand = computed(() => store.demand)
const status = demand.value ? demandStatus.find((s) => s.value === demand.value.status) : null

const active = computed({
  get: () => !!store.demand,
  set: (val) => {
    if (!val) {
      store.resetDemand()
    }
  }
})

const emit = defineEmits(['editDemand'])
const editDemand = () => {
  emit('editDemand', demand.value)
}
</script>

<style scoped>
.n-button,
.n-tag {
  margin-left: 10px;
}
.n-badge {
  margin-left: 5px;
}
</style>
