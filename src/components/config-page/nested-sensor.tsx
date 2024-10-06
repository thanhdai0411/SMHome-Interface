import { removeDevice } from '@/actions/firebase/deviceConfig';
import { MonitorSmartphone, Trash2, Zap } from 'lucide-react';
import { Control, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import FormHook from '../ui/form-hook';
import SwitchHook from '../ui/switch-hook';
import { removeSensor } from '@/actions/firebase/sensorConfig';

interface NestedSensorProps {
    nestIndex: number;
    control: Control<any>;
    register: any;
    getValues: any;
}

function NestedSensor({ nestIndex, control, getValues }: NestedSensorProps) {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `nodeItem.${nestIndex}.sensorItem`,
    });

    const handleAddDeviceForm = () => {
        append([
            {
                name: '',
                icon: '',
                active: true,
                style: 'bg-gradient-to-r from-yellow-500',
            },
        ]);
    };

    const handleDeleteDevice = (index: number) => {
        const data = getValues(`nodeItem.${nestIndex}.sensorItem`);
        const nodeData = getValues(`nodeItem.${nestIndex}`);
        const sensorItem = data?.[index];

        if (sensorItem.sensorId && nodeData.nodeId) {
            removeSensor({
                sensorId: sensorItem.sensorId,
                nodeId: nodeData.nodeId,
            });
            toast.success('Xóa Sensor thành công');

            remove(index);
        } else {
            remove(index);
        }
    };

    const showNameDevice = (index: number) => {
        const data = getValues(`nodeItem.${nestIndex}.sensorItem`);

        if (data && data?.[index] && data?.[index]?.name) {
            return data?.[index]?.name;
        }

        return `S${index + 1}`;
    };

    return (
        <div>
            <AccordionItem
                value={`item-sensor-${nestIndex + 1}`}
                key={`item-sensor-${nestIndex + 1}`}
                className="border-solid border-2 border-blue-500 my-2  px-3 rounded-md"
            >
                <AccordionTrigger>Cấu hình Sensor</AccordionTrigger>
                <AccordionContent className="m-1 sm:m-3">
                    <Accordion type="single" collapsible>
                        {fields &&
                            fields.length > 0 &&
                            fields.map((v, index) => (
                                <>
                                    <AccordionItem
                                        value={`item-${index + 1}`}
                                        key={index}
                                        className="border-solid border-2 border-emerald-400 my-2  px-3 rounded-md"
                                    >
                                        <AccordionTrigger>
                                            {showNameDevice(index)}
                                        </AccordionTrigger>
                                        <AccordionContent className="m-1 sm:m-3">
                                            <div className="grid gap-3 sm:grid-cols-3 grid-cols-1 grid-rows-2 mt-4">
                                                <FormHook
                                                    control={control}
                                                    name={`nodeItem.${nestIndex}.sensorItem.${index}.sensorId`}
                                                    label="Nhập Sensor ID"
                                                    placeholder="Nhập Sensor ID ..."
                                                />
                                                <FormHook
                                                    control={control}
                                                    name={`nodeItem.${nestIndex}.sensorItem.${index}.name`}
                                                    label="Nhập Tên Sensor"
                                                    placeholder="Nhập Tên Sensor..."
                                                />

                                                <FormHook
                                                    control={control}
                                                    name={`nodeItem.${nestIndex}.sensorItem.${index}.unit`}
                                                    label="Đơn vị Sensor"
                                                    placeholder="Đơn vị Sensor..."
                                                />
                                                <FormHook
                                                    control={control}
                                                    name={`nodeItem.${nestIndex}.sensorItem.${index}.icon`}
                                                    label="Icon Sensor"
                                                    placeholder="Nhập Icon Sensor..."
                                                />
                                                <FormHook
                                                    control={control}
                                                    name={`nodeItem.${nestIndex}.sensorItem.${index}.style`}
                                                    label="Style Sensor"
                                                    placeholder="Nhập Style Sensor..."
                                                />
                                            </div>
                                            <div className="flex items-center space-x-2 my-4">
                                                <SwitchHook
                                                    control={control}
                                                    name={`nodeItem.${nestIndex}.sensorItem.${index}.active`}
                                                />
                                            </div>
                                            <Button
                                                variant={'destructive'}
                                                onClick={() =>
                                                    handleDeleteDevice(index)
                                                }
                                                className="mt-3"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Xóa Device
                                            </Button>
                                        </AccordionContent>
                                    </AccordionItem>
                                </>
                            ))}
                    </Accordion>

                    <Button onClick={handleAddDeviceForm} className="mt-2 ">
                        <Zap className="mr-2 h-4 w-4" />
                        Thêm Sensor
                    </Button>
                </AccordionContent>
            </AccordionItem>
        </div>
    );
}

export default NestedSensor;
