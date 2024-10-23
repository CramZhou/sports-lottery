<template>
  <div class="body-main">
    <CommonLoad :load-count="loadCount" v-if="loadCount <= 100" />
    <div class="bg-b" :style="{ transform: `translateX(${bgDis}%)` }"></div>
    <div class="train" :style="{ transform: `translateX(${trainDis}%)` }">
      <div class="door" v-for="door in 5">
        <div :class="{ 'door-out': true, 'door-open': door === currentDoor }"></div>
      </div>
    </div>
    <div class="bg-f" :style="{ transform: `translateX(${bgDis}%)` }"></div>
    <!-- 答题弹窗 -->
    <div class="answer-wrapper" v-if="currentStation">
      <div class="answer-bg">
        <div class="an-headline">{{ currentQuestion.headline }}</div>
        <div class="an-subtitle">{{ currentQuestion.subtitle }}</div>
        <template v-if="!whetherAnswer">
          <div class="an-issue">{{ currentIssue.issue }}</div>
          <div class="an-options">
            <div
              :class="{
                active: currentSolution === item
              }"
              v-for="item in currentIssue.options"
              @click="() => choiceSolution(item)"
            >
              <span>{{ item }}</span> <i></i>
            </div>
          </div>
          <div class="an-btn" @click="submitSolution"><span>选择提交</span></div>
        </template>
        <template v-else>
          <div class="an-result">
            <div class="an-correct" v-if="allResult[currentStation - 1]">回答正确</div>
            <div class="an-error" v-else>回答错误</div>
            <div class="an-solution">{{ currentIssue.solution }}</div>
          </div>
          <div class="an-detail">{{ currentIssue.detail }}</div>
          <div class="an-btn" @click="handleGoon"><span>点击前行</span></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { questionMap } from "./config";

const currentDoor = ref(0);
const passStation = ref(0);

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

/** 停车 */
const currentStation = ref(""); // 当前站点
const currentQuestion = ref({}); // 当前站点整个问题配置
const currentIssue = ref({}); // 当前站点选中的问题
watch(
  () => currentStation.value,
  (station) => {
    if (station) {
      currentQuestion.value = questionMap[station];
      currentIssue.value = questionMap[station].list[Math.floor(Math.random() * questionMap[station].list.length)];
    } else {
      currentQuestion.value = {};
      currentIssue.value = {};
    }
  }
);

/** 答题 */
const allResult = ref([]); // 所有的答案

const currentSolution = ref(""); // 当前选的答案
const whetherAnswer = ref(false); // 当前题目是否回答

const choiceSolution = (solution) => {
  currentSolution.value = solution;
};

const submitSolution = () => {
  if (currentSolution.value) {
    whetherAnswer.value = true;
    if (currentSolution.value === currentIssue.value.solution) {
      allResult.value.push(true);
    } else {
      allResult.value.push(false);
    }
  }
};

const handleGoon = () => {
  currentDoor.value = 0;
  currentStation.value = "";

  currentSolution.value = "";
  whetherAnswer.value = false;
  bgCD();
  trainCD();
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
