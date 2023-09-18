<template>
  <n-card>
    <template #header>
      <n-ellipsis>{{ demand.name }}</n-ellipsis>
    </template>
    <div class="tags">
      <div class="info-tags">
        <n-tag size="small">{{ demand.type }}需求</n-tag>
        <n-tag v-if="status" size="small" :type="status.tag">
          {{ status.label }}
        </n-tag>
      </div>
      <n-tag v-if="urgency" :type="urgency.tag" size="small">
        {{ urgency.label }}
      </n-tag>
    </div>
    <n-thing>
      <template #description> </template>
      <div class="content">
        <span>{{ demand.code }}</span>
        <div v-if="demand.assigns.length">
          分配给：
          <span v-for="a in demand.assigns" :key="a.id">{{ a.name }}</span>
        </div>
        <div v-else>暂未分配</div>
      </div>
    </n-thing>
    <template #footer>
      <div class="footer">
        <n-button type="primary" text @click="showDetails(demand.id)"> 查看详情 </n-button>
        <n-time :time="new Date(demand.created_at)" type="relative"></n-time>
      </div>
    </template>
  </n-card>
</template>

<script setup>
import { NCard, NThing, NButton, NEllipsis, NTime, NTag } from 'naive-ui'
import { useRouter } from 'vue-router'
import { demandStatus, demandUrgency } from '@/utils/constant'
import { computed } from 'vue'

const props = defineProps({
  demand: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const status = computed(() => {
  return demandStatus.find((s) => s.value === props.demand.status)
})
const urgency = computed(() => {
  return demandUrgency.find((s) => s.value === props.demand.urgency)
})

const showDetails = (id) => {
  router.push('#demand=' + id)
}
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.n-tag {
  margin-right: 5px;
}
.content {
  display: flex;
  justify-content: space-between;
}
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
