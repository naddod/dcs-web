<template>
  <n-scrollbar ref="comments" class="comments" style="max-height: 480px">
    <div class="comment-item" v-for="c in task.comments" :key="c.id">
      <div class="left">
        <n-avatar>{{ c.user }}</n-avatar>
      </div>
      <div class="right">
        <div class="spec">
          <span>{{ c.user }}</span>
          <n-time :time="new Date(c.created_at)"></n-time>
        </div>
        <div class="msg">{{ c.content }}</div>
      </div>
    </div>
  </n-scrollbar>
  <n-input v-model:value="content" type="textarea" />
  <n-button
    class="comment-button"
    type="primary"
    :loading="btnLoading"
    @click="createComment"
    block
  >
    添加回复
  </n-button>
</template>

<script setup>
import { ref } from 'vue'
import { NInput, NButton, NAvatar, NTime, NScrollbar } from 'naive-ui'
import { useTaskStore } from '@/stores/task'

const store = useTaskStore()

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const content = ref('')
const comments = ref(null)
const btnLoading = ref(false)
const createComment = async () => {
  if (!content.value) return
  try {
    btnLoading.value = true
    await store.fetchTaskCommentCreate(props.task.id, { content: content.value })
    content.value = ''
    comments.value.scrollTo({ behavior: 'smooth', top: 10000 })
    btnLoading.value = false
  } catch (error) {
    btnLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.comments {
  .comment-item {
    display: flex;
    margin-bottom: 10px;
    .left {
      margin-right: 20px;
    }
    .right {
      width: 100%;
      .spec {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #999;
        margin-bottom: 5px;
      }
      .msg {
        display: inline-block;
        padding: 10px;
        border-radius: 5px;
        background-color: #f5f5f5;
        margin-bottom: 10px;
      }
    }
  }
}
.comment-button {
  margin-top: 16px;
}
</style>
