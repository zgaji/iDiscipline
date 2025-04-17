// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage'; 
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

const firebaseConfig = {
  apiKey: "AIzaSyB8fq8Q3uVbr2gazJdbWfJn8i0Ee-Ycgcg", 
  authDomain: "idisicipline.firebaseapp.com", 
  projectId: "idisicipline", 
  storageBucket: "idisicipline.firebasestorage.app", 
  messagingSenderId: "229338411328", 
  appId: "1:229338411328:android:9cf6f4d6bea1a707260aa5", 
  measurementId: "G-XXXXXXX", 
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence (AsyncStorage)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)  // Correct persistence method
});

const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };