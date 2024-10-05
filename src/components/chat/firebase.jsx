import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPf1vAY_2i3KD6kxaDe_iqvpKUPBk3nNg",
  authDomain: "talker-71d9b.firebaseapp.com",
  projectId: "talker-71d9b",
  databaseURL: "https://talker-71d9b-default-rtdb.firebaseio.com/",
  storageBucket: "talker-71d9b.appspot.com",
  messagingSenderId: "656456124351",
  appId: "1:656456124351:web:476c6e8ce1177ca1da430a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue, push };
