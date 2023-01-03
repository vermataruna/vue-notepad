import { defineStore } from 'pinia'
import { collection, onSnapshot } from "firebase/firestore"
import { db } from '@/js/firebase'

export const useStoreNotes = defineStore('storeNotes', {
    //state is only for storing data
  state: () => {
    return { 
        notes: []
     }
  },
  actions: {
    // todo: unsubscribe to onSnapshot hook (as it keeps on running until stopped)
    // reference: https://firebase.google.com/docs/firestore/query-data/listen?hl=en&authuser=0#listen_to_multiple_documents_in_a_collection
    
    async getNotes() {
    onSnapshot(collection(db,"notes"), (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
            let note = {
                id: doc.id,
                content: doc.data().content
            }
            notes.push(note)
        })
        this.notes = notes
        })
    },
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
    },
      getTotalNotesCount: (state) => {
        return state.notes.length
      },
      getTotalCharactersCount: (state) => {
        let count = 0
          state.notes.forEach(note => {
              count += note.content.length
          })
          return count
      }
    }
})
