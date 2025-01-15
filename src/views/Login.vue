<template>
  <div class="h-screen flex bg-gray-100 dark:bg-gray-900">
    <!-- Componente ThemeToggle flotante -->
    <div class="absolute top-14 left-28 z-10 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
      <ThemeToggle />
    </div>

    <!-- Lado izquierdo: Login -->
    <div class="w-full max-w-4xl flex items-center justify-center">
      <div class="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded shadow-md">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Iniciar Sesión
        </h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-6">
            <Label forId="email">Correo electrónico</Label>
            <Input
              v-model="email"
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              :validation="validateEmail"
              :required="true"
            />
            <p v-if="emailError" class="text-sm text-red-500 mt-1">{{ emailError }}</p>
          </div>
          <div class="mb-6">
            <Label forId="password">Contraseña</Label>
            <Input
              v-model="password"
              id="password"
              type="password"
              placeholder="•••••••••"
              :validation="validatePassword"
              :required="true"
            />
            <p v-if="passwordError" class="text-sm text-red-500 mt-1">{{ passwordError }}</p>
          </div>
          <div class="flex items-start mb-6">
            <Checkbox
              id="acceptTerms"
              v-model="acceptTerms"
            >
              Acepto los
              <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">
                términos y condiciones
              </a>.
            </Checkbox>
          </div>
          <Button
            type="submit"
            :disabled="!isFormValid"
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>

    <!-- Lado derecho: Imagen -->
    <div class="hidden md:flex w-full max-w-4xl items-center justify-center p-8">
      <img
        src="@/assets/wallpaper.webp"
        alt="Imagen decorativa"
        class="rounded-lg shadow-lg w-full h-auto max-h-screen object-cover"
      />
    </div>
  </div>

  <!-- ModalMessage -->
  <ModalMessage
    v-model:show="showModal"
    :title="modalTitle"
    :message="modalMessage"
    :type="modalType"
  />
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import ThemeToggle from "../components/layouts/ThemeToggle.vue";
import Label from "../components/inputs/Label.vue";
import Input from "../components/inputs/Input.vue";
import Checkbox from "../components/inputs/Checkbox.vue";
import Button from "../components/inputs/Button.vue";
import authService from "../services/auth/authService"; // Importa authService
import ModalMessage from "../components/utils/ModalMessage.vue"; // Importa ModalMessage

const router = useRouter();

const email = ref("");
const password = ref("");
const acceptTerms = ref(false);
const emailError = ref("");
const passwordError = ref("");

// Estado del modal
const showModal = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");
const modalType = ref("success");

const isFormValid = computed(() => {
  return email.value !== "" && password.value.length >= 6 && acceptTerms.value;
});

const validateEmail = (value) => {
  if (!value.includes("@")) {
    return "Por favor, ingresa un correo válido.";
  }
  return null;
};

const validatePassword = (value) => {
  if (value.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  return null;
};

const handleLogin = async () => {
  emailError.value = "";
  passwordError.value = "";

  if (!email.value.includes("@")) {
    emailError.value = "Por favor, ingresa un correo válido.";
    return;
  }

  if (password.value.length < 6) {
    passwordError.value = "La contraseña debe tener al menos 6 caracteres.";
    return;
  }

  try {
    const data = await authService.login({ username: email.value, password: password.value });
    localStorage.setItem("user", JSON.stringify(data.user)); // Guarda al usuario en el localStorage
    router.push("/dashboard"); // Redirige al dashboard
  } catch (error) {
    console.error(error);
    modalTitle.value = "Error";
    modalMessage.value = error.response?.data?.message || "Correo o contraseña incorrectos.";
    modalType.value = "error";
    showModal.value = true;  // Muestra el modal
  }
};
</script>
