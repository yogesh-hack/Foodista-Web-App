// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyChTyOuiHWjGyamcooJHL0Lz53GEJUbA4k",
    authDomain: "foodista-301c1.firebaseapp.com",
    projectId: "foodista-301c1",
    storageBucket: "foodista-301c1.appspot.com",
    messagingSenderId: "595061000206",
    appId: "1:595061000206:web:9087b7d835053eab76145f",
    measurementId: "G-GLMNB2VRJD"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

export {app,auth}
