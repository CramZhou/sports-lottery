<template>
  <div class="body-main">
    <audio loop preload="auto" ref="audioRef">
      <source src="https://luck.yeyang0512.com/luck.mp3" type="audio/mpeg" />
      您的浏览器不支持 audio 元素。
    </audio>
    <common-load :load-count="loadCount" v-if="loadCount <= 100" />
    <div class="bg-b" :style="{ transform: `translateX(${bgDis}%)` }"></div>
    <div class="train" :style="{ transform: `translateX(${trainDis}%)` }">
      <div class="door" v-for="door in 5">
        <div :class="{ 'door-out': true, 'door-open': door === currentDoor }"></div>
      </div>
    </div>
    <div class="bg-f" :style="{ transform: `translateX(${bgDis}%)` }"></div>
    <div class="float-icon">
      <div class="icon-item icon1" @click="handleBackHome"></div>
      <div class="icon-second">
        <div class="icon-item icon2" @click="() => handleTriggerRule(true)"></div>
      </div>
      <div class="icon-item icon3" @click="() => handleTriggerPrize(true)"></div>
    </div>
    <img class="float-audio" :src="isPlay ? audioPlay : audioPause" @click="switchAudio" />
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
    <!-- 转盘  -->
    <common-turn v-if="['6'].includes(currentStation)" @handleBackHome="handleBackHome" />
    <!-- 规则 -->
    <common-rule v-show="ruleFlag" @handleTriggerRule="handleTriggerRule" />
    <!-- 奖品 -->
    <common-prize v-if="prizeFlag" @handleTriggerPrize="handleTriggerPrize" />
  </div>
</template>

<script setup>
import audioPlay from "@/assets/images/audio-play.png";
import audioPause from "@/assets/images/audio-pause.png";
import useGetOpenid from "@/hooks/useGetOpenid";

/** 音频 */
const audioRef = ref();
const isPlay = ref(false);
const switchAudio = () => {
  isPlay.value = !isPlay.value;
  if (isPlay.value) {
    audioRef.value.play();
  } else {
    audioRef.value.pause();
  }
};

let openDoorTimer = null;
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
  clearTimeout(openDoorTimer);
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

/** 暂停 */
const handlePause = () => {
  bgTimer && clearTimeout(bgTimer);
  trainTimer && clearTimeout(trainTimer);
};

watch(
  () => bgDis.value,
  (dis) => {
    if (dis < -15.3 && passStation.value === 0) {
      handlePause();
      currentDoor.value = 1;
      passStation.value = 1;
      openDoorTimer = setTimeout(() => (currentStation.value = "1"), 500);
    }
    if (dis < -29.2 && passStation.value === 1) {
      handlePause();
      currentDoor.value = 2;
      passStation.value = 2;
      openDoorTimer = setTimeout(() => (currentStation.value = "2"), 500);
    }
    if (dis < -44 && passStation.value === 2) {
      handlePause();
      currentDoor.value = 3;
      passStation.value = 3;
      openDoorTimer = setTimeout(() => (currentStation.value = "3"), 500);
    }
    if (dis < -58.9 && passStation.value === 3) {
      handlePause();
      currentDoor.value = 4;
      passStation.value = 4;
      openDoorTimer = setTimeout(() => (currentStation.value = "4"), 500);
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

/** 返回首页 */
const handleBackHome = () => {
  handleRestart();
  handleRegain();
};

/** 活动规则 */
const ruleFlag = ref(false);
const handleTriggerRule = (flag) => {
  ruleFlag.value = flag;
  if (flag) {
    handlePause();
  } else {
    handleRegain();
  }
};

/** 奖品 */
const prizeFlag = ref(false);
const handleTriggerPrize = (flag) => {
  prizeFlag.value = flag;
  if (flag) {
    handlePause();
  } else {
    handleRegain();
  }
};

/** 获取openid */
const { getOpenid } = useGetOpenid();

onMounted(() => {
  getOpenid();
  loadCD();
});

onUnmounted(() => {
  loadTimer && clearTimeout(loadTimer);
  bgTimer && clearTimeout(bgTimer);
  trainTimer && clearTimeout(trainTimer);
  openDoorTimer && clearTimeout(openDoorTimer);
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
