import { dbRealtime } from '@/configs/firebase';
import { ROOT_NODE } from '@/constants/node-config';
import {
    DatabaseReference,
    onValue,
    ref,
    remove,
    set,
} from 'firebase/database';

interface IBaseSensor {
    nodeId: string;
    sensorId: string;
}

interface IUpdateValueSensor extends IBaseSensor {
    value: string | number;
}

export interface ISensorConfigDTO extends IBaseSensor {
    name: string;
    unit: string;
    icon: string;
    color?: string;
    backgroundColor?: string;
    active?: boolean;
    style?: string;
}

interface IGetSensor extends IBaseSensor {
    callBack: (data: DatabaseReference) => void;
    getBy?: 'value' | 'config';
}

export function setValueSensor({
    value,
    nodeId,
    sensorId,
}: IUpdateValueSensor) {
    set(ref(dbRealtime, `${ROOT_NODE}/${nodeId}/${sensorId}/value`), value);
}

export function removeSensor({ nodeId, sensorId }: IBaseSensor) {
    remove(ref(dbRealtime, `${ROOT_NODE}/${nodeId}/${sensorId}`));
}

export function setConfigSensor({
    nodeId,
    sensorId,
    ...data
}: ISensorConfigDTO) {
    set(ref(dbRealtime, `${ROOT_NODE}/${nodeId}/${sensorId}/config`), data);
}

export function getSensor({ callBack, nodeId, sensorId, getBy }: IGetSensor) {
    const refUrl = getBy
        ? `${ROOT_NODE}/${nodeId}/${sensorId}/${getBy}`
        : `${ROOT_NODE}/${nodeId}/${sensorId}`;

    const starCountRef = ref(dbRealtime, refUrl);
    return onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        callBack(data);
    });
}
