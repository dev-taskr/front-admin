import { createApp } from 'vue'
import { createPinia } from 'pinia';
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
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
