<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 70%"
      :title="!project ? '新建项目' : '修改项目'"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <ProjectForm :project="project" @closeModal="hide" />
    </n-card>
  </n-modal>
</template>

<script setup>
import { NModal, NCard } from 'naive-ui'
import { computed } from 'vue'
import ProjectForm from './forms/ProjectForm.vue'

const props = defineProps({
  show: Boolean,
  project: {
    type: Object,
    default: () => null
  }
})

const emit = defineEmits(['update:show'])

const showModal = computed({
  get: () => props.show,
  set: (val) => {
    emit('update:show', val)
  }
})

const hide = () => {
  showModal.value = false
}
</script>

<style lang="scss" scoped></style>
