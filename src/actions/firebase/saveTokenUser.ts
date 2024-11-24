import { dbFirestore } from '@/configs/firebase';
import { FIRESTORE_ROOT_NOTIFICATION } from '@/constants/node-config';
import {
    addDoc,
    collection,
    doc,
    getDocs,
    Timestamp,
} from 'firebase/firestore';

interface UserTokenDevice {
    userId: string;
    token: string;
    createdAt: string;
}

export const saveTokenWithUser = async (
    token: string,
    userId: string | null | undefined,
) => {
    try {
        if (userId) {
            const tokenPrev = await getTokenWithUser(userId);

            const isExist = tokenPrev?.some((v) => v.token == token);

            if (!isExist) {
                const collectionRoot = collection(
                    dbFirestore,
                    FIRESTORE_ROOT_NOTIFICATION,
                );

                await addDoc(collectionRoot, {
                    token,
                    userId,
                    createdAt: Timestamp.now(),
                });
            }
        }
    } catch (e) {
        console.log({ e });
    }
};

export const getTokenWithUser = async (userId: string) => {
    try {
        if (userId) {
            const collectionRoot = collection(
                dbFirestore,
                FIRESTORE_ROOT_NOTIFICATION,
            );

            const querySnapshot = await getDocs(collectionRoot);

            let resData: UserTokenDevice[] = [];

            querySnapshot.forEach((doc) => {
                const dataTokenUser = doc.data() as UserTokenDevice;
                resData.push(dataTokenUser);
            });
            return resData;
        }
    } catch (e) {
        console.log({ e });
    }
};
