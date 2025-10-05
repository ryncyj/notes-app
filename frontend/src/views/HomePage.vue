<template>
  <div class="w-full min-h-screen bg-[#F6F6F6]">
    <h1 class="text-4xl font-bold text-center bg-white py-4 shadow-md">My Notes</h1>
    <div class="max-w-6xl mx-auto p-5">
      <div class="w-full flex justify-end mb-4">
        <button @click="addNote"
          class="mb-4 px-4 py-2 bg-white text-black rounded shadow hover:shadow-lg transition-shadow">
          Create Note +
        </button>
      </div>
      <p v-if="errorMessage" class="bg-red-100 text-red-600 text-lg font-bold text-center mb-4 p-3 rounded-lg">
        {{ errorMessage }}
      </p>
      <NotesList :notes="notes" @select="openNote" @delete="confirmDelete" />
    </div>

    <ConfirmModal :isOpen="modalOpen" title="Confirm Delete" message="Are you sure you want to delete this note?"
      :onConfirm="() => deleteNote(deleteId)" :onCancel="() => (modalOpen = false)" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NotesList from '../components/NoteList.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import { useRouter } from 'vue-router'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const router = useRouter()
const notes = ref([])

const errorMessage = ref('')

// Modal state
const modalOpen = ref(false)
const deleteId = ref(null)

// Fetch notes from backend
const fetchNotes = async () => {
  try {
    const res = await fetch(`${API_URL}/note`)
    if (!res.ok) throw new Error(`Failed to fetch notes (${res.status})`)
    notes.value = await res.json()
    errorMessage.value = '' // clear old errors
  } catch (err) {
    console.error('Error fetching notes:', err)
    errorMessage.value = 'Failed to load notes. Please try again later.'
  }
}

// Open note
const openNote = (note) => {
  router.push(`/note/${note.id}`)
}

// Add new note
const addNote = () => {
  router.push('/note')
}

// Open modal to confirm delete
const confirmDelete = (id) => {
  deleteId.value = id
  modalOpen.value = true
}

// Delete note
const deleteNote = async (id) => {
  try {
    const res = await fetch(`${API_URL}/note/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete note')
    modalOpen.value = false
    deleteId.value = null
    fetchNotes()
  } catch (err) {
    console.error(err)
    alert('Failed to delete note')
  }
}

onMounted(fetchNotes)
</script>
