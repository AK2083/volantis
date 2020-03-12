import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBTmDD-UBhbGvadlvM7Fgm5csQQu9x4E5E',
  authDomain: 'yggdrasil-36613.firebaseapp.com',
  databaseURL: 'https://yggdrasil-36613.firebaseio.com',
  projectId: 'yggdrasil-36613',
  storageBucket: 'yggdrasil-36613.appspot.com',
  messagingSenderId: '904939633252',
  appId: '1:904939633252:web:950128d1db04910c',
};

function initFirebase() {
  firebase.initializeApp(firebaseConfig);

  return new Promise((resolve, reject) => {
    firebase.firestore().enablePersistence()
      .then(resolve)
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          reject(err);
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          reject(err);
          // The current browser does not support all of
          // the features required to enable persistence
        }
      });
  });
}

export { firebase, initFirebase };
