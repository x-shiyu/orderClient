import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import viteSvgIcons from 'vite-plugin-svg-icons';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), viteSvgIcons({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
  })],
  server: {
    port: 8002,
    host: '0.0.0.0',
    fs: {
      strict: false
    },
    cors:true,
    proxy: {
      // 使用 proxy 实例
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), 'src/')
    }
  }
})
