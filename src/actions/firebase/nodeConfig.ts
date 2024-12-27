import { dbRealtime } from '@/configs/firebase';
import { ROOT_NODE } from '@/constants/node-config';
import {
    DatabaseReference,
    onValue,
    ref,
    remove,
    set,
} from 'firebase/database';
import { IDeviceConfigDTO } from './deviceConfig';
import { ISensorConfigDTO } from './sensorConfig';

export interface INodeConfigDTO {
    nodeId: string;
    name: string;
    icon: string;
    cameraUrl?: string;
    color?: string;
    active: boolean;
    styleON?: string;
    styleOFF?: string;
    deviceItem?: IDeviceConfigDTO[];
    sensorItem?: ISensorConfigDTO[];
}

interface IGetConfig {
    callBack: (data: DatabaseReference) => void;
    nodeId: string;
}

interface IGetNode {
    callBack: (data: DatabaseReference) => void;
}

interface IRemoveConfig {
    nodeId: string;
}

export function setNodeConfig({ nodeId, ...data }: INodeConfigDTO) {
    set(ref(dbRealtime, `${ROOT_NODE}/${nodeId}/config`), {
        nodeId: nodeId,
        ...data,
    });
}

export function getNodeConfig({ callBack, nodeId }: IGetConfig) {
    const starCountRef = ref(dbRealtime, `${ROOT_NODE}/${nodeId}/config`);
    return onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        callBack(data);
    });
}

export function removeNode({ nodeId }: IRemoveConfig) {
    remove(ref(dbRealtime, `${ROOT_NODE}/${nodeId}`));
}

export function getNode({ callBack }: IGetNode) {
    const starCountRef = ref(dbRealtime, `${ROOT_NODE}`);
    return onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        callBack(data);
    });
}
