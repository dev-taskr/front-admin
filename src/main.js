import { createApp } from './node_modules/vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import router from './router/route.js'
import "./style.css"

// Tema
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark")
} else {
  document.documentElement.classList.remove("dark")
}

const app = createApp(App)
app.use(router)
app.mount('#app')
