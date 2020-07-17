import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBG-50FdY8Uo03AvfIqH0l2B3YD4ZOSS_0',
  authDomain: 'crwn-db-c2f4a.firebaseapp.com',
  databaseURL: 'https://crwn-db-c2f4a.firebaseio.com',
  projectId: 'crwn-db-c2f4a',
  storageBucket: 'crwn-db-c2f4a.appspot.com',
  messagingSenderId: '444876477912',
  appId: '1:444876477912:web:c5a438dd21524677c84ead',
  measurementId: 'G-6QPTV2MMDE',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;