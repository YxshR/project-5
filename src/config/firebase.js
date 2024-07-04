// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwSO0SV0V3eUhnCin98ZfcB-R-LEh6JIo",
  authDomain: "vite-contact-171cc.firebaseapp.com",
  projectId: "vite-contact-171cc",
  storageBucket: "vite-contact-171cc.appspot.com",
  messagingSenderId: "664481039252",
  appId: "1:664481039252:web:cc7c1d68f02cb8c5614581"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);