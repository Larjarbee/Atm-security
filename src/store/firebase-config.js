// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_API_DOMAIN,
  databaseURL: import.meta.env.VITE_API_DATABASE,
  projectId: import.meta.env.VITE_API_ID,
  storageBucket: import.meta.env.VITE_API_STORAGE,
  messagingSenderId: import.meta.env.VITE_API_MSG,
  appId: import.meta.env.VITE_API_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
