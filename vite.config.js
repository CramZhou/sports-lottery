import { defineConfig, loadEnv } from "vite";
import path from "path";
import createVitePlugins from "./vite/plugins";
import createViteProxy from "./vite/proxy";

const resolve = (dir) => path.join(__dirname, dir);

export default ({ mode, command }) => {
  const viteEnv = loadEnv(mode, process.cwd());
  const isProd = viteEnv.VITE_RUN_ENV === "production";

  return defineConfig({
    // 部署的路径，默认为根路径；
    // 例如部署在 https://xxx.com/web-app/, 则设置为 /web-app/。
    base: isProd ? "/" : "/",
    plugins: createVitePlugins(viteEnv, command === "build"),
    resolve: {
      alias: {
        "@": resolve("src")
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    },
    server: {
      host: "0.0.0.0",
      port: 7956,
      open: true,
      proxy: createViteProxy()
    },
    build: {
      chunkSizeWarningLimit: 1000, // 提高超大静态资源警告大小
      sourcemap: true,
      rollupOptions: {
        input: "index.html",
        output: {
          // 静态资源打包做处理
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks: {
            // 分包
            vue: ["vue", "vue-router", "pinia"],
            vant: ["vant"]
          }
        }
      }
    }
  });
};
