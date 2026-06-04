import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDkFEoRCBFGtisfSE-Hjok-5awRjDTo-sM",
    authDomain: "fridge2table-a5460.firebaseapp.com",
    projectId: "fridge2table-a5460",
    storageBucket: "fridge2table-a5460.firebasestorage.app",
    messagingSenderId: "1007589937763",
    appId: "1:1007589937763:web:41c5c57e5aae8b160c9e56"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);