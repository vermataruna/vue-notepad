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
            v-for="note in notes" 
            :key="note.id"
            :note="note"
            @deleteNote="deleteNote"   
        />

    </div>
</template>

<script setup>
import { ref } from 'vue';
import Note from '@/components/Notes/Note.vue';

const newNote = ref('')
const newNoteRef = ref(null)

const notes = ref([
    {
        id: 'id1',
        content: 'My first sample note for testing' 
    }, 
])

const addNote = () => {
    let currentDate = new Date().getTime(), id = currentDate.toString()
    let note = {
        id,
        content: newNote.value
    }
    notes.value.unshift(note)
    newNote.value = ''
    newNoteRef.value.focus()
}

const deleteNote = noteId => {
    notes.value = notes.value.filter(note => {
        return note.id !== noteId
    })
}

</script>