// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBiyIKvVZO9Ya7gUncgBLCAHZ6JHAvOUg",
  authDomain: "bank-web-app-d6264.firebaseapp.com",
  projectId: "bank-web-app-d6264",
  storageBucket: "bank-web-app-d6264.appspot.com",
  messagingSenderId: "68338424553",
  appId: "1:68338424553:web:52ebb2b79f7750c730ae78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
