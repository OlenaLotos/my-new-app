import "firebase/auth";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";
import "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyADdREQ-QeioUaA6WezR9k9DEliZZGtvgU",
  authDomain: "my-new-app-9270c.firebaseapp.com",
  projectId: "my-new-app-9270c",
  storageBucket: "my-new-app-9270c.appspot.com",
  messagingSenderId: "832519709829",
  appId: "1:832519709829:web:3ef81fe7e4ee812fe175ec",
  measurementId: "G-8DEH21WP7T",
};

// export const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

// export { auth };

// export const db = getFirestore(app);
let app;
let auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}
export { app, auth };
export const db = getFirestore(app);
