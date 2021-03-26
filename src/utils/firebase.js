import firebase from 'firebase';
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABT3MHYTYxJAqrF-uHrvUp4EGMFGP22cI",
    authDomain: "sokoban-6184e.firebaseapp.com",
    projectId: "sokoban-6184e",
    storageBucket: "sokoban-6184e.appspot.com",
    messagingSenderId: "1086877100421",
    appId: "1:1086877100421:web:b28952dda26f69a3b43cec",
    measurementId: "G-L304SDHKRX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export default firebase;
export { db, auth };