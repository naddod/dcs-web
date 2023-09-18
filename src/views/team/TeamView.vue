<template>
  <n-layout has-sider>
    <n-layout-sider width="240" bordered>
      <TeamMenu />
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <RouterView />
    </n-layout-content>
  </n-layout>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import TeamMenu from './components/TeamMenu.vue'
</script>
