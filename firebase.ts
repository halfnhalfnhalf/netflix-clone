// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADsOY1jJAfo-6qJ04_QSV4sPZSG8mfbhw",
  authDomain: "fir-clone-2-fce49.firebaseapp.com",
  projectId: "fir-clone-2-fce49",
  storageBucket: "fir-clone-2-fce49.firebasestorage.app",
  messagingSenderId: "69762484857",
  appId: "1:69762484857:web:3e056cc3147aeb017e62a8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export default app
export { auth, db }