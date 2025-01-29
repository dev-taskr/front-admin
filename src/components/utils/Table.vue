<template>
    <div
      class="bg-white dark:bg-gray-800 rounded-lg border-2 p-4 transition-colors duration-200"
      :class="{
        'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700': clickable,
        'border-green-500': borderColor && localState === 'completed',
        'border-red-500': borderColor && localState === 'failed',
        'border-gray-500': borderColor && localState === 'neutro',
      }"
      @click="handleItemClick"
    >
      <div class="flex justify-between items-center min-h-[5rem]">
        <div class="flex-1">
          <div class="flex gap-0 items-center h-full">
            <div class="w-64 shrink-0">
              <h3 class="font-medium text-gray-800 dark:text-gray-200">{{ truncatedName }}</h3>
              <div class="mt-1">
                <p class="text-sm text-gray-500 dark:text-gray-400" v-if="item?.frequency">
                  {{ item?.frequency || "Sin frecuencia" }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">ID: {{ item?.id || "Sin ID" }}</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300 flex-1 self-center">{{ truncatedDescription }}</p>
          </div>
        </div>
        <div class="flex items-center gap-16">
          <!-- Inicio switch -->
          <div class="w-20 relative flex justify-center items-center">
            <Switch
              v-if="typeSwitch === 2 || typeSwitch === 0"
              :modelValue="localState"
              @click.stop="() => openConfirmationModal(localState, 2)"
            />
  
            <SwitchThreePhase
              v-else-if="typeSwitch === 3"
              :modelValue="localState"
              @click.stop="(event) => {
                  const position = getSwitchPosition(event);
                  openConfirmationModal(position, 3);
              }"
            />
          </div>
          <!-- Fin switch -->
          <div class="w-20 flex justify-center gap-2">
            <button
              v-for="(icon, index) in icons"
              :key="index"
              class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              :class="{
                'bg-blue-500 hover:bg-blue-600 text-white': !isDarkMode,
                'bg-blue-700 hover:bg-blue-800 text-gray-200': isDarkMode,
              }"
              @click.stop="icon.action"
            >
              <span v-html="icon.svg"></span>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Modal de Confirmación -->
      <ModalDynamic
        v-if="isModalVisible"
        :title="'Confirmar cambio de estado'"
        :message="'¿Estás seguro de que deseas cambiar el estado?'"
        :show="true"
        :config="{
          buttons: [
            { text: 'Aceptar', type: 'primary', action: confirmStateChange },
            { text: 'Cancelar', type: 'secondary', action: closeModal },
          ],
        }"
        @update:show="isModalVisible = $event"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits } from "vue";
  import { useRouter } from "vue-router";
  import Switch from "@/components/inputs/Switch.vue";
  import SwitchThreePhase from "@/components/inputs/SwitchThreePhase.vue";
  import ModalDynamic from "@/components/utils/ModalDynamic.vue";  
  import { useCompanyStore } from '@/stores/storeEmpresa';
  
  // Configuración de props y emits
  const props = defineProps({
    item: Object,
    clickable: {
      type: Boolean,
      default: false,
    },
    baseRoute: {
      type: String,
      default: "",
    },
    icons: {
      type: Array,
      default: () => [],
    },
    typeSwitch: {
      type: Number,
      default: 0,
    },
    borderColor: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(["update:status"]);
  const router = useRouter();
  
  // Variables reactivas
  const localState = ref(props.item?.state || "completed");
  const isModalVisible = ref(false);
  const pendingStateChange = ref(null);
  const switchTypeRef = ref(null);
  const isDarkMode = ref(false);
  
  const companyStore = useCompanyStore();
  
  // Configuración del tiempo de bloqueo
  const lockDuration = ref(30000); // 30 segundos
  
  // Cálculos para el nombre y la descripción truncados
  const truncatedName = computed(() => {
    if (!props.item?.name) return "Sin nombre";
    return props.item.name.length > 25
      ? props.item.name.substring(0, 25) + "..."
      : props.item.name;
  });
  
  const truncatedDescription = computed(() => {
    if (!props.item?.description) return "Sin descripción";
    return props.item.description.length > 140
      ? props.item.description.substring(0, 140) + "..."
      : props.item.description;
  });
  
  // Función para manejar el clic en el ítem
    const handleItemClick = () => {
        if (props.clickable && props.baseRoute && props.item?.id && !isModalVisible.value) {
            companyStore.setCompany(props.item);
            const fullRoute = `${props.baseRoute}/${props.item.id}/empresadashboard`;
            router.push(fullRoute);
        }
    };
  
  // Función para abrir el modal de confirmación
  const openConfirmationModal = (position, switchType) => {
  const currentTime = Date.now();
  const itemId = props.item.id;

  // Obtener registro de tiempos desde localStorage
  const lastChangeTimes = JSON.parse(localStorage.getItem("lastStateChange") || "{}");
  const lastChangeTime = lastChangeTimes[itemId] || 0;

  // Validar si el tiempo permitido aún no ha expirado
  if (currentTime - lastChangeTime < lockDuration.value) {
    alert("No puedes realizar más cambios. El tiempo permitido aún no ha expirado.");
    return;
  }

  let newState = "";
  if (switchType === 3) {
    if (position === "left") {
      newState = "completed";
    } else if (position === "center") {
      newState = "neutro";
    } else if (position === "right") {
      newState = "failed";
    }
  } else if (switchType === 2 || switchType === 0) {
    newState = localState.value === "completed" ? "failed" : "completed";
  }

  pendingStateChange.value = newState;
  switchTypeRef.value = switchType;
  isModalVisible.value = true;
};

  
  // Función para confirmar el cambio de estado
  const confirmStateChange = () => {
    localState.value = pendingStateChange.value;
    emit("update:status", { id: props.item.id, state: localState.value });
  
    // Registrar la hora del cambio en localStorage
    const itemId = props.item.id;
    const lastChangeTimes = JSON.parse(localStorage.getItem("lastStateChange") || "{}");
    lastChangeTimes[itemId] = Date.now();
    localStorage.setItem("lastStateChange", JSON.stringify(lastChangeTimes));
  
    closeModal();
  };
  
  // Función para cerrar el modal
  const closeModal = () => {
    isModalVisible.value = false;
    pendingStateChange.value = null;
  };
  
  // Función para obtener la posición del clic en el switch de tres fases
  const getSwitchPosition = (event) => {
    const switchElement = event.target;
    const rect = switchElement.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const switchWidth = rect.width;
  
    const leftLimit = switchWidth / 3;
    const rightLimit = 2 * switchWidth / 3;
  
    if (clickPosition < leftLimit) {
      return "left";
    } else if (clickPosition < rightLimit) {
      return "center";
    } else {
      return "right";
    }
  };
  </script>
  