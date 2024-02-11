// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw3sbV2PcAkmAQuJQTkilCcZhDsZeS0ew",
  authDomain: "fir-course-a182d.firebaseapp.com",
  projectId: "fir-course-a182d",
  storageBucket: "fir-course-a182d.appspot.com",
  messagingSenderId: "567017414947",
  appId: "1:567017414947:web:83ec3317bad9e7b5ddac96",
  measurementId: "G-1N145W0BZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);