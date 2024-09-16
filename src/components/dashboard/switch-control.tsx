'use client';

import { getDevice } from '@/actions/firebase/deviceConfig';
import { DatabaseReference } from 'firebase/database';
import { useEffect } from 'react';
import CardSwitch from '../ui/card-switch';

interface SwitchControlProps {
    deviceId: string;
    nodeId: string;
}

function SwitchControl({ deviceId, nodeId }: SwitchControlProps) {
    const handleChangeChecked = (checked: boolean) => {};

    const callBackCallDevice = (data: DatabaseReference) => {};

    useEffect(() => {
        const unsubscribe = getDevice({
            deviceId,
            nodeId,
            callBack: callBackCallDevice,
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    return (
        <>
            <CardSwitch
                name={'Lamp 2'}
                onCheckedChange={handleChangeChecked}
                status="ON"
            />
        </>
    );
}

export default SwitchControl;
