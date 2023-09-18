<template>
  <n-descriptions label-placement="top" bordered>
    <n-descriptions-item label="需求编号"> {{ demand.code }} </n-descriptions-item>
    <n-descriptions-item label="需求类型"> {{ demand.type }} </n-descriptions-item>
    <n-descriptions-item label="需求状态">
      <n-select
        :value="demand.status"
        :options="demandStatus"
        @update:value="statusChange"
        size="small"
      />
    </n-descriptions-item>
    <n-descriptions-item label="紧急程度"> {{ demand.urgency }} </n-descriptions-item>
    <n-descriptions-item label="创建人"> {{ demand.created_by }} </n-descriptions-item>
    <n-descriptions-item label="创建时间">
      <n-time :time="new Date(demand.created_at)" type="relative" />
    </n-descriptions-item>
    <n-descriptions-item label="关联系统" :span="1">
      {{ demand.system || '-' }}
    </n-descriptions-item>
    <n-descriptions-item label="关联人员" :span="2">
      <span v-if="!demand.assigns.length">-</span>
      <span v-else v-for="u in demand.assigns" :key="u.id">{{ u.name }}</span>
    </n-descriptions-item>
    <n-descriptions-item label="需求描述" :span="3">
      {{ demand.description }}
    </n-descriptions-item>
    <n-descriptions-item label="文档链接" :span="3">
      {{ demand.document_link || '-' }}
    </n-descriptions-item>
    <n-descriptions-item label="附件" :span="3">
      <span v-if="!demand.media.length">-</span>
      <div v-else v-for="m in demand.media" :key="m.uuid">
        <n-button text tag="a" href="" target="_blank" type="primary">
          {{ m.name }}
        </n-button>
      </div>
    </n-descriptions-item>
  </n-descriptions>
</template>

<script setup>
import { computed } from 'vue'
import {
  NDescriptions,
  NDescriptionsItem,
  NSelect,
  NButton,
  NTime,
  useMessage
} from 'naive-ui'
import { useDemandStore } from '@/stores/demand'
import { demandStatus } from '@/utils/constant'

const store = useDemandStore()
const message = useMessage()

const props = defineProps({
  demand: {
    type: Object,
    required: true
  }
})

const demand = computed(() => props.demand)

const statusChange = (val) => {
  store.fetchDemandStatusUpdate(demand.value.id, {
    status: val
  })
  message.success('需求状态更新成功')
}
</script>

<style lang="scss" scoped>
.n-tag {
  margin-left: 10px;
}
</style>
