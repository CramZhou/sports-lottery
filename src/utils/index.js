/**
 * debounce防抖
 * @param {*} func 回调
 * @param {*} time 时间
 * @param {*} flag true输入前执行，false输入后执行
 * @returns
 */
export function debounce(func, time, flag) {
  let timer = null;

  const debounced = (...args) => {
    clearTimeout(timer);
    if (flag) {
      // true 先执行再等待
      if (!timer) {
        func(...args);
      }
      timer = setTimeout(() => (timer = null), time);
    } else {
      // false 先等待再执行
      timer = setTimeout(() => func(...args), time);
    }
  };

  // 加个手动取消的方法
  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}

/**
 * throttle 节流
 * @param {*} func 回调
 * @param {*} wait 等待时间
 * @returns
 */
export function throttle(func, wait) {
  let timer;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        func(...args);
        timer = null;
      }, wait);
    }
  };
}
