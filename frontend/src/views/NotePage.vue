<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Header -->
    <div class="flex flex-wrap items-center bg-white px-4 py-3 shadow-md flex-shrink-0">
      <!-- Back button -->
      <button
        @click="goBack"
        class="text-gray-600 hover:text-gray-800 font-semibold mr-2 flex-shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Title input -->
      <input
        v-model="note.title"
        placeholder="Enter Title"
        class="flex-1 min-w-[100px] text-4xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 my-1 sm:my-0"
      />

      <!-- Save button -->
      <button
        :disabled="!canSave || isSaving"
        @click="save"
        class="ml-2 mt-1 sm:mt-0 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
      >
        {{ isSaving ? 'Saving...' : 'Save' }}
      </button>
      <!-- Error message -->
      <span v-if="errorMessage" class="text-red-500 text-sm mt-1 sm:mt-0 sm:ml-2 px-4">
        {{ errorMessage }}
      </span>
    </div>

    <!-- Content editor -->
    <div class="flex-1 p-4">
      <textarea
        v-model="note.content"
        placeholder="Start typing your note... Remember to click save..."
        class="w-full h-full text-lg leading-relaxed bg-transparent border-none focus:outline-none focus:ring-0 resize-none"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const router = useRouter()
  const route = useRoute()

  const noteId = route.params.id
  const note = reactive({ title: '', content: '' })

  const isSaving = ref(false)
  const isNewNote = computed(() => !noteId)
  const canSave = computed(() => note.title.trim() !== '' && note.content.trim() !== '')
  const errorMessage = ref('')

  onMounted(async () => {
    if (!isNewNote.value) {
      const res = await fetch(`${API_URL}/note/${noteId}`)
      const data = await res.json()
      note.title = data.title
      note.content = data.content
    }
  })

  const save = async () => {
    errorMessage.value = ''
    try {
      isSaving.value = true
      if (isNewNote.value) {
        await createNote()
      } else {
        await updateNote()
      }
      router.push('/')
    } catch (err) {
      console.error('Error saving note:', err)
      errorMessage.value = 'Failed to save note. Please try again.'
    } finally {
      isSaving.value = false
    }
  }

  const goBack = () => {
    router.push('/')
  }

  const createNote = async () => {
    const response = await fetch(`${API_URL}/note`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    })
    if (!response.ok) throw new Error('Failed to create note')
    return response.json()
  }

  const updateNote = async () => {
    const response = await fetch(`${API_URL}/note/${noteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    })
    if (!response.ok) throw new Error('Failed to update note')
    return response.json()
  }
</script>
