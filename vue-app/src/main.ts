import { createApp } from "vue"
import { createI18n } from "vue-i18n"

import App from "./App.vue"
import router from "./router"
import store from "./store"
import messages from "./locales"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "remixicon/fonts/remixicon.css"
import "@/assets/css/index.scss"

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  messages,
})

const app = createApp(App)

app.use(i18n)
app.use(store)
app.use(router)
app.mount("#app")
