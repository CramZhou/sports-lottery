<template>
  <div class="detail-wrapper">
    <img class="close-popup" :src="close" @click="() => emit('triggerDetail')" />
    <div class="detail-main">
      <div class="detail-title">{{ prizeDetail.title }}</div>
      <div class="detail-slide">
        <div class="detail-info">
          <div class="info-item">
            <div>卡号：</div>
            <span>{{ prizeDetail.idinfo }}</span>
            <div @click="() => handleCopy(prizeDetail.idinfo)">| 复制</div>
          </div>
          <div class="info-item">
            <div>券码：</div>
            <span>{{ prizeDetail.info }}</span>
            <div @click="() => handleCopy(prizeDetail.info)">| 复制</div>
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

const handleCopy = (text) => {
  const oInput = document.createElement("textarea");
  oInput.value = text;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand("Copy");
  document.body.removeChild(oInput);
  showToast({
    message: "复制成功",
    icon: "success"
  });
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
