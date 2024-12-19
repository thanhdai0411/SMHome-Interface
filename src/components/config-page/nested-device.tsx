import React, { useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import FormHook from '../ui/form-hook';
import { Button } from '../ui/button';
import { Lamp, MonitorSmartphone, Trash2 } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';
import { removeDevice } from '@/actions/firebase/deviceConfig';
import { toast } from 'sonner';
import SwitchHook from '../ui/switch-hook';
import DialogConfirm from '../ui/dialog-confirm';
import Chip from '../ui/chip';

interface NestedDeviceProps {
    nestIndex: number;
    control: Control<any>;
    register: any;
    getValues: any;
}

function NestedDevice({ nestIndex, control, getValues }: NestedDeviceProps) {
    const [indexDelete, setIndexDelete] = useState<number | null>(null);
    const [dialogDelete, setDialogDelete] = useState<boolean>(false);

    const { fields, remove, append } = useFieldArray({
        control,
        name: `nodeItem.${nestIndex}.deviceItem`,
    });

    const handleAddDeviceForm = () => {
        append([
            {
                name: '',
                icon: '',
                active: true,
                styleON: 'bg-gradient-to-r from-cyan-500 to-green-400',
                styleOFF: '',
            },
        ]);
    };

    const getDataNode = (index: number) => {
        const data = getValues(`nodeItem.${nestIndex}.deviceItem`);
        const nodeData = getValues(`nodeItem.${nestIndex}`);
        const deviceItem = data?.[index];

        return {
            nodeId: nodeData.nodeId,
            deviceId: deviceItem.deviceId,
        };
    };

    const handleDeleteDevice = (index: number) => {
        const { nodeId, deviceId } = getDataNode(index);

        if (deviceId && nodeId) {
            setIndexDelete(index);
            setDialogDelete(true);
        } else {
            remove(index);
        }
    };

    const handleConfirmDelete = () => {
        if (indexDelete) {
            const { nodeId, deviceId } = getDataNode(indexDelete);

            removeDevice({
                deviceId,
                nodeId,
            });

            remove(indexDelete);
            toast.success('Xóa Device thành công');
        }
    };

    const showNameDevice = (index: number) => {
        const data = getValues(`nodeItem.${nestIndex}.deviceItem`);

        if (data && data?.[index] && data?.[index]?.name) {
            return data?.[index]?.name;
        }

        return `Thiết bị ${index + 1}`;
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="font-medium">Thiết bị của Node</p>
                    <Chip name={`${fields.length} Thiết bị`} />
                </div>

                <Button
                    onClick={handleAddDeviceForm}
                    className="mb-2"
                    size={'sm'}
                    variant={'outline'}
                >
                    <Lamp className="mr-2 h-4 w-4" />
                    Thêm Thiết bị
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
                                    <div className="grid gap-3 sm:grid-cols-1 grid-cols-1 mt-4">
                                        <FormHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.deviceItem.${index}.name`}
                                            label="Tên"
                                        />

                                        <FormHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.deviceItem.${index}.deviceId`}
                                            label="ID"
                                        />

                                        <FormHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.deviceItem.${index}.icon`}
                                            label="Icon"
                                        />

                                        {/* <FormHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.deviceItem.${index}.styleON`}
                                            label="Style ON"
                                        />

                                        <FormHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.deviceItem.${index}.styleOFF`}
                                            label="Style OFF"
                                        /> */}
                                    </div>
                                    <div className="flex items-center space-x-2 mt  mt-4">
                                        <SwitchHook
                                            control={control}
                                            name={`nodeItem.${nestIndex}.deviceItem.${index}.active`}
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
                    title="Xóa thiết bị"
                    desc="Khi xóa sẽ không thể khôi phục. Bạn chắc chắn muốn xóa thiết bị này ?"
                    nameButton="Xóa thiết bị"
                />
            )}
        </div>
    );
}

export default NestedDevice;
