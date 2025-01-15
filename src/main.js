import { createApp } from 'vue';
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

// Crea la aplicación y aplica configuraciones
const app = createApp(App);

app.use(router);

app.mount('#app');

