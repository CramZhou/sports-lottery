<template>
  <div class="detail-wrapper">
    <img class="close-popup" :src="close" @click="() => emit('triggerDetail')" />
    <div class="detail-main">
      <div class="detail-title">{{ prizeDetail.title }}</div>
      <div class="detail-slide">
        <div class="detail-info">
          <div class="info-item">
            <div class="info-label">卡号：</div>
            <div class="info-gray">{{ prizeDetail.idinfo }}</div>
            |
            <div
              :style="{
                color: copyKh ? '#59ca8a' : '#000'
              }"
              class="info-copy"
              @click="() => handleCopy(prizeDetail.idinfo, 'kh')"
            >
              复制
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">券码：</div>
            <div class="info-gray">{{ prizeDetail.info }}</div>
            |
            <div
              :style="{
                color: copyQm ? '#59ca8a' : '#000'
              }"
              class="info-copy"
              @click="() => handleCopy(prizeDetail.info, 'qm')"
            >
              复制
            </div>
          </div>
        </div>
        <div class="detail-expiration">
          {{ prizeDetail.expiration }}
        </div>
        <div class="detail-description">使用规则：{{ prizeDetail.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { showToast } from "vant";
import close from "@/assets/images/close.png";

const emit = defineEmits(["triggerDetail"]);

defineProps(["prizeDetail"]);

const copyKh = ref(false);
const copyQm = ref(false);

const handleCopy = (text, flag) => {
  const oInput = document.createElement("textarea");
  oInput.value = text;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand("Copy");
  document.body.removeChild(oInput);
  if (flag === "kh") {
    copyKh.value = true;
  }
  if (flag === "qm") {
    copyQm.value = true;
  }
  showToast({
    message: "复制成功",
    icon: "success"
  });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
