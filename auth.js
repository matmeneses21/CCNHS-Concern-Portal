/* ==========================================
   CCNHS Concern Portal
   auth.js
   Firebase Authentication Setup
========================================== */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

    getAuth,

    signInWithEmailAndPassword,

    setPersistence,

    browserLocalPersistence,

    browserSessionPersistence

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// Initialize Authentication

const auth = getAuth(app);

// ==========================
// HTML Elements
// ==========================

const loginForm =
    document.getElementById("loginForm");

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const rememberMe =
    document.getElementById("rememberMe");

const loginButton =
    document.getElementById("loginButton");

const loadingSpinner =
    document.getElementById("loadingSpinner");

const errorBox =
    document.getElementById("loginError");

// ==========================
// Helper Functions
// ==========================

function showError(message){

    errorBox.style.display = "block";

    errorBox.textContent = message;

}

function clearError(){

    errorBox.style.display = "none";

    errorBox.textContent = "";

}

function startLoading(){

    loginButton.disabled = true;

    loginButton.textContent = "Signing In...";

    loadingSpinner.style.display = "flex";

}

function stopLoading(){

    loginButton.disabled = false;

    loginButton.textContent = "Login";

    loadingSpinner.style.display = "none";

}

// ==========================
// Login Form
// ==========================

loginForm.addEventListener("submit", loginAdmin);

async function loginAdmin(event){

    event.preventDefault();

    clearError();

    startLoading();

    const adminEmail =
        email.value.trim();

    const adminPassword =
        password.value;

        try{

        // ==========================
        // Remember Me
        // ==========================

        const persistence =

            rememberMe.checked

            ? browserLocalPersistence

            : browserSessionPersistence;

        await setPersistence(

            auth,

            persistence

        );

        // ==========================
        // Sign In
        // ==========================

        const userCredential =

            await signInWithEmailAndPassword(

                auth,

                adminEmail,

                adminPassword

            );

        const user = userCredential.user;

        console.log(

            "Admin Logged In:",

            user.email

        );

        // ==========================
        // Success
        // ==========================

        loginButton.textContent =

            "Login Successful";

        loginButton.style.background =

            "#16a34a";

        setTimeout(()=>{

            window.location.href =

                "dashboard.html";

        },1000);

    }catch(error){

        console.error(error);

        switch(error.code){

            case "auth/invalid-email":

                showError(

                    "Invalid email address."

                );

                break;

            case "auth/user-not-found":

                showError(

                    "Admin account not found."

                );

                break;

            case "auth/wrong-password":

                showError(

                    "Incorrect password."

                );

                break;

            case "auth/invalid-credential":

                showError(

                    "Incorrect email or password."

                );

                break;

            case "auth/too-many-requests":

                showError(

                    "Too many login attempts. Please try again later."

                );

                break;

            default:

                showError(

                    error.message

                );

        }

    }finally{

        stopLoading();

    }

}

// ==========================
// Forgot Password
// ==========================

const forgotPassword =

    document.getElementById(

        "forgotPassword"

    );

forgotPassword.addEventListener(

    "click",

    (event)=>{

        event.preventDefault();

        const emailAddress =

            email.value.trim();

        if(emailAddress===""){

            showError(

                "Enter your email first."

            );

            return;

        }

        // Password reset will be
        // implemented in Part 1C.

        alert(

            "Password reset will be available in Part 1C."

        );

    }

);

/* ==========================================
   auth.js
   Session, Password Reset & Logout
========================================== */

import {

    sendPasswordResetEmail,

    onAuthStateChanged,

    signOut

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ==========================
// Password Reset
// ==========================

forgotPassword.addEventListener(

    "click",

    async(event)=>{

        event.preventDefault();

        clearError();

        const emailAddress =
            email.value.trim();

        if(emailAddress===""){

            showError(

                "Enter your email first."

            );

            return;

        }

        try{

            await sendPasswordResetEmail(

                auth,

                emailAddress

            );

            alert(

                "A password reset email has been sent."

            );

        }catch(error){

            console.error(error);

            showError(error.message);

        }

    }

);

// ==========================
// Check Login Session
// ==========================

onAuthStateChanged(

    auth,

    (user)=>{

        // If user is already logged in
        // and currently on login page

        if(

            user &&

            window.location.pathname

            .includes("admin.html")

        ){

            window.location.href =

                "dashboard.html";

        }

        // Protect dashboard page

        if(

            !user &&

            window.location.pathname

            .includes("dashboard.html")

        ){

            window.location.href =

                "admin.html";

        }

    }

);

// ==========================
// Logout
// ==========================

const logoutButton =

    document.getElementById(

        "logoutBtn"

    );

if(logoutButton){

    logoutButton.addEventListener(

        "click",

        async()=>{

            try{

                await signOut(auth);

                alert(

                    "You have been logged out."

                );

                window.location.href =

                    "admin.html";

            }catch(error){

                console.error(error);

                alert(

                    "Unable to logout."

                );

            }

        }

    );

}

// ==========================
// Console
// ==========================

console.log(

    "Firebase Authentication Ready"

);