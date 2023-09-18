<template>
  <div class="create-button">
    <n-button type="primary" @click="createDemand" block> 新建需求 </n-button>
  </div>
  <n-menu v-model:value="activeKey" :options="menuOptions" />
</template>

<script setup>
import { h, ref, onMounted, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { NMenu, NButton } from 'naive-ui'
import { getRecentDemands } from '@/api/demand'

const route = useRoute()
const router = useRouter()

const emit = defineEmits(['createDemand'])
const createDemand = () => {
  emit('createDemand')
}

const recentDemands = ref([])
const getRecents = async () => {
  const { data } = await getRecentDemands()
  recentDemands.value = data.data
}

const menuOptions = computed(() => {
  return [
    {
      type: 'group',
      label: '工作台',
      key: 'overview',
      children: [
        {
          label: () => h(RouterLink, { to: '/demand/my' }, () => '我的需求'),
          key: 'demand-my'
        },
        {
          label: () => h(RouterLink, { to: '/demand/list' }, () => '需求池'),
          key: 'demand-list'
        }
      ]
    },

    {
      type: 'group',
      label: '捷径',
      key: 'recent',
      children: recentDemands.value.map((r) => {
        return {
          label: () => h(RouterLink, { to: `#demand=${r.id}` }, () => r.name),
          key: `demand-${r.id}`
        }
      })
    }
  ]
})

getRecents()

const activeKey = ref(null)

onMounted(async () => {
  await router.isReady()
  activeKey.value = route.name
})
</script>

<style scoped>
.create-button {
  padding: 24px;
}
</style>
