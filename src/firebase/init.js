import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
const db = firebase
    .initializeApp({
        apiKey: "AIzaSyAogdBPQkJsreQu3pZxDIYd2aQwPclPLj4",
        authDomain: "smoothies-app-9b1b8.firebaseapp.com",
        databaseURL: "https://smoothies-app-9b1b8.firebaseio.com",
        projectId: "smoothies-app-9b1b8",
        storageBucket: "smoothies-app-9b1b8.appspot.com",
        messagingSenderId: "922524801909",
        appId: "1:922524801909:web:6a1b50303110e13873513c",
        measurementId: "G-TDDVP69JN6"
    })
    .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const {
    TimeStamp,
    GeoPoint
} = firebase.firestore
export {
    TimeStamp,
    GeoPoint
}

export default db;