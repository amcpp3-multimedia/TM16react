import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCIR3QPeXMIrWYg1qRJY0fJlzGd3OkL0CE",
    authDomain: "tm16projectofinal.firebaseapp.com",
    projectId: "tm16projectofinal",
    storageBucket: "tm16projectofinal.firebasestorage.app",
    messagingSenderId: "516675824633",
    appId: "1:516675824633:web:5fd76f6c6c024565172b28"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }