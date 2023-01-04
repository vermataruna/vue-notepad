<template>
    <div class="notes">
        <AddEditNote 
            v-model="newNote"
            ref="addEditNoteRef"
            placeholder="Add new note"
            >
            <template #buttons>
                <button 
                    class="button is-link has-background-success"
                    @click="addNote"
                    :disabled="!newNote">
                    Add new note
                </button>
            </template>
        </AddEditNote>
      <progress
          v-if="!storeNotes.notesLoaded"
          class="progress is-large is-success"
          max="100"
      />
        <template v-else>
          <Note
              v-for="note in storeNotes.notes"
              :key="note.id"
              :note="note"
          />
          <div
              v-if="!storeNotes.notes.length"
              class="is-size-5 has-text-centered has-text-grey-light is-family-monospace py-6"
          >
            No notes :(
          </div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes.js'
import { useWatchCharacters } from '@/use/useWatchCharacters.js'


const newNote = ref('')
const storeNotes = useStoreNotes()
const addEditNoteRef = ref('null')

const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addEditNoteRef.value.focusTextarea()
}

useWatchCharacters(newNote)

</script>
