import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import svgLoader from "vite-svg-loader";

const target = 'http://localhost:7171';

// https://vitejs.dev/config/
export default ({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    return defineConfig({
    plugins: [vue(), svgLoader()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: target,
          changeOrigin: true,
          //rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
          ws: true
        }
      }
    }
  })
}
