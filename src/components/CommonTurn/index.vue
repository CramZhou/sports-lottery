<template>
  <div class="turn-bg">
    <div class="turn-btn" @click="handleRaffle"></div>
    <div class="turn-circle"></div>
    <div
      class="turn-loop"
      :style="{
        transform: `rotateZ(${angle}deg)`
      }"
    ></div>
  </div>
</template>

<script setup>
import { getRandom } from "@/utils";

const angle = ref(0);

const handleRaffle = () => {
  angle.value = getRandom(3000, 1000);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
