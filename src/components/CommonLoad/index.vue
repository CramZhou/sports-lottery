<template>
  <div class="load-wrapper">
    <div class="load-video"></div>
    <div class="load-main">
      <div class="load-bar" :style="{ width: `${loadCount}%` }"></div>
      <div class="load-icon" :style="{ left: `${loadCount - 7}%` }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps(["loadCount"]);
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
