import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from "@vitejs/plugin-vue-jsx";
import importerPlugin from 'vite-plugin-importer'; // <---
import legacyPlugin from '@vitejs/plugin-legacy';
import { viteMockServe } from "vite-plugin-mock";
import path from 'path';

export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true // 使用 antd 的 less 样式 需要开启
      }
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    importerPlugin({ 
      libraryName: "ant-design-vue",
      libraryDirectory: "es",
      style: true // less
    }),
    // 配置低浏览器版本兼容，如此构建时，vite 将按 targets 配置编译产物。
    legacyPlugin({
      targets: ['defaults', 'not IE 11']
    }),
    viteMockServe({ supportTs: true })
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8080,
    proxy: {
      '/gapi/mock': {
        target: 'http://localhost:8080/', //对mock进行代理，为了区别非mock的代理
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gapi/, '')
      },
      '/gapi': {
        target: 'https://junfeng530.xyz/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gapi/, '')
      },
    },
    open: true,
    // vite vue3项目Unrestricted file system access to
    fs: {
      strict: false
    }
  },
  // 打包构建环境
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        nested: path.resolve(__dirname, 'nested/index.html')
      }
    }
  }
});
