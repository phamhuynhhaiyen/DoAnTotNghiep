// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd7TtJIx-YMmvTtNbGNaV5I7DV5dT6D0s",
  authDomain: "node-api-e5128.firebaseapp.com",
  projectId: "node-api-e5128",
  storageBucket: "node-api-e5128.appspot.com",
  messagingSenderId: "743087276181",
  appId: "1:743087276181:web:df537a46f42a692bcc9b9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app