<template>
    <div class="edit-note">
        <AddEditNote 
            ref="addEditNoteRef"
            v-model="noteContent"
            bgColor="link"
            placeholder="Edit note"
            label="Edit note "
            >
            <template #buttons>
                <button 
                    class="button is-link is-light mr-2"
                    @click="$router.back()"
                >
                    Cancel
                </button>
                <button 
                    class="button is-link has-background-link"
                    :disabled="!noteContent"
                    @click="handleSaveClicked"
                >
                    Save note
                </button>
            </template>
        </AddEditNote>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useStoreNotes } from '@/stores/storeNotes'
import { useRoute, useRouter } from 'vue-router'

const storeNotes = useStoreNotes()
const route = useRoute()
const router = useRouter()
const noteContent = ref('')
noteContent.value = storeNotes.getNoteContent(route.params.id)

const handleSaveClicked = () => {
    storeNotes.updateNote(route.params.id, noteContent.value)
    router.push('/')
}

</script>