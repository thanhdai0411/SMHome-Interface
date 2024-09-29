import { messaging } from '@/configs/firebase';
import { getToken } from 'firebase/messaging';

export const fetchToken = async () => {
    try {
        const fcmMessaging = await messaging();
        if (fcmMessaging) {
            const token = await getToken(fcmMessaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
            });

            return token;
        }
        return null;
    } catch (err) {
        console.error('An error occurred while fetching the token:', err);
        return null;
    }
};
