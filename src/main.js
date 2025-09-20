import { createApp } from 'vue'
import elementplus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(elementplus)
app.use(createPinia())
app.use(router)

app.mount('#app')
