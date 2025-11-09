import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkUb69LYwehSWmsnVsdfxNWc84bCvPTo8",
  authDomain: "portafolio-643d6.firebaseapp.com",
  projectId: "portafolio-643d6",
  storageBucket: "portafolio-643d6.firebasestorage.app",
  messagingSenderId: "753202797765",
  appId: "1:753202797765:web:6e02ed17404c7f301a64ac",
  measurementId: "G-FHVNDBBQCG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);