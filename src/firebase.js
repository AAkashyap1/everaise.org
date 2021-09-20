import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

const firestore = app.firestore()

export const database = {
  users: firestore.collection("users"),
  emails: firestore.collection("subscription_emails"),
  physics_users: firestore.collection("physics_users"),
  astronomy_users: firestore.collection("astronomy_users"),
  biology_users: firestore.collection("biology_users"),
  math_users: firestore.collection("math_users"),
  total_users: firestore.collection("total_users"),
  physics_assignments: firestore.collection("physics_assignments"),
  math_assignments: firestore.collection("math_assignments"),
  biology_assignments: firestore.collection("biology_assignments"),
  astronomy_assignments: firestore.collection("astronomy_assignments"),
}

export const increment = firebase.firestore.FieldValue.increment(1)
export const decrement = firebase.firestore.FieldValue.increment(-1)

export const getUserInfo = email => {
  return database.users.doc(email).get()
}

export const Auth = app.auth()
export default app