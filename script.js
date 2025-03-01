import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyDha-gjj4H-A2P6cHOF7PxZpN5iERWiui0",
    authDomain: "mail-receiver-b92cf.firebaseapp.com",
    projectId: "mail-receiver-b92cf",
    storageBucket: "mail-receiver-b92cf.firebasestorage.app",
    messagingSenderId: "971738716592",
    appId: "1:971738716592:web:8fb44a13f9313e8073de75",
    measurementId: "G-KGG6MWVTBJ"
  };
  
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