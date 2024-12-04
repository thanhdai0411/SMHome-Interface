import mongoose from 'mongoose';

export interface SensorDocument {
    _id: string;
    node_id: string;
    sensor_id: string;
    value: string;
    time: Date;
}

const sensorSchema = new mongoose.Schema<SensorDocument>(
    {
        sensor_id: {
            type: String,
            required: true,
        },
        node_id: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
    },
    { collection: 'sensor' },
);

const SensorModel =
    mongoose.models.sensor<SensorDocument> ||
    mongoose.model<SensorDocument>('sensor', sensorSchema, 'sensor');

export default SensorModel;
