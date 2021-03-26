import firebase from "./firebase"
import "firebase/database"
import "firebase/auth"

export const ref = firebase.database().ref("/")
export const firebaseAuth = firebase.auth