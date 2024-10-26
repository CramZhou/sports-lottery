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

    <div class="float-icon">
      <div class="icon-item icon3" @click="() => handleTriggerPrize(true)"></div>
      <div class="icon-second">
        <div class="icon-item icon2" @click="() => handleTriggerRule(true)"></div>
      </div>
      <div class="icon-item icon1" @click="() => emit('handleBackHome')"></div>
    </div>
    <!-- 未中奖 -->
    <div class="lose-wrapper" v-if="loseFlag">
      <img :src="close" @click="() => (loseFlag = false)" />
      <div class="lose-main">
        <div class="handle-btn" @click="() => (loseFlag = false)"><span>知道了</span></div>
      </div>
    </div>
    <!-- 中奖了 -->
    <div class="bingo-wrapper" v-if="bingoFlag">
      <img :src="close" @click="() => (bingoFlag = false)" />
      <div class="bingo-main">
        <div class="bingo-title">中奖啦，恭喜您获得</div>
        <img class="bingo-img" :src="bingoDetail.src" />
        <div class="bingo-info" @click="() => (bingoInfoShow = true)">
          <span v-if="bingoInfoShow">{{ bingoDetail.info }}</span>
          <span v-else>查看卡号卡密</span>
        </div>
        <div class="handle-btn" @click="() => (bingoFlag = false)"><span>知道了</span></div>
      </div>
    </div>
    <!-- 规则 -->
    <common-rule v-show="ruleFlag" @handleTriggerRule="handleTriggerRule" />
    <!-- 奖品 -->
    <common-prize v-if="prizeFlag" @handleTriggerPrize="handleTriggerPrize" />
  </div>
</template>

<script setup>
import { getRandom } from "@/utils";
import { projectApi } from "@/service";
import close from "@/assets/images/close.png";
import { loseAngle, bingoMap } from "./constant";

const emit = defineEmits(["handleBackHome"]);

/** 转盘角度 */
const angle = ref(0);

/** 未中奖 */
const loseFlag = ref(false);

/** 中奖了 */
const bingoFlag = ref(false);
const bingoDetail = ref({});
const bingoInfoShow = ref(false);

const handleRaffle = () => {
  if (angle.value > 0) return;

  projectApi({ method: "gift", openid: "091SM80w3U8BJ33prM3w3yUnuY3SM80Z" }).then(({ sucess, msg, data }) => {
    if (sucess === 0) {
      if (msg === "谢谢，未抽中！") {
        angle.value = loseAngle[getRandom(3)];
        setTimeout(() => (loseFlag.value = true), 3100);
      } else if (msg === " 请先注册！") {
      }
    } else if (sucess === 1) {
      const prize = bingoMap[data.type];
      angle.value = prize.angle;
      bingoDetail.value = { ...prize, ...data };
      setTimeout(() => (bingoFlag.value = true), 3100);
    }
  });
};

/** 活动规则 */
const ruleFlag = ref(false);
const handleTriggerRule = (flag) => {
  ruleFlag.value = flag;
};

/** 奖品 */
const prizeFlag = ref(false);
const handleTriggerPrize = (flag) => {
  prizeFlag.value = flag;
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
