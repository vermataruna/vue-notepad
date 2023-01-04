import { defineStore } from 'pinia'
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from '@/js/firebase'

const notesCollectionRef = collection(db, "notes")

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
    onSnapshot(notesCollectionRef, (querySnapshot) => {
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
    async addNote(newNote) {
        let currentDate = new Date().getTime(), id = currentDate.toString()
        await setDoc(doc(notesCollectionRef, id), {
            content: newNote,
        });
    },
    async deleteNote(nodeId) {
        await deleteDoc(doc(notesCollectionRef,nodeId))
    },
    async updateNote(id, content) {
        await updateDoc(doc(notesCollectionRef, id), {
            content
        })
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
