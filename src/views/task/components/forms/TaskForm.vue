<template>
  <n-form
    ref="taskFormRef"
    :model="model"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-form-item v-if="init.demand" label="关联需求">
      {{ init.demand.name }}
    </n-form-item>
    <n-form-item v-if="init.project" label="关联项目">
      {{ init.project.name }}
    </n-form-item>
    <n-form-item label="任务类型" path="type_id">
      <n-radio-group v-model:value="model.type_id" name="type_id">
        <n-radio v-for="type in types" :value="type.id" :key="type.id">
          {{ type.name }}
        </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="任务名称" path="name">
      <n-input v-model:value="model.name" placeholder="请输入" />
    </n-form-item>
    <n-form-item label="任务描述" path="description">
      <n-input
        v-model:value="model.description"
        placeholder="请输入"
        type="textarea"
        :autosize="{ minRows: 3 }"
      />
    </n-form-item>
    <n-form-item label="文档链接" path="document_link">
      <n-input v-model:value="model.document_link" placeholder="请输入" />
    </n-form-item>
    <n-form-item label="优先级别" path="priority">
      <n-radio-group v-model:value="model.priority" name="priority">
        <n-radio value="normal"> 正常 </n-radio>
        <n-radio value="urgent"> 紧急 </n-radio>
        <n-radio value="very_urgent"> 十分紧急 </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="截止时间" path="deadline">
      <n-date-picker
        v-model:formatted-value="model.deadline"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
      />
    </n-form-item>
    <n-form-item label="关联系统" path="system_id">
      <n-radio-group v-model:value="model.system_id" name="system_id">
        <n-radio v-for="sys in systems" :value="sys.id" :key="sys.id">
          {{ sys.name }}
        </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="关联人员" path="owner_id">
      <n-select v-model:value="model.owner_id" :options="users" filterable />
    </n-form-item>
    <n-form-item label="打上标签" path="tags">
      <n-dynamic-tags v-model:value="model.tags" />
    </n-form-item>
    <n-form-item label="附件上传" path="media">
      <n-upload :multiple="true" v-model:file-list="model.media">
        <n-button>点击此按钮选择上传文件</n-button>
      </n-upload>
    </n-form-item>
    <div style="display: flex; justify-content: flex-end">
      <n-button type="info" @click="submitForm">提交任务</n-button>
    </div>
  </n-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  useMessage,
  NForm,
  NFormItem,
  NInput,
  NRadioGroup,
  NUpload,
  NRadio,
  NSelect,
  NDatePicker,
  NDynamicTags,
  NButton
} from 'naive-ui'
import { useTaskStore } from '@/stores/task'
import { useSystemStore } from '@/stores/system'
import { useUserStore } from '@/stores/user'

const store = useTaskStore()
const message = useMessage()
const taskFormRef = ref(null)

const types = computed(() => store.taskTypes)
const systems = computed(() => useSystemStore().systems)
const users = computed(() =>
  useUserStore().users.map((u) => {
    return {
      label: u.name,
      value: u.id
    }
  })
)

const props = defineProps({
  task: {
    type: Object,
    default: () => null
  },
  init: {
    type: Object,
    default: () => {
      return { demand: null, project: null }
    }
  }
})

const model = ref({
  demand_id: '',
  project_id: '',
  type_id: '',
  name: '',
  description: '',
  document_link: '',
  system_id: '',
  priority: '',
  deadline: null,
  owner_id: '',
  tags: [],
  media: []
})

if (props.task) {
  Object.assign(model.value, {
    type_id: props.task.type_id,
    name: props.task.name,
    description: props.task.description,
    document_link: props.task.document_link || '',
    system_id: props.task.system_id || '',
    priority: props.task.priority,
    deadline: props.task.deadline,
    owner_id: props.task.owner_id,
    tags: props.task.tags
  })
  model.value.media = props.task.media.map((m) => {
    return {
      id: m.id,
      name: m.name,
      // url: m.url,
      status: 'finished'
    }
  })
}

const rules = {
  type_id: {
    required: true,
    type: 'integer',
    trigger: ['change', 'blur'],
    message: '请选择类型'
  },
  name: {
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入名称'
  },
  description: {
    required: true,
    message: '请输入需求描述',
    trigger: ['input', 'blur']
  },
  priority: {
    required: true,
    message: '请选择优先级别',
    trigger: ['change', 'blur']
  },
  deadline: {
    required: true,
    trigger: ['change', 'blur'],
    message: '请选择截止时间'
  },
  owner_id: {
    required: true,
    type: 'integer',
    trigger: ['change', 'blur'],
    message: '请选择处理人'
  }
}

// 定义 'closeModal' emit 事件
const emit = defineEmits(['closeModal'])

const submitForm = async (e) => {
  e.preventDefault()
  taskFormRef.value.validate(async (err) => {
    if (err) return
    else await fetchSubmit()
  })
}

const fetchSubmit = async () => {
  const formData = buildForm()
  // 判断是新建还是更新
  if (props.task) {
    // 更新
    await store
      .fetchTaskUpdate(props.task.id, formData)
      .then(() => {
        resetForm()
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    // 新建
    await store
      .fetchTaskCreate(formData)
      .then(() => {
        resetForm()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const buildForm = () => {
  const formData = new FormData()
  if (props.init.demand) formData.append('demand_id', props.init.demand.id)
  if (props.init.project) formData.append('project_id', props.init.project.id)
  formData.append('type_id', model.value.type_id)
  formData.append('name', model.value.name)
  formData.append('description', model.value.description)
  formData.append('document_link', model.value.document_link)
  formData.append('system_id', model.value.system_id)
  formData.append('owner_id', model.value.owner_id)
  formData.append('priority', model.value.priority)
  formData.append('deadline', model.value.deadline)
  // tags 是数组
  model.value.tags.forEach((tag) => {
    formData.append('tags[]', tag)
  })
  // media 是文件
  model.value.media.forEach((item) => {
    if (item.file) formData.append('media[]', item.file)
  })
  return formData
}

// 重置表单
const resetForm = () => {
  model.value = {
    demand_id: '',
    project_id: '',
    type_id: '',
    name: '',
    description: '',
    document_link: '',
    system_id: '',
    priority: '',
    deadline: null,
    owner_id: '',
    tags: [],
    media: []
  }
  emit('closeModal')
  message.success('操作成功')
}
</script>
