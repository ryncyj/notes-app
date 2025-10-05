<template>
  <transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/30">
      <transition
        enter-active-class="transition transform duration-300"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition transform duration-300"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4 sm:mx-auto"
        >
          <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
          <p class="mb-6">{{ message }}</p>
          <p v-if="errorMessage" class="text-red-500 text-sm mb-2">{{ errorMessage }}</p>
          <div class="flex justify-end space-x-3">
            <button
              @click="onCancel"
              :disabled="isLoading"
              class="px-3 py-1 bg-gray-300 text-black rounded shadow hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              @click="handleConfirm"
              :disabled="isLoading"
              class="px-3 py-1 bg-red-500 text-white rounded shadow hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Deleting...' : 'delete' }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    isOpen: Boolean,
    title: { type: String, default: 'Confirm' },
    message: { type: String, default: 'Are you sure?' },
    onConfirm: Function,
    onCancel: Function,
    errorMessage: { type: String, default: '' },
  })

  const isLoading = ref(false)

  const handleConfirm = async () => {
    if (props.onConfirm) {
      try {
        isLoading.value = true
        await props.onConfirm()
      } finally {
        isLoading.value = false
      }
    }
  }
</script>
