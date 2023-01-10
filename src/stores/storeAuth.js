import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { useStoreNotes } from '@/stores/storeNotes'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push('/')
          storeNotes.init()
        } else {
          this.user = {}
          this.router.replace('/auth')
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
          .then((userCredential) => {
            const user = userCredential.user
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log("Error:",errorMessage, '-', errorCode)
          });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
          .then((userCredential) => {
            const user = userCredential.user
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log("Error:",errorMessage, '-', errorCode)
          });
    },
    signOutUser() {
      signOut(auth).then(() => {
      }).catch((error) => {
        console.log("Error:", error)
      });
    }
  },
  getters: {}
})
