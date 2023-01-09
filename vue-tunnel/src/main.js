import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import elementIcon from './plugins/icons.js'
import echarts from './plugins/echarts.js'
import i18n from './lang/i18n.js'
import ElementPlus from 'element-plus'
import zh from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

import './assets/init.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(createPinia())
app.use(router)
app.use(pinia)
app.use(echarts)
app.use(i18n)
app.use(elementIcon)
app.use(ElementPlus,{
    locale: localStorage.getItem('lang') === 'zh' ? zh : en 
})
app.mount('#app')
