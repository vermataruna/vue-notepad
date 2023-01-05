import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBlLeeiKM0QE672TH1z4ve27ZM1xiZJRYw",
  authDomain: "vuenotepad.firebaseapp.com",
  projectId: "vuenotepad",
  storageBucket: "vuenotepad.appspot.com",
  messagingSenderId: "1017337774556",
  appId: "1:1017337774556:web:e30b8a3b077beefcf18f19",
  measurementId: "G-DN4FGY0KXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { 
    db,
    auth
}