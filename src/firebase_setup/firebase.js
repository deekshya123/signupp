// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhk9lXMYsSRlFFa0z5w2vVaEaQPcgU80s",
  authDomain: "inventory-management-t.firebaseapp.com",
  databaseURL: "https://inventory-management-t-default-rtdb.firebaseio.com",
  projectId: "inventory-management-t",
  storageBucket: "inventory-management-t.appspot.com",
  messagingSenderId: "833341561570",
  appId: "1:833341561570:web:2f9bf43d553d83d2249cbb",
  measurementId: "G-M0DM6PM2Y7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
