import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
    apiKey: 'AIzaSyDmw_bjtsCIyMDEs6BH28p_TGW-gzv0mAs',
    authDomain: 'sm-home-e3d95.firebaseapp.com',
    databaseURL:
        'https://sm-home-e3d95-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'sm-home-e3d95',
    storageBucket: 'sm-home-e3d95.appspot.com',
    messagingSenderId: '518459872073',
    appId: '1:518459872073:web:a386a618a9bfc14dd94098',
    measurementId: 'G-D1P30051BH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firestore
export const dbFirestore = getFirestore(app);

// firebase realtime
export const dbRealtime = getDatabase(app);
