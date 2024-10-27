<template>
  <div class="login-wrapper">
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
const handleRegister = () => {
  const { phone, code } = loginParams.value;
  if (loginParams.value.phone && loginParams.value.code) {
    emit("triggerLogin", false);
    projectApi({ method: "register", phone, openid, code }).then(({ msg, sucess }) => {
      showToast(msg);
      if (sucess === 1) {
        emit("triggerLogin", false);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
