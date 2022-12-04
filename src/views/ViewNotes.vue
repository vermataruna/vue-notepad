<template>
    <div class="notes">
        <div class="card has-background-success-dark p-4 mb-5">
            <div class="field">
            <div class="control">
            <textarea class="textarea" 
                      placeholder="Add a new note"
                      v-model="newNote"
                      ref="newNoteRef"/>
            </div>
            </div>

            <div class="field is-grouped is-grouped-right">
            <div class="control">
            <button class="button is-link has-background-success"
                    @click="addNote"
                    :disabled="!newNote">
                Add new note
            </button>
            </div>
            </div>
        </div>

        <Note 
            v-for="note in storeNotes.notes" 
            :key="note.id"
            :note="note" 
        />

    </div>
</template>

<script setup>
import { ref } from 'vue';
import Note from '@/components/Notes/Note.vue';
import { useStoreNotes } from '@/stores/storeNotes.js'

const newNote = ref('')
const newNoteRef = ref(null)

const storeNotes = useStoreNotes()

const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    newNoteRef.value.focus()
}

</script>