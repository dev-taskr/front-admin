import { createApp } from '../node_modules/vue';
import App from './App.vue';
import router from './router/route';
import "./style.css";

// Aplica el tema antes de inicializar Vue
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createApp(App).use(router).mount('#app')
