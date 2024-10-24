<template>
  <div class="body-main">
    <common-load :load-count="loadCount" v-if="loadCount <= 100" />
    <div class="bg-b" :style="{ transform: `translateX(${bgDis}%)` }"></div>
    <div class="train" :style="{ transform: `translateX(${trainDis}%)` }">
      <div class="door" v-for="door in 5">
        <div :class="{ 'door-out': true, 'door-open': door === currentDoor }"></div>
      </div>
    </div>
    <div class="bg-f" :style="{ transform: `translateX(${bgDis}%)` }"></div>
    <!-- 答题弹窗 -->
    <common-question
      v-show="['1', '2', '3'].includes(currentStation)"
      :current-station="currentStation"
      @handleRegain="handleRegain"
      @handleRestart="handleRestart"
    />
    <!-- 大乐透 -->
    <common-lotto v-if="['4'].includes(currentStation)" @handleRegain="handleRegain" />
    <!-- 终点 -->
    <common-terminus v-if="['5'].includes(currentStation)" @goTurn="goTurn" />
    <!-- 转盘 -->
    <common-turn v-if="['6'].includes(currentStation)" />
  </div>
</template>

<script setup>
const currentDoor = ref(0); // 当前门，用于开门
const currentStation = ref(""); // 当前站点，用于弹窗，比开门晚
const passStation = ref(0); // 记录已开过的站点，开过的站点，弹窗不需要再显示

/** 前后背景  */
let bgTimer = null;
const bgDis = ref(0);
const bgCD = () => {
  bgTimer && clearTimeout(bgTimer);
  if (bgDis.value >= -79.9) {
    bgDis.value -= 0.1;
    bgTimer = setTimeout(() => bgCD(), 30);
  } else {
    currentDoor.value = 5;
    setTimeout(() => (currentStation.value = "5"), 500);
  }
};

/**  火车 */
let trainTimer = null;
const trainDis = ref(-100);
const trainCD = () => {
  trainTimer && clearTimeout(trainTimer);
  if (trainDis.value <= 6.9) {
    trainDis.value += 0.1;
    trainTimer = setTimeout(() => trainCD(), 22);
  }
};

/** 继续开车 */
const handleRegain = () => {
  currentDoor.value = 0;
  currentStation.value = "";
  bgCD();
  trainCD();
};

/** 从头开始 */
const handleRestart = () => {
  passStation.value = 0;
  bgDis.value = 0;
  trainDis.value = -100;
};

watch(
  () => bgDis.value,
  (dis) => {
    if (dis < -15.3 && passStation.value === 0) {
      bgTimer && clearTimeout(bgTimer);
      trainTimer && clearTimeout(trainTimer);
      currentDoor.value = 1;
      passStation.value = 1;
      setTimeout(() => (currentStation.value = "1"), 500);
    }
    if (dis < -29.2 && passStation.value === 1) {
      bgTimer && clearTimeout(bgTimer);
      trainTimer && clearTimeout(trainTimer);
      currentDoor.value = 2;
      passStation.value = 2;
      setTimeout(() => (currentStation.value = "2"), 500);
    }
    if (dis < -44 && passStation.value === 2) {
      bgTimer && clearTimeout(bgTimer);
      trainTimer && clearTimeout(trainTimer);
      currentDoor.value = 3;
      passStation.value = 3;
      setTimeout(() => (currentStation.value = "3"), 500);
    }
    if (dis < -58.9 && passStation.value === 3) {
      bgTimer && clearTimeout(bgTimer);
      trainTimer && clearTimeout(trainTimer);
      currentDoor.value = 4;
      passStation.value = 4;
      setTimeout(() => (currentStation.value = "4"), 500);
    }
  }
);

/** loading */
let loadTimer = null;
const loadCount = ref(0);
const loadCD = () => {
  loadTimer && clearTimeout(loadTimer);
  if (loadCount.value <= 100) {
    loadCount.value++;
    loadTimer = setTimeout(() => loadCD(), 1);
  } else {
    bgCD();
    trainCD();
  }
};

/** 最终转盘 */
const goTurn = () => {
  currentStation.value = "6";
};

onMounted(() => {
  loadCD();
});

onUnmounted(() => {
  loadTimer && clearTimeout(loadTimer);
  bgTimer && clearTimeout(bgTimer);
  trainTimer && clearTimeout(trainTimer);
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
