'use client';

import { getNode } from '@/actions/firebase/nodeConfig';
import { KEY_LOCAL_STORAGE_NODE_CONFIG } from '@/constants/node-config';
import { useEffect } from 'react';

export const setNodeConfigLocal = (data: any) => {
    localStorage.setItem(KEY_LOCAL_STORAGE_NODE_CONFIG, JSON.stringify(data));
    console.log('>>>> save config node');
};

export const getNodeConfigLocal = () => {
    return JSON.parse(
        localStorage.getItem(KEY_LOCAL_STORAGE_NODE_CONFIG) as string,
    );
};

function useFetchConfigNode() {
    const callBackCallDevice = (data: any) => {
        setNodeConfigLocal(data);
    };

    useEffect(() => {
        const exist = localStorage.getItem(KEY_LOCAL_STORAGE_NODE_CONFIG);
        if (exist) return;
        const unsubscribe = getNode({
            callBack: callBackCallDevice,
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export default useFetchConfigNode;
