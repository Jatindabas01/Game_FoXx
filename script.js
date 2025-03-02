import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCeEGHMg0bfUj66IQll2GW3VYB91H7E04A",
    authDomain: "mail-7dfe4.firebaseapp.com",
    projectId: "mail-7dfe4",
    storageBucket: "mail-7dfe4.firebasestorage.app",
    messagingSenderId: "721937136824",
    appId: "1:721937136824:web:be61d35611f016f966884d",
    measurementId: "G-JKMNN858L4"
  }
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form submission event
document.getElementById("applicationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const position = document.getElementById("position").value;
    const reason = document.getElementById("reason").value;
    
    db.collection("applications").add({
        fullName: fullName,
        email: email,
        position: position,
        reason: reason,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("Application submitted successfully!");
        document.getElementById("applicationForm").reset();
    })
    .catch(error => {
        console.error("Error submitting application: ", error);
    });
});