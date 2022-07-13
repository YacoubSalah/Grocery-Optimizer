import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBr2T4NmRu98Id7JVo5eyYnBIzxQSwTOV8",
  authDomain: "upladingimages.firebaseapp.com",
  projectId: "upladingimages",
  storageBucket: "upladingimages.appspot.com",
  messagingSenderId: "1008897939847",
  appId: "1:1008897939847:web:e53aca57258c9336255b22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);