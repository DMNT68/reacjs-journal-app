import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDBlJmMQMAV_wTSWkfa4KA9oPzTwkbPvVs',
  authDomain: 'fir-test-4cd2a.firebaseapp.com',
  databaseURL: 'https://fir-test-4cd2a.firebaseio.com',
  projectId: 'fir-test-4cd2a',
  storageBucket: 'fir-test-4cd2a.appspot.com',
  messagingSenderId: '411863162646',
  appId: '1:411863162646:web:43c0912b0b7756112cfa37',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase
}