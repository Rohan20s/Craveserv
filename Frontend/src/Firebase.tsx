// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css"
import  firebase  from "firebase/compat/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHPtdU2yPLfImt4n9kXywWiKkJJF8LBgg",
  authDomain: "react-test-7013c.firebaseapp.com",
  databaseURL: "https://react-test-7013c-default-rtdb.firebaseio.com",
  projectId: "react-test-7013c",
  storageBucket: "react-test-7013c.appspot.com",
  messagingSenderId: "138259980695",
  apiSecret:"7013c",
  appId: "1:138259980695:web:b5108f7c9dcbe6fadda4d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
