<template>
  <div class="flex-center">
    <div id="dragContainer">
      <!-- 绿色区域 -->
      <div id="dragBg"></div>
      <!-- 滑动容器文本 -->
      <div id="dragText"></div>
      <!-- 拖动元素 -->
      <div id="dragHandler" class="dragHandlerBg"></div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["triggerVerify"]);

let dragContainer = null;
let dragBg = null;
let dragText = null;
let dragHandler = null;
let maxHandlerOffset = null;

const initDrag = () => {
  // 在滑动验证容器文本写入“拖动滑块验证”
  dragText.textContent = "拖动滑块验证";
  // 给滑块添加鼠标按下监听
  dragHandler.addEventListener("touchstart", onDragHandlerMouseDown);

  // 初始化滑块移动量
  dragHandler.style.left = 0;
  // 初始化绿色背景
  dragBg.style.width = 0;
  dragText.style.color = "";
  dragHandler.setAttribute("class", "dragHandlerBg");
};
// 鼠标移动
const onDragHandlerMouseMove = (event) => {
  // 滑块移动量
  const dragX = dragBg?.getBoundingClientRect() || {};
  let left = event.touches[0].pageX - dragHandler.clientWidth / 2 - dragX.left;

  if (left < 0) {
    // 滑动小于0设为0
    left = 0;
  } else if (left >= maxHandlerOffset) {
    // 滑动超过最大偏移量则校验成功
    left = maxHandlerOffset;
    verifySucc();
  }
  // 超过最大偏移量，不增加绿色区域宽度
  if (left > maxHandlerOffset) return;
  // 滑块移动量（距离左侧的定位）
  dragHandler.style.left = `${left  }px`;
  // 绿色背景的长度
  dragBg.style.width = `${left  }px`;
};
// 鼠标抬起
const onDragHandlerMouseUp = () => {
  // 移除鼠标移动监听
  document.removeEventListener("touchmove", onDragHandlerMouseMove);
  // 移除鼠标松开监听
  document.removeEventListener("touchend", onDragHandlerMouseUp);
  // 初始化滑块移动量
  dragHandler.style.left = 0;
  // 初始化绿色背景
  dragBg.style.width = 0;
};
// 鼠标按下
const onDragHandlerMouseDown = () => {
  // 鼠标移动监听
  document.addEventListener("touchmove", onDragHandlerMouseMove);
  // 鼠标松开监听
  document.addEventListener("touchend", onDragHandlerMouseUp);
};
// 滑动完成
const verifySucc = () => {
  // 容器文本的文字改为白色“验证通过”字体
  dragText.textContent = "验证通过";
  dragText.style.color = "white";
  // 验证通过的滑块背景
  dragHandler.setAttribute("class", "dragHandlerOkBg");
  // 移除鼠标按下监听
  dragHandler.removeEventListener("touchstart", onDragHandlerMouseDown);
  // 移除 鼠标移动监听
  document.removeEventListener("touchmove", onDragHandlerMouseMove);
  // 移除鼠标松开监听
  document.removeEventListener("touchend", onDragHandlerMouseUp);
  // alert('操作成功')
  setTimeout(() => {
    emit("triggerVerify", false);
  }, 500);
};

onMounted(() => {
  // 获取滑动控件容器,灰色背景
  dragContainer = document.getElementById("dragContainer");
  // 获取滑块左边部分,绿色背景
  dragBg = document.getElementById("dragBg");
  // 获取滑动验证容器文本
  dragText = document.getElementById("dragText");
  // 获取滑块
  dragHandler = document.getElementById("dragHandler");

  // 滑块的最大偏移量 = 滑动验证容器文本长度 - 滑块长度
  maxHandlerOffset = dragContainer.clientWidth - dragHandler.clientWidth;

  // 初始化
  initDrag();
});
</script>

<style lang="scss" scoped>
.flex-center {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: flex;
  align-items: center;
}
/* 滑动控件容器,灰色背景 */
#dragContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  background: #e8e8e8;
  width: 50vw;
  height: 120px;
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid #e8e8e8;
}
/* 滑块左边部分,绿色背景 */
#dragBg {
  position: absolute;
  background-color: #7ac23c;
  width: 0;
  height: 100%;
}
/* 滑动验证容器文本 */
#dragText {
  position: absolute;
  width: 100%;
  height: 100%;
  /* 文字水平居中 */
  text-align: center;
  /* 文字垂直居中,这里不能用百分比,因为百分比是相对原始line-height的,而非div高度 */
  line-height: 120px;
  font-size: 36px;
  /* 文本不允许选中 */
  user-select: none;
  -webkit-user-select: none;
}
/* 滑块 */
#dragHandler {
  position: absolute;
  width: 120px;
  height: 100%;
  cursor: move;
}
/* 滑块初始背景 */
.dragHandlerBg {
  background: #fff no-repeat center
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==");
}
/* 验证成功时的滑块背景 有√*/
.dragHandlerOkBg {
  background: #fff no-repeat center
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==");
}
</style>
