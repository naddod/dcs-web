<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 70%"
      :title="!task ? '新建任务' : '修改任务'"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <n-button v-if="createTypes && !task" text @click="resetCreate">返回</n-button>
      </template>
      <n-alert v-if="!createTypes" type="info">
        请选择关联的需求或者项目，或者直接创建独立任务
      </n-alert>
      <n-grid v-if="!createTypes" x-gap="12" :cols="3">
        <n-gi class="create-item" @click="selectType('demand')">
          <n-gradient-text type="success"> 从需求创建 </n-gradient-text>
        </n-gi>
        <n-gi class="create-item" @click="selectType('project')">
          <n-gradient-text type="info"> 从项目创建 </n-gradient-text>
        </n-gi>
        <n-gi class="create-item" @click="selectType('task')">
          <n-gradient-text type="warning"> 独立任务 </n-gradient-text>
        </n-gi>
      </n-grid>
      <TaskForm v-if="createTypes === 'task'" :task="task" :init="initTask" @closeModal="hide" />
      <SelectDemand v-if="createTypes === 'demand'" @setDemand="setDemand" />
      <SelectProject v-if="createTypes === 'project'" @setProject="setProject" />
    </n-card>
  </n-modal>
</template>

<script setup>
import { NModal, NCard, NGradientText, NGrid, NGi, NButton, NAlert } from 'naive-ui'
import { computed, ref, watch } from 'vue'
import TaskForm from './forms/TaskForm.vue'
import SelectDemand from './forms/SelectDemand.vue'
import SelectProject from './forms/SelectProject.vue'

const createTypes = ref(null)

const selectType = (type) => {
  createTypes.value = type
}

const initTask = ref({
  demand: null,
  project: null
})

const props = defineProps({
  show: Boolean,
  task: {
    type: Object,
    default: () => null
  }
})

const emit = defineEmits(['update:show'])

const showModal = computed({
  get: () => props.show,
  set: (val) => {
    emit('update:show', val)
    if (!val) resetCreate()
  }
})

const hide = () => {
  showModal.value = false
}

const setDemand = ({ id, name }) => {
  initTask.value.demand = { id, name }
  createTypes.value = 'task'
}

const setProject = ({ id, name }) => {
  initTask.value.project = { id, name }
  createTypes.value = 'task'
}

const resetCreate = () => {
  createTypes.value = null
  initTask.value = {
    demand: null,
    project: null
  }
}

watch(
  () => showModal.value,
  (val) => {
    if (val && props.task) createTypes.value = 'task'
  }
)
</script>

<style lang="scss" scoped>
.create-item {
  cursor: pointer;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #eee;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .n-gradient-text {
    font-size: 18px;
  }
}
.n-grid {
  padding: 20px 0 50px;
}
</style>
