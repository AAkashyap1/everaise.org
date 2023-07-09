import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCtNgUqlIOqJVJUkf2p6ncM5jgdssa9BSk',
  authDomain: 'everaise-launch-83ee8.firebaseapp.com',
  databaseURL: 'https://everaise-launch-83ee8-default-rtdb.firebaseio.com',
  projectId: 'everaise-launch-83ee8',
  storageBucket: 'everaise-launch-83ee8.appspot.com',
  messagingSenderId: '862278495973',
  appId: '1:862278495973:web:40ce33cb196be320382e0c',
  measurementId: 'G-RBBZJNHH3S'
});

const firestore = app.firestore();

export const database = {
  users: firestore.collection('users'),
  emails: firestore.collection('subscription_emails'),
  physics_users: firestore.collection('physics_users'),
  astronomy_users: firestore.collection('astronomy_users'),
  biology_users: firestore.collection('biology_users'),
  math_users: firestore.collection('math_users'),
  total_users: firestore.collection('total_users'),
  physics_assignments: firestore.collection('physics_assignments'),
  math_assignments: firestore.collection('math_assignments'),
  biology_assignments: firestore.collection('biology_assignments'),
  astronomy_assignments: firestore.collection('astronomy_assignments'),
  latex: firestore.collection('latex'),
  announcements: firestore.collection('announcements'),
  registrations: firestore.collection('registration')
};

export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);

export const getUserInfo = (email) => {
  return database.users.doc(email).get();
};

export const Auth = app.auth();
export default app;
