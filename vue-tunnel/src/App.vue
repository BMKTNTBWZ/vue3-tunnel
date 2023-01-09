<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* 公共样式 */
body,html,#app{
  height: 100%;
}
/* 去掉侧边栏的右侧边框 */
.el-menu{
  border-right: 0 !important;
}
/* dialog 标题 */
.el-dialog__header{
  background-color: #304156;
  margin-right: 0 !important;
  padding-bottom: 15px !important;
}
.el-dialog__header span{
  color: #fff;
}
</style>
