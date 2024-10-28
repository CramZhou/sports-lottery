<template>
  <div class="login-wrapper">
    <div class="logo"></div>
    <div class="login-form">
      <div class="login-title">欢迎注册</div>
      <div class="login-input">
        <div class="input-item">
          <label for="tel">手机号</label>
          <input id="tel" type="tel" v-model="loginParams.phone" />
        </div>
        <div class="input-item">
          <label for="number">验证码</label>
          <input id="number" type="number" v-model="loginParams.code" />
          <div class="send" @click="handleSendCode">发送验证码</div>
        </div>
      </div>
      <div class="login-confirm" @click="handleRegister"><span>注册</span></div>
    </div>
    <!-- 拖动条 -->
    <DragVerify v-if="verifyFlag" @triggerVerify="triggerVerify" />
  </div>
</template>

<script setup>
import { showToast } from "vant";
import { projectApi } from "@/service";
import proofStore from "@/store/proof";
import DragVerify from "./DragVerify.vue";

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;
const targetDom = document.querySelector("#app");

const emit = defineEmits(["triggerLogin"]);

const { openid } = proofStore();

/** 注册参数 */
const loginParams = ref({ phone: "", code: "" });

/** 验证条 */
const verifyFlag = ref(false);
const triggerVerify = (flag) => {
  verifyFlag.value = flag;
  if (!flag) {
    projectApi({ method: "sendcode", phone: loginParams.value.phone, openid }).then(({ msg }) => {
      showToast(msg);
    });
  }
};

const handleSendCode = () => {
  if (loginParams.value.phone) {
    triggerVerify(true);
  }
};

/** 注册 */
const handleRegister = async () => {
  const { phone, code } = loginParams.value;
  if (loginParams.value.phone && loginParams.value.code) {
    await projectApi({ method: "register", phone, openid, code }).then(({ msg }) => {
      showToast(msg);
    });
    setTimeout(() => {
      emit("triggerLogin", false);
    }, 500);
  }
};

onMounted(() => {
  if (width < height) {
    targetDom.style.position = "absolute";
    targetDom.style.width = `${width}px`;
    targetDom.style.height = `${height}px`;
    targetDom.style.left = `${0}px`;
    targetDom.style.top = `${0}px`;
    targetDom.style.transform = "none";
    targetDom.style.transformOrigin = "50% 50%";
  }
});

onUnmounted(() => {
  if (width < height) {
    targetDom.style.position = "absolute";
    targetDom.style.width = `${height}px`;
    targetDom.style.height = `${width}px`;
    targetDom.style.left = `${0 - (height - width) / 2}px`;
    targetDom.style.top = `${(height - width) / 2}px`;
    targetDom.style.transform = "rotate(90deg)";
    targetDom.style.transformOrigin = "50% 50%";
  }
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "./portrait.scss";
</style>
