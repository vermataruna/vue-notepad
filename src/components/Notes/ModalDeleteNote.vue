<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div
        class="modal-card"
        ref="modalCardRef"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">Delete note?</p>
        <button
            class="delete"
            aria-label="close"
            @click="closeModal"
        ></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button
            class="button is-danger"
            @click="storeNotes.deleteNote(noteId)"
        >Delete</button>
        <button
            class="button"
            @click="closeModal"
          >Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import {onMounted, onUnmounted, ref} from "vue";
import { useStoreNotes } from '@/stores/storeNotes.js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const storeNotes = useStoreNotes()

const closeModal = () => {
  emit('update:modelValue', false)
}

//click outside to close
const modalCardRef = ref('')
onClickOutside(modalCardRef, closeModal)

//keyboard control
onMounted(() => {
  document.addEventListener('keyup', handleKeyboard)
})

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyboard)
})

const handleKeyboard = e => {
  if (e.key === 'Escape') closeModal()
}

</script>
