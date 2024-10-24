<template>
  <div class="popup-wrapper">
    <div class="popup-bg terminus-bg">
      <div class="popup-headline terminus-headline">到站啦</div>
      <div class="popup-subtitle">终点站</div>
      <div class="terminus-main">
        您已到达本次列车终点站<br />
        快来领取您的专属幸运
      </div>
      <div class="terminus-btn" @click="() => emit('goTurn')"><span>去抽奖</span></div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["goTurn"]);
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common.scss";
@import "./index.scss";
</style>
