import firebase from "firebase/app";
import "firebase/storage"
import "firebase/firestore";
import "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCpwOXyOBgZGlws9yqcW-EnIVeYcZNnF2g",
  authDomain: "ads-manager-system.firebaseapp.com",
  projectId: "ads-manager-system",
  storageBucket: "ads-manager-system.appspot.com",
  messagingSenderId: "682896184689",
  appId: "1:682896184689:web:27568ff65becd47b2a92d0",
  measurementId: "G-5DEV6N99EX",
};



export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


