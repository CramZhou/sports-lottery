<template>
  <div class="popup-wrapper">
    <div class="popup-bg lotto-bg">
      <div class="popup-headline">超级大乐透幸运站</div>
      <div class="popup-subtitle">第四站</div>
      <template v-if="currentStep === 1">
        <div class="all-balls">
          <img
            v-for="ball in allBalls"
            :src="ball.src"
            :style="{
              top: ball.top + '%',
              left: ball.left + '%'
            }"
          />
        </div>
        <div class="popup-btn" @click="handleChooseLotto"><span>选取大乐透幸运号码</span></div>
      </template>
      <template v-if="currentStep === 2">
        <div class="lotto-result">
          <div class="lotto-num">
            <div v-for="res in [...frontZoon, ...backZoon]">{{ res }}</div>
          </div>
          <div class="lotto-tip">快带着幸运号码前往门店进行体验</div>
          <div class="lotto-btn" @click="viewRule">查看“超级大乐透”玩法介绍</div>
        </div>
        <div class="popup-btn" @click="handleGoOn"><span>点击前行</span></div>
      </template>
      <template v-if="currentStep === 3">
        <div class="lotto-rule">
          <p>
            超级大乐透基本投注是指从前区号码中任选五个号码，并从后区号码中任选两个号码的组合进行投注。其中，<b>前区号码</b>由<b>01—35</b>共三十五个号码组成，<b>后区号码</b>由<b>01—12</b>共十二个号码组成。<b>每注基本投注金额人民币2元</b>。
          </p>
          <p>购买者在基本投注的基础上，可对购买的每注号码进行一次追加投注，每注追加投注金额人民币1元。</p>
        </div>
        <div class="popup-btn" @click="currentStep = 2"><span>返回上一步</span></div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import lotto1 from "@/assets/images/lotto1.png";
import lotto2 from "@/assets/images/lotto2.png";
import lotto3 from "@/assets/images/lotto3.png";
import lotto4 from "@/assets/images/lotto4.png";
import { getRandom } from "../../utils";

const emit = defineEmits(["handleRegain"]);

const balls = [lotto1, lotto2, lotto3, lotto4];
const currentStep = ref(1); // 当前步骤

/** step1 所有的球 */
const allBalls = ref([]);
const fillBalls = () => {
  new Array(18).fill("").forEach(() => {
    allBalls.value.push({ src: balls[getRandom(4)], top: getRandom(60, 20), left: getRandom(80, 6) });
  });
};

// 抽取球动画
let turnTimer = null;
const turnNum = ref(0);
const handleChooseLotto = () => {
  turnTimer && clearTimeout(turnTimer);
  if (turnNum.value < 3) {
    turnNum.value++;
    allBalls.value = allBalls.value.map((ball) => ({
      src: ball.src,
      top: getRandom(60, 20),
      left: getRandom(80, 6)
    }));
    turnTimer = setTimeout(() => handleChooseLotto(), 300);
  } else {
    currentStep.value = 2;
  }
};

/** step2 查看结果 */
const frontZoon = ref([]);
const backZoon = ref([]);
const getNum = (arr, number, scope) => {
  if (arr.length >= number) return;
  // 取随机数
  let ran = getRandom(scope, 1);
  if (ran < 10) {
    ran = `0${ran}`;
  }
  // 没有的才放入
  if (!arr.includes(ran)) {
    arr.push(ran);
  }
  getNum(arr, number, scope);
};

const viewRule = () => {
  currentStep.value = 3;
};

/** 继续开车 */
const handleGoOn = () => {
  emit("handleRegain");
};

onMounted(() => {
  fillBalls();
  getNum(frontZoon.value, 5, 35);
  getNum(backZoon.value, 2, 12);
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common.scss";
@import "./index.scss";
</style>
