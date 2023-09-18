<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
  >
    <n-form-item label="需求类型" path="type_id">
      <n-radio-group v-model:value="model.type_id" name="type_id">
        <n-radio v-for="item in types" :key="item.id" :value="item.id">
          <!-- <n-radio v-for="song in songs" :key="song.value" :value="song.value"> -->
          {{ item.name }}
        </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="需求名称" path="name">
      <n-input v-model:value="model.name" placeholder="请输入" />
    </n-form-item>
    <n-form-item label="需求描述" path="description">
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
    <n-form-item label="紧急程度" path="urgency">
      <n-radio-group v-model:value="model.urgency" name="urgency">
        <n-radio value="normal"> 正常 </n-radio>
        <n-radio value="urgent"> 紧急 </n-radio>
        <n-radio value="very_urgent"> 十分紧急 </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="关联系统" path="system_id">
      <n-radio-group v-model:value="model.system_id" name="system_id">
        <n-radio v-for="sys in systems" :value="sys.id" :key="sys.id">
          {{ sys.name }}
        </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="关联人员" path="assigns">
      <n-select v-model:value="model.assigns" multiple :options="leaders" filterable />
    </n-form-item>
    <n-form-item label="打标签" path="tags">
      <n-dynamic-tags v-model:value="model.tags" />
    </n-form-item>
    <n-form-item label="附件上传" path="media">
      <n-upload :multiple="true" v-model:file-list="model.media">
        <n-button>点击此按钮选择上传文件</n-button>
      </n-upload>
    </n-form-item>
    <div style="display: flex; justify-content: flex-end">
      <n-button type="info" @click="submitForm">提交需求</n-button>
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
  NDynamicTags,
  NButton
} from 'naive-ui'
import { useDemandStore } from '@/stores/demand'
import { useSystemStore } from '@/stores/system'
import { useUserStore } from '@/stores/user'

const store = useDemandStore()
const message = useMessage()

const types = computed(() => store.demandTypes)
const systems = computed(() => useSystemStore().systems)
const leaders = computed(() =>
  useUserStore().leaders.map((u) => {
    return {
      label: u.name,
      value: u.id
    }
  })
)

const props = defineProps({
  demand: {
    type: Object,
    default: () => null
  }
})

const model = ref({
  system_id: '',
  type_id: '',
  name: '',
  description: '',
  document_link: '',
  urgency: '',
  assigns: [],
  tags: [],
  media: []
})

if (props.demand) {
  Object.assign(model.value, {
    type_id: props.demand?.type_id,
    name: props.demand?.name,
    description: props.demand?.description,
    document_link: props.demand?.document_link || '',
    // system_id: props.task?.system_id || '',
    system_id: props.demand?.system_id || '',
    urgency: props.demand?.urgency,
    tags: props.demand?.tags
  })
  model.value.assigns = props.demand?.assigns.map((u) => u.id)
  model.value.media = props.demand?.media.map((m) => {
    return {
      id: m.id,
      name: m.name,
      // url: m.url,
      status: 'finished'
    }
  })
}

const rules = ref({
  type_id: {
    required: true,
    message: '请选择类型'
  },
  name: {
    required: true,
    message: '请输入名称'
  },
  description: {
    required: true,
    message: '请输入需求描述'
  },
  urgency: {
    required: true,
    message: '请选择紧急程度'
  },
  assigns: {
    required: true,
    message: '请选择关联人员'
  }
})

// 定义 'closeModal' emit 事件
const emit = defineEmits(['closeModal'])

const submitForm = async () => {
  // 使用 formdata 提交数据
  const formData = new FormData()
  formData.append('system_id', model.value.system_id)
  formData.append('type_id', model.value.type_id)
  formData.append('name', model.value.name)
  formData.append('description', model.value.description)
  formData.append('document_link', model.value.document_link)
  formData.append('urgency', model.value.urgency)
  // assigns 是数组
  model.value.assigns.forEach((assign) => {
    formData.append('assigns[]', assign)
  })
  // tags 是数组
  model.value.tags.forEach((tag) => {
    formData.append('tags[]', tag)
  })
  // media 是文件
  model.value.media.forEach((item) => {
    if (item.file) formData.append('media[]', item.file)
  })
  // 判断是新建还是更新
  if (props.demand) {
    // 更新
    await store
      .fetchDemandUpdate(props.demand.id, formData)
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        resetForm()
      })
  } else {
    // 新建
    await store
      .fetchDemandCreate(formData)
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        resetForm()
      })
  }
}

// 重置表单
const resetForm = () => {
  model.value = {
    system_id: '',
    type_id: '',
    name: '',
    description: '',
    document_link: '',
    urgency: '',
    assigns: [],
    tags: [],
    media: []
  }
  emit('closeModal')
  message.success('操作成功')
}
</script>
