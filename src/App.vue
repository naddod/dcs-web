<script setup>
import { RouterView } from 'vue-router'
import { NConfigProvider, NLayout, NMessageProvider } from 'naive-ui'
import PageHeader from '@/components/Layouts/PageHeader.vue'
import { zhCN, dateZhCN } from 'naive-ui'
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <n-layout>
        <PageHeader />
        <RouterView />
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
