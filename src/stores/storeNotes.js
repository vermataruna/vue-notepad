import { defineStore } from 'pinia'
import {
    collection, onSnapshot,
    doc, deleteDoc, updateDoc, addDoc,
    query, orderBy
} from "firebase/firestore"
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

let notesCollectionRef
let notesCollectionQuery

export const useStoreNotes = defineStore('storeNotes', {
    //state is only for storing data
  state: () => {
    return { 
        notes: [],
        notesLoaded: false
     }
  },
  actions: {
 
    init() {
        const storeAuth = useStoreAuth()
        notesCollectionRef = collection(db, 'users', storeAuth.user.id , 'notes') 
        notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"))
        this.getNotes()
    },

    // todo: unsubscribe to onSnapshot hook (as it keeps on running until stopped)

    // reference: https://firebase.google.com/docs/firestore/query-data/listen?hl=en&authuser=0#listen_to_multiple_documents_in_a_collection
    
    async getNotes() {
        this.notesLoaded = false
        onSnapshot(notesCollectionQuery, (querySnapshot) => {
            let notes = []
            querySnapshot.forEach(doc => {
            let note = {
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date
                    }
            notes.push(note)
            this.notes = notes
            this.notesLoaded = true
            })
        });
    },
    clearNotes() {
        this.notes = []
    },
    async addNote(newNote) {
        let currentDate = new Date().getTime(), date = currentDate.toString()
        await addDoc(notesCollectionRef, {
            date,
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
