<template>
  <div
    class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer relative group w-full"
    @click="$emit('select', note)"
  >
    <!-- Hover overlay -->
    <div
      class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"
    ></div>

    <h2 class="text-xl font-semibold mb-2 truncate">{{ note.title }}</h2>
    <p class="text-gray-700 mb-4 truncate">{{ note.content }}</p>
    <p class="text-gray-700 text-xs">Created: {{ formatDate(note.created_at) }}</p>

    <!-- Delete Action -->
    <div class="flex justify-end relative">
      <button
        @click.stop="$emit('delete', note.id)"
        class="px-3 py-1 bg-red-500 text-white rounded shadow hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
  const formatDate = (dateString) => {
    if (!dateString) return ''
    
    // make sure date is interpreted as UTC for correct conversion to local time
    const date = new Date(dateString + 'Z')
    
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  defineProps({
    note: Object,
  })
</script>
