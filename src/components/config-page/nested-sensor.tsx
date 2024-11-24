import { removeSensor } from '@/actions/firebase/sensorConfig';
import { ThermometerSun, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import Chip from '../ui/chip';
import DialogConfirm from '../ui/dialog-confirm';
import FormHook from '../ui/form-hook';
import SwitchHook from '../ui/switch-hook';

interface NestedSensorProps {
    nestIndex: number;
    control: Control<any>;
    register: any;
    getValues: any;
}

function NestedSensor({ nestIndex, control, getValues }: NestedSensorProps) {
    const [indexDelete, setIndexDelete] = useState<number | null>(null);
    const [dialogDelete, setDialogDelete] = useState<boolean>(false);

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
                isAlert : false,
                style: 'bg-gradient-to-r from-yellow-500',
            },
        ]);
    };

    const getDataNode = (index: number) => {
        const data = getValues(`nodeItem.${nestIndex}.sensorItem`);
        const nodeData = getValues(`nodeItem.${nestIndex}`);
        const sensorItem = data?.[index];

        return {
            nodeId: nodeData.nodeId,
            sensorId: sensorItem.sensorId,
        };
    };

    const handleDeleteDevice = (index: number) => {
        const { nodeId, sensorId } = getDataNode(index);

        if (sensorId && nodeId) {
            setIndexDelete(index);
            setDialogDelete(true);
        } else {
            remove(index);
        }
    };

    const handleConfirmDelete = () => {
        if (indexDelete) {
            const { nodeId, sensorId } = getDataNode(indexDelete);

            removeSensor({
                sensorId: sensorId,
                nodeId: nodeId,
            });

            remove(indexDelete);
            toast.success('Xóa Sensor thành công');
        }
    };

    const showNameDevice = (index: number) => {
        const data = getValues(`nodeItem.${nestIndex}.sensorItem`);

        if (data && data?.[index] && data?.[index]?.name) {
            return data?.[index]?.name;
        }

        return `Cảm biến ${index + 1}`;
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="font-medium">Cảm biến của Node</p>
                    <Chip name={`${fields.length} Cảm biến`} />
                </div>
                <Button
                    onClick={handleAddDeviceForm}
                    className="mb-2"
                    size={'sm'}
                    variant={'outline'}
                >
                    <ThermometerSun className="mr-2 h-4 w-4" />
                    Thêm Cảm biến
                </Button>
            </div>

            <Accordion type="single" collapsible>
                {fields &&
                    fields.length > 0 &&
                    fields.map((v, index) => (
                        <>
                            <AccordionItem
                                value={`item-${index + 1}`}
                                key={index}
                                className="border-solid border border-yellow-400 my-2  px-3 rounded-md"
                            >
                                <AccordionTrigger>
                                    <div className="flex items-center">
                                        <Trash2
                                            className="mr-2 h-5 w-5"
                                            color="red"
                                            onClick={() =>
                                                handleDeleteDevice(index)
                                            }
                                        />
                                        <p className="text-base">
                                            {showNameDevice(index)}
                                        </p>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="m-1 sm:m-3">
                                    <div className="grid gap-3 sm:grid-cols-1 grid-cols-1  mt-4">
                                        <FormHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.sensorItem.${index}.name`}
                                            label="Tên"
                                        />

                                        <FormHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.sensorItem.${index}.sensorId`}
                                            label="ID"
                                        />

                                        <FormHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.sensorItem.${index}.unit`}
                                            label="Đơn vị"
                                        />
                                        <FormHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.sensorItem.${index}.icon`}
                                            label="Icon"
                                        />
                                        <FormHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.sensorItem.${index}.style`}
                                            label="Style"
                                        />
                                        <FormHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.sensorItem.${index}.minThreshold`}
                                            label="Ngưỡng Min"
                                        />
                                        <FormHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.sensorItem.${index}.maxThreshold`}
                                            label="Ngưỡng Max"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2 my-4">
                                        <SwitchHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.sensorItem.${index}.active`}
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2 my-4">
                                        <SwitchHook
                                            control={control}
                                            label={"Loại alert"}
                                            name={`nodeItem.${nestIndex}.sensorItem.${index}.isAlert`}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </>
                    ))}
            </Accordion>

            {dialogDelete && (
                <DialogConfirm
                    open={dialogDelete}
                    setOpen={setDialogDelete}
                    handleConfirm={handleConfirmDelete}
                    title="Xóa cảm biến"
                    desc="Khi xóa sẽ không thể khôi phục. Bạn chắc chắn muốn xóa cảm biến này ?"
                    nameButton="Xóa cảm biến"
                />
            )}
        </div>
    );
}

export default NestedSensor;
