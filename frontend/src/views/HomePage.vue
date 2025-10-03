<template>
  <div class="w-full p-6 bg-[#f7f6fc]">

    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold mb-6 text-center">My Notes</h1>
      <div class="w-full flex justify-end mb-4">
        <button @click="addNote"
          class="mb-4 px-4 py-2 bg-white text-black rounded shadow hover:shadow-lg transition-shadow">
          Create Note +
        </button>
      </div>
      <NotesList :notes="notes" @select="openNote" @delete="confirmDelete" />
    </div>

    <ConfirmModal :isOpen="modalOpen" title="Confirm Delete" message="Are you sure you want to delete this note?"
      :onConfirm="() => deleteNote(deleteId)" :onCancel="() => (modalOpen = false)" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NotesList from '../components/NoteList.vue'
import ConfirmModal from '../components/confirmModal.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const notes = ref([])

// Modal state
const modalOpen = ref(false)
const deleteId = ref(null)

// Fetch notes from backend
const fetchNotes = async () => {
  const res = await fetch('http://localhost:5000/note')
  notes.value = await res.json()
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
    const res = await fetch(`http://localhost:5000/note/${id}`, { method: 'DELETE' })
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
