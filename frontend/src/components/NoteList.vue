<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <NoteItem
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @select="$emit('select', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script setup>
  import NoteItem from './NoteItem.vue'

  defineProps({
    notes: Array,
  })
  defineEmits(['select', 'delete'])
</script>
