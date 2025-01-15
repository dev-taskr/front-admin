import "./style.css";
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import App from './App.vue';
import router from './router/index';

// Aplica el tema antes de inicializar Vue
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createApp(App).use(router).mount('#app')
