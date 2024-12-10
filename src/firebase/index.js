import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyB7KPS6SQyUBClvxxMye2gYbQjQe-FRK-M",
    authDomain: "summative-d31ff.firebaseapp.com",
    projectId: "summative-d31ff",
    storageBucket: "summative-d31ff.firebasestorage.app",
    messagingSenderId: "477780856282",
    appId: "1:477780856282:web:e6c92b38ed29288d23c4e3"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };