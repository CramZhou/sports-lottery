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
      <div class="lose-main">
        <img class="close-btn" :src="close" @click="() => (loseFlag = false)" />
        <div class="handle-btn" @click="() => (loseFlag = false)"><span>知道了</span></div>
      </div>
    </div>
    <!-- 中奖了 -->
    <div class="bingo-wrapper" v-if="bingoFlag">
      <div class="bingo-main">
        <img class="close-btn" :src="close" @click="() => (bingoFlag = false)" />
        <div class="bingo-title">中奖啦，恭喜您获得</div>
        <img class="bingo-img" :src="bingoDetail.src" />
        <div class="bingo-info" @click="() => triggerBingoDetail(true)">
          <span>查看卡号卡密</span>
        </div>
        <div class="handle-btn" @click="() => (bingoFlag = false)"><span>知道了</span></div>
      </div>
    </div>
    <common-prize-detail v-if="bingoInfoShow" :prize-detail="bingoDetail" @triggerDetail="triggerBingoDetail" />
    <!-- 规则 -->
    <common-rule v-show="ruleFlag" @handleTriggerRule="handleTriggerRule" />
    <!-- 奖品 -->
    <common-prize v-if="prizeFlag" @handleTriggerPrize="handleTriggerPrize" />
    <!-- 注册 -->
    <common-login v-if="loginFlag" @triggerLogin="triggerLogin" />
  </div>
</template>

<script setup>
// import { showToast } from "vant";
import { getRandom } from "@/utils";
import { projectApi } from "@/service";
import close from "@/assets/images/close.png";
import { loseAngle, bingoMap } from "./constant";
import proofStore from "@/store/proof";

const { openid } = proofStore();

const emit = defineEmits(["handleBackHome"]);

/** 注册 */
const loginFlag = ref(false);
const triggerLogin = (flag) => {
  loginFlag.value = flag;
};

/** 转盘角度 */
const angle = ref(0);

/** 未中奖 */
const loseFlag = ref(false);

/** 中奖了 */
const bingoFlag = ref(false);
const bingoDetail = ref({});
const bingoInfoShow = ref(false);

const triggerBingoDetail = (flag) => {
  bingoInfoShow.value = flag;
};

const handleRaffle = () => {
  if (angle.value > 0) return;

  // 中奖测试
  // const data = {
  //   desc: '复制券码，打开京东APP点击"我的"进入"我的钱包""礼品卡"页面底部"绑定新卡输入卡密及验证码点击绑定',
  //   expiration: "会考试的话就卡死的",
  //   idinfo: "321863需要9的符号请问",
  //   info: "调取围绕245 ",
  //   title: "京东e卡",
  //   type: "1"
  // };
  // const prize = bingoMap[data.type];
  // angle.value = prize.angle;
  // bingoDetail.value = { ...prize, ...data };
  // setTimeout(() => (bingoFlag.value = true), 3100);

  projectApi({ method: "gift", openid }).then(({ sucess, msg, data }) => {
    if (sucess === 0) {
      if (msg === "谢谢，未抽中！") {
        angle.value = loseAngle[getRandom(3)];
        setTimeout(() => (loseFlag.value = true), 3100);
      } else if (msg === " 请先注册！") {
        // showToast({
        //   message: "即将跳转注册",
        //   icon: "warning-o"
        // });
        setTimeout(() => triggerLogin(true), 2000);
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
