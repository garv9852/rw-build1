import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyCYLUerqHByUKGFqFgVISRtXGfIx9S2M-A",
  authDomain: "rw-bulid.firebaseapp.com",
  projectId: "rw-bulid",
  storageBucket: "rw-bulid.appspot.com",
  messagingSenderId: "1052387738957",
  appId: "1:1052387738957:web:55d0888a3d3e68c598a304",
  measurementId: "G-BHD7X53R2Q"
};

const app = initializeApp(firebaseConfig);
export const database={
    users:collection,
    posts:collection
}
export const db = getFirestore(app);
export const auth=getAuth(app)
export const storage=getStorage(app);