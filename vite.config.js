import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver(),
      ],
      // 自动导入的目录
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // 导入的库
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      // 生成自动导入的类型声明文件
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
    }),
    Components({
      resolvers: [
        // Element Plus 组件自动导入
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep'],
        })


      ],
      // 组件所在目录，默认为 src/components
      dirs: ['src/components'],
      // 生成组件类型声明文件
      dts: 'src/components.d.ts',
      // 搜索子目录
      deep: true,
      // 允许子目录作为组件的命名空间前缀
      directoryAsNamespace: false,
      collapseSamePrefixes: true,

      transform: {
        vue: {

        }
      },

    }),
   
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: '/myChat/',
   server: {
    host: '0.0.0.0', // 允许通过0.0.0.0访问
    port: 5173,      // 端口号，默认5173
    open: false,     // 是否自动打开浏览器
    cors: true       // 允许跨域（开发环境通常需要）
  }
})
