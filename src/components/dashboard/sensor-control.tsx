'use client';

import { getSensor, ISensorConfigDTO } from '@/actions/firebase/sensorConfig';
import {
    GAS_SENSOR_ID,
    HUMI_SENSOR_ID,
    SMOKE_SENSOR_ID,
    SR_SENSOR_ID,
    TEMP_SENSOR_ID,
} from '@/constants/node-config';
import { useEffect, useMemo, useState } from 'react';
import { toast, Toaster } from 'sonner';
import CardSensor from '../ui/card-sensor';
import { playSound } from '@/utils/playSound';
import { getNodeConfigLocal } from '@/hooks/useFetchConfigNode';

interface SensorControlProps {
    nodeId: string;
    sensorData: ISensorConfigDTO;
}

function SensorControl({ nodeId, sensorData }: SensorControlProps) {
    const [value, setValue] = useState<number | null>(null);

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

    const isAllowAlertBlink = useMemo(() => {
        let allow = false;
        if (sensorData.isAlert == true) {
            allow = Number(value) == 1 ? true : false;
        } else if (sensorData.isAlertThreshold) {
            if (sensorData?.minThreshold) {
                allow =
                    Number(value) < Number(sensorData?.minThreshold)
                        ? true
                        : false;
            }

            if (sensorData?.maxThreshold) {
                allow =
                    Number(value) > Number(sensorData?.maxThreshold)
                        ? true
                        : false;
            }
        }

        return allow;
    }, [value, sensorData]);

    const notificationAlert = (title: string, desc: string) => {
        toast.message(title, {
            description: desc,
        });
        playSound(10);
    };

    useEffect(() => {
        if (!value) return;
        const sensorCheckId = sensorData.sensorId;
        const configNodes = getNodeConfigLocal();

        const { acitve: activeNode, name: nameNode } =
            configNodes?.[nodeId]?.config;

        if (activeNode == false) return;

        const {
            active,
            isAlert,
            isAlertThreshold, 
            maxThreshold,
            minThreshold,
            name: nameSensor,
        } = {...configNodes?.[nodeId]?.[sensorCheckId]?.config};

        if (value == 1 && sensorCheckId == SR_SENSOR_ID && active == true && isAlert == true) {
            notificationAlert(
                `Cảnh bảo chuyển động ${nameNode}`,
                'Phát hiện có người đi qua',
            );
        }

        if (value == 1 && sensorCheckId == GAS_SENSOR_ID && active == true && isAlert == true) {
            notificationAlert(
                `Cảnh bảo chuyển động ${nameNode}`,
                'Phát hiện khí Gas',
            );
        }

        if (value == 1 && sensorCheckId == SMOKE_SENSOR_ID && active == true && isAlert == true) {
            notificationAlert(
                `Phát hiện khói ${nameNode}`,
                'Phát hiện có khói',
            );
        }



        // notify temp and humi
        if ([TEMP_SENSOR_ID, HUMI_SENSOR_ID].includes(sensorCheckId)) {
            if (active == true && minThreshold && maxThreshold && isAlertThreshold == true) {
                if (Number(value) < Number(minThreshold)) {
                    notificationAlert(
                        `Cảnh báo ${nameNode}`,
                        `${nameSensor} có giá trị ${value} vượt ngưỡng MIN ${minThreshold}`,
                    );
                }

                if (Number(value) > Number(maxThreshold)) {
                    notificationAlert(
                        `Cảnh báo ${nameNode}`,
                        `${nameSensor} có giá trị ${value} vượt ngưỡng MAX ${maxThreshold}`,
                    );
                }
            }
        }
    }, [value, sensorData, nodeId]);

    return (
        <div>
            <CardSensor
                className={sensorData?.style || ''}
                name={sensorData.name}
                value={`${value} ${sensorData?.unit || ''}`}
                icon={sensorData.icon}
                isAlert={isAllowAlertBlink}
            />

            <Toaster
                closeButton
                richColors
                position="top-right"
                duration={5000}
                expand={true}
                style={{
                    position: 'absolute',
                }}
                theme="light"
                toastOptions={{
                    classNames: {
                        title: 'text-orange-500 text-base',
                        description: 'text-base',
                        closeButton: 'bg-yellow-300 text-red-400',
                    },
                }}
            />
        </div>
    );
}

export default SensorControl;
