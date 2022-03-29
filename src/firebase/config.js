import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyBjCuOyAD7XzbluUMSIwOQ8xVkwzXv_wf8",
    authDomain: "chatapp-1126c.firebaseapp.com",
    projectId: "chatapp-1126c",
    storageBucket: "chatapp-1126c.appspot.com",
    messagingSenderId: "611271836452",
    appId: "1:611271836452:web:231eee690ae2ecc66c29b1",
    measurementId: "G-G7YE1KK1XT"
  };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// firebase.analytics()
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099')
if (window.location.hostname === 'localhost') {
  db.useEmulator('localhost', '8080')
}

export { auth, db }
export default firebase