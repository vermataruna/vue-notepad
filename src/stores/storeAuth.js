import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
        } else {
          this.user = {}
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
