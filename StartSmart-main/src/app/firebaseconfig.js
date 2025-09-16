// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDLr7HDn0RNb0fTzkY3oivDpoRc5JdV18E",
  authDomain: "startsmart-626e3.firebaseapp.com",
  databaseURL: "https://startsmart-626e3-default-rtdb.firebaseio.com",
  projectId: "startsmart-626e3",
  storageBucket: "startsmart-626e3.firebasestorage.app",
  messagingSenderId: "301744199153",
  appId: "1:301744199153:web:4dd0f3a7785ef10b2ae050",
  measurementId: "G-FX60LKVVLS"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
