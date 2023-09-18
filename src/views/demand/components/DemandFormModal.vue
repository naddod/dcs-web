<template>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 70%"
      :title="!demand ? '新建需求' : '修改需求'"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <DemandForm :demand="demand" @closeModal="hide" />
    </n-card>
  </n-modal>
</template>

<script setup>
import { NModal, NCard } from 'naive-ui'
import { computed } from 'vue'
import DemandForm from './DemandForm.vue'

const props = defineProps({
  show: Boolean,
  demand: {
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
