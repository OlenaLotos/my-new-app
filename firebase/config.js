import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADdREQ-QeioUaA6WezR9k9DEliZZGtvgU",
  authDomain: "my-new-app-9270c.firebaseapp.com",
  projectId: "my-new-app-9270c",
  storageBucket: "my-new-app-9270c.appspot.com",
  messagingSenderId: "832519709829",
  appId: "1:832519709829:web:3ef81fe7e4ee812fe175ec",
  measurementId: "G-8DEH21WP7T",
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };

export const db = getFirestore(app);
