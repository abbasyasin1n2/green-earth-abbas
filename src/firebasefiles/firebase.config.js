// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJazJ7TqGZtzrQh3qEWz5t-aucHGVLx4Q",
  authDomain: "green-nest-abbas.firebaseapp.com",
  projectId: "green-nest-abbas",
  storageBucket: "green-nest-abbas.firebasestorage.app",
  messagingSenderId: "211631616577",
  appId: "1:211631616577:web:5ff66eca021b413aeb0cc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
