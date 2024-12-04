'use server';

import connectMongo from '@/configs/mongo';
import SensorModel from '@/models/sensor';

interface Props {
    sensorIds: string[];
    nodeId: string;
    startDate: string;
    endDate: string;
}

export const findAllDataSensor = async ({
    sensorIds,
    nodeId,
    startDate,
    endDate,
}: Props) => {
    try {
        await connectMongo();
        const query = {
            sensor_id: { $in: sensorIds },
            node_id: nodeId,
            time: { $gte: new Date(startDate), $lte: new Date(endDate) },
        }

        const res = await SensorModel.find(query);

        return res;
    } catch (e) {
        console.log(e);
        return [];
    }
};
