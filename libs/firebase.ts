// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUXyKMdfs9MHi3PRud_fyQa4vqSwxgwNU",
  authDomain: "ehop-93b6a.firebaseapp.com",
  projectId: "ehop-93b6a",
  storageBucket: "ehop-93b6a.appspot.com",
  messagingSenderId: "367483504410",
  appId: "1:367483504410:web:84c0bed62693ad6d67cea3",
  measurementId: "G-L2PN53VYVS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseApp