<template>
    <div class="stats">
        <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Stat</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>Number of notes</td>
                  <td>{{ storeNotes.getTotalNotesCount }}</td>
                </tr>
                <tr>
                  <td>Number of characters(all notes)</td>
                  <td>{{ storeNotes.getTotalCharactersCount }}</td>
                </tr>
            </tbody>
        </table>
      <input type="text"
             class="input"
             placeholder="Do you like the application?"
             v-model="loveApp"
             v-autofocus>
    </div>
</template>

<script setup>
import { useStoreNotes } from '@/stores/storeNotes'
import { vAutofocus } from '@/directives/vAutofocus.js'
import { useWatchCharacters } from '@/use/useWatchCharacters.js'
import {ref} from "vue";

const storeNotes = useStoreNotes()

const loveApp = ref('')
useWatchCharacters(loveApp, 50)


</script>
