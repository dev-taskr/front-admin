<template>
    <div class="relative inline-flex items-center cursor-pointer">
      <button
        class="w-16 h-7 rounded-full relative transition-colors duration-200"
        :class="{
          'bg-green-500': modelValue === 'completed',
          'bg-red-500': modelValue === 'failed'
        }"
        @click="handleClick"
        :disabled="isLocked"
      >
        <!-- Indicador deslizante -->
        <div
          class="absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-200 shadow-md"
          :class="{
            'left-1': modelValue === 'completed',
            'left-[38px]': modelValue === 'failed'
          }"
        ></div>
      </button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    modelValue: String, // 'completed' o 'failed'
    isLocked: Boolean, // Bloquear el interruptor
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const handleClick = () => {
    if (!props.isLocked) {
      const newState = props.modelValue === 'completed' ? 'failed' : 'completed';
      emit('update:modelValue', newState);
    }
  };
  </script>
  