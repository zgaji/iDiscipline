// firebaseConfig.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Main config
const firebaseConfig = {
  apiKey: "AIzaSyB8fq8Q3uVbr2gazJdbWfJn8i0Ee-Ycgcg",
  authDomain: "idisicipline.firebaseapp.com",
  projectId: "idisicipline",
  storageBucket: "idisicipline.appspot.com",
  messagingSenderId: "229338411328",
  appId: "1:229338411328:android:9cf6f4d6bea1a707260aa5",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });
const firestore = getFirestore(app);
const storage = getStorage(app);

const adminApp = initializeApp(firebaseConfig, "AdminApp");
const adminAuth = getAuth(adminApp);

export { auth, firestore, storage, adminAuth };
