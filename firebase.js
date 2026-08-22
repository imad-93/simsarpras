import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// GitHub akan otomatis menyuntikkan kunci aman Anda ke sini saat aplikasi dijalankan
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
};

// Inisialisasi Firebase dan Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
