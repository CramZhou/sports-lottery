function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

if (isIOS()) {
  document.documentElement.classList.add("ios-landscape");
} else if (isAndroid()) {
  document.documentElement.classList.add("android-landscape");
}
