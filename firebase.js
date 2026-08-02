// Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBdije4PVEauOfobrmcygQaRHTWoob6weY",
    authDomain: "ccnhs-project.firebaseapp.com",
    projectId: "ccnhs-project",
    storageBucket: "ccnhs-project.firebasestorage.app",
    messagingSenderId: "220833174898",
    appId: "1:220833174898:web:e204794793cbe6e3c939eb",
    measurementId: "G-67N78R963Z"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firestore

const db = getFirestore(app);

// Export Firestore

export { db };