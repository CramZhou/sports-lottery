<template>
  <div class="popup-wrapper">
    <img class="close-popup" :src="close" @click="() => emit('handleTriggerPrize', false)" />
    <div class="popup-bg answer-bg">
      <div class="popup-headline">我的奖品</div>
      <div class="popup-subtitle">奖品</div>
      <div class="prize-list">
        <div class="prize-item" v-for="prize in prizeList" :key="prize.info">
          <img class="prize-img" :src="prize.src" />
          <div class="prize-title">{{ prize.title }}</div>
          <div class="prize-btn">查看详情</div>
        </div>
      </div>
      <div class="popup-btn" @click="() => emit('handleTriggerPrize', false)"><span>知道了</span></div>
    </div>
  </div>
</template>

<script setup>
import close from "@/assets/images/close.png";
import { projectApi } from "@/service";
import { bingoMap } from "../CommonTurn/constant";

const emit = defineEmits(["handleTriggerPrize"]);

const prizeList = ref([]);

onMounted(() => {
  projectApi({ method: "mygift", openid: "091SM80w3U8BJ33prM3w3yUnuY3SM80Z" }).then(({ data }) => {
    prizeList.value = data.map((prize) => ({
      ...prize,
      ...bingoMap[prize.type]
    }));
    console.log(1111, prizeList.value);
  });
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common.scss";
@import "./index.scss";
</style>
