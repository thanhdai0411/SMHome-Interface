'use client';

import { getNode, INodeConfigDTO } from '@/actions/firebase/nodeConfig';
import { SMHomeRole } from '@/constants/roles';
import useRole from '@/hooks/useRole';
import { useUser } from '@clerk/nextjs';
import { useEffect, useRef, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import SensorControl from './sensor-control';
import SwitchControl from './switch-control';

function HeaderDashboard() {
    const isAllow = useRole({ role: SMHomeRole.Admin });

    const [nodeData, setNodeData] = useState<INodeConfigDTO[]>([]);
    const [, setNodeSelect] = useState<INodeConfigDTO | null>(null);
    const refSelected = useRef<INodeConfigDTO>();

    // get data config
    const callBackCallDevice = (data: any) => {
        const key = Object.keys(data);
        if (key && key.length > 0) {
            const resInit = key.map((v) => {
                const dataByKey = data?.[v]?.config as unknown as any;
                return dataByKey;
            });

            const initActiveNode = resInit.filter((v) => v.active == true);

            setNodeData(initActiveNode);

            if (!refSelected.current) {
                refSelected.current = initActiveNode?.[0];
                setNodeSelect(initActiveNode?.[0]);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = getNode({
            callBack: callBackCallDevice,
        });
        return () => unsubscribe();
    }, []);

    const onChangeValue = (value: string) => {
        const nodeDataSelected = nodeData.find((v) => v.nodeId === value);
        if (nodeDataSelected) {
            refSelected.current = nodeDataSelected;
            setNodeSelect(nodeDataSelected);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <p className="text-xl font-bold">
                    {refSelected?.current?.name || '...'}
                </p>
                <Select
                    value={refSelected.current?.nodeId}
                    onValueChange={(v) => onChangeValue(v)}
                    defaultValue={refSelected.current?.nodeId}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Chọn Node" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {nodeData &&
                                nodeData.length > 0 &&
                                nodeData.map((v, index) => (
                                    <SelectItem
                                        value={v.nodeId}
                                        key={v.nodeId + index}
                                    >
                                        {v.name}
                                    </SelectItem>
                                ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div
                className={`grid gap-4 grid-cols-1  sm:grid-cols-2 lg:grid-cols-${refSelected.current?.sensorItem?.length} grid-rows-1`}
            >
                {refSelected.current?.sensorItem?.map((v, index) => (
                    <>
                        {v.active == true && (
                            <SensorControl
                                key={
                                    index +
                                    v.sensorId +
                                    refSelected?.current?.nodeId
                                }
                                nodeId={refSelected?.current?.nodeId as string}
                                sensorData={v}
                            />
                        )}
                    </>
                ))}
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  grid-rows-1">
                {refSelected.current?.deviceItem?.map((v, index) => (
                    <>
                        {v.active == true && (
                            <SwitchControl
                                key={
                                    index +
                                    v.deviceId +
                                    refSelected?.current?.nodeId
                                }
                                nodeId={refSelected?.current?.nodeId as string}
                                deviceData={v}
                            />
                        )}
                    </>
                ))}
            </div>
        </>
    );
}

export default HeaderDashboard;
