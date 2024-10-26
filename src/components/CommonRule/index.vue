<template>
  <div class="popup-wrapper">
    <img class="close-popup" :src="close" @click="() => emit('handleTriggerRule', false)" />
    <div class="popup-bg answer-bg">
      <div class="popup-headline">活动规则</div>
      <div class="popup-subtitle">规则</div>
      <div class="lotto-rule">
        <p>
          超级大乐透基本投注是指从前区号码中任选五个号码，并从后区号码中任选两个号码的组合进行投注。其中，<b>前区号码</b>由<b>01—35</b>共三十五个号码组成，<b>后区号码</b>由<b>01—12</b>共十二个号码组成。<b>每注基本投注金额人民币2元</b>。
        </p>
        <p>购买者在基本投注的基础上，可对购买的每注号码进行一次追加投注，每注追加投注金额人民币1元。</p>
      </div>
      <div class="popup-btn" @click="() => emit('handleTriggerRule', false)"><span>知道了</span></div>
    </div>
  </div>
</template>

<script setup>
import close from "@/assets/images/close.png";

const emit = defineEmits(["handleTriggerRule"]);
</script>

<style lang="scss" scoped>
@import "@/assets/styles/common.scss";
@import "./index.scss";
</style>
