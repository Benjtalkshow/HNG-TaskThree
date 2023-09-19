// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFf89BWZBQ2ztOKznjhPnIHmEUb1CyR_8",
  authDomain: "react-image-gallery-6486b.firebaseapp.com",
  projectId: "react-image-gallery-6486b",
  storageBucket: "react-image-gallery-6486b.appspot.com",
  messagingSenderId: "792087319248",
  appId: "1:792087319248:web:1c0cf832731d13a3a8c4d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export { auth };
