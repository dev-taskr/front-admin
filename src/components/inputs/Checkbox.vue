<template>
    <label class="inline-flex items-center">
      <input
        type="checkbox"
        :id="id"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-600"
      />
      <span class="ml-2 text-gray-900 dark:text-gray-300">
        <slot></slot>
      </span>
    </label>
  </template>
  
  <script setup>
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
  });
  </script>
  