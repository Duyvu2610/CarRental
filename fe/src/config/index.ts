import routes from "./routes";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const config = {
    routes
}

const firebaseConfig = {
    apiKey: "AIzaSyBwcP1mQzjZ3OPIMT7AyWdj958bdwsgBCI",
    authDomain: "tiktok-bba22.firebaseapp.com",
    databaseURL: "https://tiktok-bba22-default-rtdb.firebaseio.com",
    projectId: "tiktok-bba22",
    storageBucket: "tiktok-bba22.appspot.com",
    messagingSenderId: "732272594487",
    appId: "1:732272594487:web:7a186d0dc492bfa111b9b2",
    measurementId: "G-CKLG1H7570"
  };

  const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };

export default config

