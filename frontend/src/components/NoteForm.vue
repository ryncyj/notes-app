<template>
  <div class="space-y-2">
    <input v-model="title" type="text" placeholder="Title" class="w-full p-2 border rounded" />
    <textarea v-model="content" placeholder="Content" class="w-full p-2 border rounded"></textarea>
    <div class="flex justify-end space-x-2">
      <button @click="saveNote" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {{ isEdit ? 'Update' : 'Save' }}
      </button>
      <button @click="$emit('cancel')" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, defineEmits } from 'vue'

  const props = defineProps({
    note: Object,
  })

  const emit = defineEmits(['save', 'cancel'])

  const title = ref(props.note?.title || '')
  const content = ref(props.note?.content || '')
  const isEdit = ref(!!props.note?.id)

  watch(
    () => props.note,
    (newNote) => {
      title.value = newNote?.title || ''
      content.value = newNote?.content || ''
      isEdit.value = !!newNote?.id
    },
  )

  const saveNote = () => {
    if (!title.value.trim() && !content.value.trim()) return
    emit('save', { id: props.note?.id, title: title.value, content: content.value })
    title.value = ''
    content.value = ''
  }
</script>
