import { createI18n } from 'vue-i18n'
import en from './lang/en.js'
import zh from './lang/zh.js'

const messages = {
    zh,
    en
}


const i18n = createI18n({
    legacy:false,
    locale:localStorage.getItem("lang"),
    globalInjection:true,
    messages
})

export default i18n