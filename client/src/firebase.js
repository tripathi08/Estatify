// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a6759.firebaseapp.com",
  projectId: "mern-estate-a6759",
  storageBucket: "mern-estate-a6759.appspot.com",
  messagingSenderId: "192366207673",
  appId: "1:192366207673:web:38571eac6ab3333ed97168"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);