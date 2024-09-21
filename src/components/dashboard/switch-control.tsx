'use client';

import { getDevice, IDeviceConfigDTO, setStatusDevice } from '@/actions/firebase/deviceConfig';
import { useEffect, useState } from 'react';
import CardSwitch from '../ui/card-switch';

interface SwitchControlProps {

    nodeId: string;
    deviceData: IDeviceConfigDTO
}

const statusDeviceTranslate = (checked: boolean) => {
    return checked ? "ON" : "OFF"
}



const bgDeviceStatus = (checked: boolean, styleOff: string, styleOn: string) => {
    return checked ? styleOn : styleOff
}

function SwitchControl({ nodeId, deviceData }: SwitchControlProps) {
    const [status, setStatus] = useState<boolean>(false)
    const handleChangeChecked = (checked: boolean) => {
        console.log({ checked })
        setStatusDevice({
            deviceId: deviceData.deviceId,
            nodeId,
            status: checked
        })
    };

    const callBackCallDevice = (data: any) => {
        setStatus(data.status)
    };

    useEffect(() => {
        const unsubscribe = getDevice({
            deviceId: deviceData.deviceId,
            nodeId,
            callBack: callBackCallDevice,
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, [status, deviceData?.deviceId, nodeId]);


    return (
        <>
            <CardSwitch
                name={deviceData.name || ""}
                onCheckedChange={handleChangeChecked}
                className={bgDeviceStatus(status, deviceData.styleOFF, deviceData.styleON)}
                status={statusDeviceTranslate(status)}
            />
        </>
    );
}

export default SwitchControl;
