import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
import { i18n } from "./i18n"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "remixicon/fonts/remixicon.css"
import "@/assets/css/index.scss"

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.mount("#app")
