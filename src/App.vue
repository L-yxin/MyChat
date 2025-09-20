<template>
  <el-container class="ep-bg">
    <RouterView></RouterView>
  </el-container>
</template>

<script setup>
import { ElContainer } from 'element-plus';
import { RouterView } from 'vue-router';
</script>

<style scoped>
.ep-bg {
  background-color: #f0f4f8;
  height: 100%;
  width: 100%;
  position: fixed;
}

</style>