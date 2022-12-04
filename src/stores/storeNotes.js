import { defineStore } from 'pinia'

export const useStoreNotes = defineStore('storeNotes', {
    //state is only for storing data
  state: () => {
    return { 
        notes: [
            {
                id: 'id1',
                content: 'My first sample note for testing' 
            },
            {
                id: 'id2',
                content: 'My second sample note for testing' 
            },
        ]
     }
  },
  actions: {
    addNote(newNote) {
        let currentDate = new Date().getTime(), id = currentDate.toString()
        let note = {
            id,
            content: newNote
        }
        this.notes.unshift(note)
    },
    deleteNote(nodeId) {
        this.notes = this.notes.filter(note => {
            return note.id !== nodeId
        })
    }
  }
}) 