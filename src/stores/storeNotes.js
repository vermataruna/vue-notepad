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
        this.notes = this.notes.filter(note => note.id !== nodeId)
    },
    updateNote(id, content) {
        const index = this.notes.findIndex(note => note.id === id)
        this.notes[index].content = content
    }
  },
  getters: {
    getNoteContent: (state) => {
        return (id) => {
            return state.notes.filter(note => note.id === id)[0].content
        }
    }
}
}) 