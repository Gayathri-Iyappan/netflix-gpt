// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDNcxpd55jKJzY5WAmtX0SnMQYrtEhHZo",
  authDomain: "netflixgpt-6bc08.firebaseapp.com",
  projectId: "netflixgpt-6bc08",
  storageBucket: "netflixgpt-6bc08.appspot.com",
  messagingSenderId: "301052883991",
  appId: "1:301052883991:web:76c5eaeb8d8ab0dbb09852",
  measurementId: "G-R75LQM73DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();