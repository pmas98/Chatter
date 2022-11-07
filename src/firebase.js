// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage, ref} from "firebase/storage"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE0eXD24dgv4tt8MKv9lbYMqAtyixg9JI",
  authDomain: "chat-84289.firebaseapp.com",
  projectId: "chat-84289",
  storageBucket: "chat-84289.appspot.com",
  messagingSenderId: "513188924517",
  appId: "1:513188924517:web:3031cb66627a31717f0a8c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()