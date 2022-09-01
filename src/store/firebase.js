import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyK3RGI3XpJN0CJkMQpQeMYgp26_IlbXE",
  authDomain: "optimzer-36fbb.firebaseapp.com",
  projectId: "optimzer-36fbb",
  storageBucket: "optimzer-36fbb.appspot.com",
  messagingSenderId: "943519498976",
  appId: "1:943519498976:web:eddfeeb6eb76f5feeac685",
  measurementId: "G-WR5XF9RC28"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const storage = getStorage(app);