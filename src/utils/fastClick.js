import attachFastClick from "fastclick";

// fastClick的ios点击穿透解决方案
attachFastClick.prototype.focus = (targetElement) => {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf("date") !== 0 && targetElement.type !== "time" && targetElement.type !== "month") {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

// 初始化fastClick实例，在页面的DOM文档加载完成后
window.addEventListener(
  "load",
  () => {
    attachFastClick(document.body);
  },
  false
);

// 去除多指默认事件
document.documentElement.addEventListener(
  "touchmove",
  (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  },
  false
);

// 去除整屏被拖动问题
document.addEventListener(
  "touchmove",
  (e) => {
    if (!["anDetail"].includes(e.target.id)) {
      e.preventDefault();
    }
  },
  { passive: false }
);
