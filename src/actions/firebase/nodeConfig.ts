import { dbRealtime } from '@/configs/firebase';
import { ROOT_NODE } from '@/constants/node-config';
import {
    DatabaseReference,
    onValue,
    ref,
    remove,
    set,
} from 'firebase/database';

interface DeviceDTO {
    nodeId: string;
    name: string;
    icon: string;
    color?: string;
    backgroundColor?: string;
    active: boolean;
}

interface IGetConfig {
    callBack: (data: DatabaseReference) => void;
    nodeId: string;
}

interface IRemoveConfig {
    nodeId: string;
}

export function setNodeConfig({ nodeId, ...data }: DeviceDTO) {
    set(ref(dbRealtime, `${ROOT_NODE}/${nodeId}/config`), {
        ...data,
    });
}

export function getNodeConfig({ callBack, nodeId }: IGetConfig) {
    const starCountRef = ref(dbRealtime, `${ROOT_NODE}/${nodeId}/config`);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        callBack(data);
    });
}

export function removeNode({ nodeId }: IRemoveConfig) {
    remove(ref(dbRealtime, `${ROOT_NODE}/${nodeId}`));
}
