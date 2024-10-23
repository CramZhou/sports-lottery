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
.load-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/images/login-bg.png");
  background-size: 100% 100%;
  z-index: 99;
}

.load-video {
  position: absolute;
  top: 189px;
  left: 358px;
  width: 867px;
  height: 276px;
  background-image: url("../../assets/images/load.png");
  background-size: 100% 100%;
}

.load-main {
  position: absolute;
  top: 536px;
  left: 50%;
  width: 609px;
  height: 21px;
  transform: translateX(-50%);
  background-color: #d8d8d8;
  border-radius: 11px;
  border: 2px solid #000000;

  .load-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    background-color: #e74040;
    border-radius: 11px;
  }

  .load-icon {
    position: absolute;
    top: 50%;
    left: 0;
    width: 68px;
    height: 76px;
    transform: translateY(-50%);
    background-image: url("../../assets/images/load-icon.png");
    background-size: 100% 100%;
  }
}
</style>
