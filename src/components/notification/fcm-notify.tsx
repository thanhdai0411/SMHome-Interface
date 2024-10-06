'use client';

import useFcmToken from '@/hooks/useFcmToken';
import { BellRing } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

function FCMNotify() {
    const { token, notificationPermissionStatus } = useFcmToken();

    const handleTestNotification = async () => {
        const response = await fetch('/send-notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                title: 'Test Notification',
                message: 'This is a test notification',
                link: '/user',
            }),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <main className="fixed bottom-2 right-2 left-2 z-50">
            {notificationPermissionStatus === 'granted' ? (
                <></>
            ) : notificationPermissionStatus !== null ? (
                <Alert className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                    <BellRing className="h-5 w-5" color="white" />
                    <AlertTitle className="text-lg text-white">
                        Thông báo
                    </AlertTitle>
                    <AlertDescription className="text-base text-white ">
                        Vui lòng Cho phép Thông báo để nhận được những Thông báo
                        từ hệ thống. Bằng cách nhấp vào icon dấu chấm than bên
                        cạnh thanh địa chỉ và nhấp switch để cho phép
                        Notifications
                    </AlertDescription>
                </Alert>
            ) : null}

            {/* <Button
                disabled={!token}
                className="mt-5"
                onClick={handleTestNotification}
            >
                Send Test Notification
            </Button> */}
        </main>
    );
}

export default FCMNotify;
