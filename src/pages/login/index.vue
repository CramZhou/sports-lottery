<template>
  <div class="login-wrapper">
    <div class="login-form">
      <div class="login-title">欢迎登录</div>
      <div class="login-input">
        <div class="input-item">
          <label for="tel">手机号</label>
          <input id="tel" type="tel" />
        </div>
        <div class="input-item">
          <label for="number">验证码</label>
          <input id="number" type="number" />
          <div class="send" @click="handleSendCode">发送验证码</div>
        </div>
      </div>
      <div class="login-confirm"><span>确定登录</span></div>
    </div>
  </div>
</template>

<script setup>
const handleSendCode = () => {};
</script>

<style lang="scss" scoped>
.login-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/images/login-bg.png");
  background-size: 100% 100%;
}

.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .login-title {
    margin-bottom: 62px;
    font-size: 36px;
  }

  .login-input {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    margin-bottom: 36px;

    .input-item {
      position: relative;
      display: flex;
      gap: 50px;
      width: 620px;
      height: 100px;
      padding: 0 40px;
      border-radius: 50px;
      border: 3px solid #000000;
      background-color: #ffffff;

      label {
        font-size: 30px;
        color: #333333;
        line-height: 94px;
      }

      input {
        flex: 1;
      }

      .send {
        position: absolute;
        top: -3px;
        right: -3px;
        width: 200px;
        height: 100px;
        line-height: 94px;
        background: #f35656;
        border-radius: 50px;
        border: 3px solid #000000;
        font-size: 30px;
        color: #ffffff;
      }
    }
  }

  .login-confirm {
    position: relative;
    width: 100%;
    height: 100px;
    font-size: 30px;
    color: #ffffff;
    border-radius: 50px;
    border: 4px solid #5a392b;
    background-color: #b13a3a;

    span {
      position: relative;
      z-index: 1;
      font-weight: bold;
      line-height: 94px;
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      display: block;
      width: 100%;
      height: 86px;
      background-color: #f35656;
      border-radius: 47px;
    }
  }
}
</style>
