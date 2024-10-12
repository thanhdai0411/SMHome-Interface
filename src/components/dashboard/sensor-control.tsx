'use client';

import { getSensor, ISensorConfigDTO } from '@/actions/firebase/sensorConfig';
import { ThermometerSun } from 'lucide-react';
import { useEffect, useState } from 'react';
import CardSensor from '../ui/card-sensor';

interface SensorControlProps {
    nodeId: string;
    sensorData: ISensorConfigDTO;
}

function SensorControl({ nodeId, sensorData }: SensorControlProps) {
    const [value, setValue] = useState<number>(0);

    const callBackCallDevice = (data: any) => {
        setValue(data?.value || 0);
    };

    useEffect(() => {
        const unsubscribe = getSensor({
            sensorId: sensorData.sensorId,
            nodeId,
            callBack: callBackCallDevice,
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, [value, sensorData.sensorId, nodeId]);

    return (
        <>
            <CardSensor
                className={sensorData?.style || ''}
                name={sensorData.name}
                value={`${value} ${sensorData?.unit || ''}`}
                icon={sensorData.icon}
            />
        </>
    );
}

export default SensorControl;
