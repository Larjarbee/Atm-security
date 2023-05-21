// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA8OSmzLuY5Dbfj4xaI_j1Uytbjx3IBlXQ',
  authDomain: 'atm-project-e9197.firebaseapp.com',
  databaseURL: 'https://atm-project-e9197-default-rtdb.firebaseio.com',
  projectId: 'atm-project-e9197',
  storageBucket: 'atm-project-e9197.appspot.com',
  messagingSenderId: '741797317907',
  appId: '1:741797317907:web:999119d6be4ac660045ee6',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
