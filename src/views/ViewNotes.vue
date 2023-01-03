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
        <Note 
            v-for="note in storeNotes.notes" 
            :key="note.id"
            :note="note" 
        />
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
