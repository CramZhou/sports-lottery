<template>
  <div class="popup-wrapper">
    <div class="popup-bg answer-bg">
      <div class="popup-headline">{{ currentQuestion.headline }}</div>
      <div class="popup-subtitle">{{ currentQuestion.subtitle }}</div>
      <template v-if="!isAnswer">
        <div class="an-issue">{{ currentIssue.issue }}</div>
        <div class="an-options">
          <div
            :class="{
              active: currentSolution === item
            }"
            v-for="item in currentIssue.options"
            @click="() => (currentSolution = item)"
          >
            <span>{{ item }}</span> <i></i>
          </div>
        </div>
        <div class="popup-btn" @click="submitSolution"><span>选择提交</span></div>
      </template>
      <template v-else>
        <div class="an-result">
          <div class="an-correct" v-if="isCorrect">回答正确</div>
          <div class="an-error" v-else>回答错误</div>
          <div class="an-solution">{{ currentIssue.solution }}</div>
        </div>
        <div class="an-detail" id="anDetail">{{ currentIssue.detail }}</div>
        <div class="popup-btn" v-if="isCorrect" @click="handleGoOn"><span>点击前行</span></div>
        <div class="popup-btn" v-else @click="handleResume"><span>重新开始</span></div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { questionMap } from "./config";

const emit = defineEmits(["handleRegain", "handleRestart"]);
const props = defineProps(["currentStation"]);

/** 停车显示 */
const currentQuestion = ref({}); // 当前站点整个问题配置
const currentIssue = ref({}); // 当前站点选中的问题
watch(
  () => props.currentStation,
  (station) => {
    if (["1", "2", "3"].includes(station)) {
      currentQuestion.value = questionMap[station];
      currentIssue.value = questionMap[station].list[Math.floor(Math.random() * questionMap[station].list.length)];
    } else {
      currentQuestion.value = {};
      currentIssue.value = {};
    }
  },
  { immediate: true }
);

/** 答题 */
const currentSolution = ref(""); // 当前选的答案
const isAnswer = ref(false); // 当前题目是否回答
const isCorrect = ref(false); // 当前题目是否正确

const submitSolution = () => {
  if (currentSolution.value) {
    isAnswer.value = true;
    isCorrect.value = currentSolution.value === currentIssue.value.solution;
  }
};

/** 继续开车 */
const handleGoOn = () => {
  currentSolution.value = "";
  isAnswer.value = false;
  emit("handleRegain");
};

/** 从头开始 */
const handleResume = () => {
  emit("handleRestart");
  handleGoOn();
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common.scss";
@import "./index.scss";
</style>
