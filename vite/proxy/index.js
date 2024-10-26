export default function createViteProxy() {
  return {
    "/api": {
      target: "https://luck.yeyang0512.com",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, "")
    }
  };
}
