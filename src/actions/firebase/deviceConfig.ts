import { dbRealtime } from '@/configs/firebase';
import { ROOT_NODE } from '@/constants/node-config';
import {
    DatabaseReference,
    onValue,
    ref,
    remove,
    set,
} from 'firebase/database';

interface IBaseDevice {
    nodeId: string;
    deviceId: string;
}

interface IUpdateStatusDevice extends IBaseDevice {
    status: number;
}

interface IUpdateTimerDevice extends IBaseDevice {
    timer: string;
}

export interface IDeviceConfigDTO extends IBaseDevice {
    name: string;
    icon: string;
    color?: string;
    backgroundColor?: string;
    active: boolean;
    styleOFF: string,
    styleON: string
}

interface IGetDevice extends IBaseDevice {
    callBack: (data: DatabaseReference) => void;
    getBy?: 'timer' | 'status' | 'config';
}

export function setStatusDevice({
    status,
    nodeId,
    deviceId,
}: IUpdateStatusDevice) {
    set(ref(dbRealtime, `${ROOT_NODE}/${nodeId}/${deviceId}/status`), status);
}

export function setTimerDevice({
    timer,
    nodeId,
    deviceId,
}: IUpdateTimerDevice) {
    set(ref(dbRealtime, `${ROOT_NODE}/${nodeId}/${deviceId}/timer`), timer);
}

export function removeDevice({ nodeId, deviceId }: IBaseDevice) {
    remove(ref(dbRealtime, `${ROOT_NODE}/${nodeId}/${deviceId}`));
}

export function setConfigDevice({
    nodeId,
    deviceId,
    ...data
}: IDeviceConfigDTO) {
    set(ref(dbRealtime, `${ROOT_NODE}/${nodeId}/${deviceId}/config`), data);
}

export function getDevice({ callBack, nodeId, deviceId, getBy }: IGetDevice) {
    const refUrl = getBy
        ? `${ROOT_NODE}/${nodeId}/${deviceId}/${getBy}`
        : `${ROOT_NODE}/${nodeId}/${deviceId}`;

    const starCountRef = ref(dbRealtime, refUrl);
    return onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        callBack(data);
    });
}
