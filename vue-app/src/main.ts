import { createApp } from "vue"
import { createI18n } from 'vue-i18n'

import App from "./App.vue"
import router from "./router"
import store from "./store"
import api from "./service"
import messages from "./locales"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "@/assets/css/index.scss"

const i18n = createI18n({
    locale: 'en', // set locale
    messages, // set locale messages
  })

const app = createApp(App)

app.provide("api", api)

app.use(i18n)
app.use(store)
app.use(router)
app.mount("#app")
