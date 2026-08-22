// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyPsodRrOo1QQPtQe9nZgupG2cGKyJyF4",
  authDomain: "netflix-clone-38b23.firebaseapp.com",
  projectId: "netflix-clone-38b23",
  storageBucket: "netflix-clone-38b23.firebasestorage.app",
  messagingSenderId: "731246848236",
  appId: "1:731246848236:web:adfcd730795ded00875dc9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth()

export default app
export { auth, db }