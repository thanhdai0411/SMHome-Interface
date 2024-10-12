import { dbFirestore } from '@/configs/firebase';
import { ROOT_NODE } from '@/constants/node-config';
import {
    collection,
    doc,
    getDocs,
    query,
    where,
    Timestamp,
} from 'firebase/firestore';

export const getDataSensor = async (
    nodeId: string,
    sensorId: string,
    startTime: string,
    endTime: string,
) => {
    try {
        if (nodeId) {
            const collectionRoot = collection(
                doc(collection(dbFirestore, ROOT_NODE), nodeId),
                sensorId,
            );

            const queryCode = query(
                collectionRoot,
                where(
                    'timestamp',
                    '>=',
                    Timestamp.fromDate(new Date(startTime)),
                ),
                where('timestamp', '<=', Timestamp.fromDate(new Date(endTime))),
            );

            const querySnapshot = await getDocs(queryCode);

            let resData: any[] = [];

            querySnapshot.forEach((doc) => {
                const dataTokenUser = doc.data();
                resData.push(dataTokenUser);
            });

            return resData;
        }
    } catch (e) {
        console.log({ e });
    }
};
