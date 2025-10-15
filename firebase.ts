// Import the functions you need from the SDKs you need
import { getApps,initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOBJOmyX-IbbSRMMOq40iB0f2ktueNiOE",
  authDomain: "chat-app-1625a.firebaseapp.com",
  projectId: "chat-app-1625a",
  storageBucket: "chat-app-1625a.firebasestorage.app",
  messagingSenderId: "731251912491",
  appId: "1:731251912491:web:3a6a2805c4b33cfda4df6e",
  measurementId: "G-H8ZD3E28NJ"
};


// Initialize Firebase
const app =getApps().length?getApps()[0] : initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)
export{auth,db}

// const analytics = getAnalytics(app);