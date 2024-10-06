import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

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
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// firestore
export const dbFirestore = getFirestore(app);

// firebase realtime
export const dbRealtime = getDatabase(app);

// firebase messaging

export const messaging = async () => {
    const supported = await isSupported();
    return supported ? getMessaging(app) : null;
};
