import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDJazJ7TqGZtzrQh3qEWz5t-aucHGVLx4Q",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "green-nest-abbas.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "green-nest-abbas",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "green-nest-abbas.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "211631616577",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:211631616577:web:5ff66eca021b413aeb0cc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
