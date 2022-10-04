// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAcqhipgJQRkCs9DoSg6l3DvgjZ9_iQHD4',
  authDomain: 'caramutan-profiling9713.firebaseapp.com',
  projectId: 'caramutan-profiling9713',
  storageBucket: 'caramutan-profiling9713.appspot.com',
  messagingSenderId: '65689852160',
  appId: '1:65689852160:web:dc2e817c0208da49cb7be5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
