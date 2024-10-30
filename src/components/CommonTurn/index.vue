<template>
  <div class="turn-bg">
    <div class="turn-logo"></div>
    <div class="turn-30"></div>
    <div class="turn-house"></div>
    <div class="turn-btn" @click="handleRaffle"></div>
    <div class="turn-circle"></div>
    <div
      class="turn-loop"
      :style="{
        transform: `rotateZ(${angle}deg)`,
        transition: `${angle ? 'transform 3000ms ease' : 'null'}`
      }"
    ></div>
    <!-- 四个按钮 -->
    <div class="float-icon">
      <div class="icon-item icon3" @click="() => handleTriggerPrize(true)"></div>
      <div class="icon-item icon2" @click="() => handleTriggerRule(true)"></div>
      <div class="icon-item icon4">
        <div>今日还有</div>
        <div>
          <span>{{ todayResidue }}</span> 次
        </div>
        <div>抽奖机会</div>
      </div>
      <div class="icon-item icon1" @click="() => emit('handleBackHome')"></div>
    </div>
    <!-- 没次数 -->
    <div class="no-wrapper" v-if="noFlag">
      <div class="no-main">
        <img class="close-btn" :src="close" @click="handleCloseNo" />
        <div class="no-text">今日抽奖次数已用完</div>
      </div>
    </div>
    <!-- 未中奖 -->
    <div class="lose-wrapper" v-if="loseFlag">
      <div class="no-main">
        <img class="close-btn" :src="close" @click="handleCloseLose" />
        <div class="handle-btn" @click="handleCloseLose"><span>知道了</span></div>
      </div>
    </div>
    <!-- 中奖了 -->
    <div class="bingo-wrapper" v-if="bingoFlag">
      <div class="bingo-main">
        <img class="close-btn" :src="close" @click="handleCloseBingo" />
        <div class="bingo-title">中奖啦，恭喜您获得</div>
        <img class="bingo-img" :src="bingoDetail.src" />
        <div class="bingo-info" @click="() => triggerBingoDetail(true)">
          <span>查看卡号卡密</span>
        </div>
        <div class="handle-btn" @click="handleCloseBingo"><span>知道了</span></div>
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
import { showToast } from "vant";
import { getRandom } from "@/utils";
import { projectApi } from "@/service";
import close from "@/assets/images/close.png";
import { loseAngle, bingoMap } from "./constant";
import proofStore from "@/store/proof";

const { openid } = proofStore();

const emit = defineEmits(["handleBackHome"]);

/** 今日剩余 */
const todayResidue = ref(0);
const fetchResidue = () => {
  projectApi({ method: "today_gift", openid }).then(({ sucess, data = {} }) => {
    if (sucess === 1) {
      todayResidue.value = data.today_gift;
    }
  });
};

/** 注册 */
const loginFlag = ref(false);
const triggerLogin = (flag) => {
  loginFlag.value = flag;
  if (!flag) {
    // 注册完跳回来 请求下剩余次数
    fetchResidue();
  }
};

/** 转盘 */
// 转盘角度
const angle = ref(0);
// 没次数
const noFlag = ref(false);
const handleCloseNo = () => {
  noFlag.value = false;
};
// 未中奖
const loseFlag = ref(false);
const handleCloseLose = () => {
  loseFlag.value = false;
  angle.value = 0;
};
// 中奖了
const bingoFlag = ref(false);
const handleCloseBingo = () => {
  bingoFlag.value = false;
  angle.value = 0;
};
const bingoDetail = ref({});
const bingoInfoShow = ref(false);
const triggerBingoDetail = (flag) => {
  bingoInfoShow.value = flag;
};
// 点击抽奖
const handleRaffle = () => {
  if (todayResidue.value === 0) {
    // showToast({
    //   message: "今日抽奖次数已用完",
    //   icon: "warning-o"
    // });
    noFlag.value = true;
    return;
  }
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

  projectApi({ method: "gift", openid }).then(({ sucess, errorcode = "", msg, data = {} }) => {
    if (sucess === 0) {
      // 错误情况，弹出提示
      if (errorcode.toString() === "1001") {
        // 1001 未注册，需跳转
        triggerLogin(true);
      } else {
        showToast({
          message: msg,
          icon: "warning-o"
        });
      }
    } else if (sucess === 1) {
      const { type } = data;
      if (type.toString() === "99") {
        angle.value = loseAngle[getRandom(3)];
        setTimeout(() => {
          loseFlag.value = true;
          fetchResidue();
        }, 3100);
      } else {
        const prize = bingoMap[type];
        angle.value = prize.angle;
        bingoDetail.value = { ...prize, ...data };
        setTimeout(() => {
          bingoFlag.value = true;
          fetchResidue();
        }, 3100);
      }
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

onMounted(() => {
  fetchResidue();
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
