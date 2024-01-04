import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import api from "./service"

const app = createApp(App)

app.provide("api", api)

app.use(store)
app.use(router)
app.mount("#app")
