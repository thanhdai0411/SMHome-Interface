'use client';
import React, { useEffect } from 'react';

interface FCMProviderProps {
    children: React.ReactNode;
}

const FCMProvider = ({ children }: FCMProviderProps) => {
    useEffect(() => {
        const requestPermission = async () => {
            const status = await Notification.requestPermission();
            if (status === 'granted') {
                console.log('Notification permission granted');
                // Get the FCM token for this device

                // Send this token to your server for further processing
            } else {
                console.log('Notification permission denied');
            }
        };

        requestPermission();
    }, []);

    return children;
};

export default FCMProvider;
