import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import FormHook from '../ui/form-hook';
import { Button } from '../ui/button';
import { MonitorSmartphone, Trash2 } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';
import { removeDevice } from '@/actions/firebase/deviceConfig';
import { toast } from 'sonner';
import SwitchHook from '../ui/switch-hook';

interface NestedDeviceProps {
    nestIndex: number;
    control: Control<any>;
    register: any;
    getValues: any;
}

function NestedDevice({ nestIndex, control, getValues }: NestedDeviceProps) {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `nodeItem.${nestIndex}.deviceItem`,
    });

    const handleAddDeviceForm = () => {
        append([{ name: '', icon: '', active: true, styleON: "bg-gradient-to-r from-cyan-500 to-green-400", styleOFF: "" }]);
    };

    const handleDeleteDevice = (index: number) => {
        const data = getValues(`nodeItem.${nestIndex}.deviceItem`);
        const nodeData = getValues(`nodeItem.${nestIndex}`);
        const deviceItem = data?.[index];

        if (deviceItem.deviceId && nodeData.nodeId) {
            removeDevice({
                deviceId: deviceItem.deviceId,
                nodeId: nodeData.nodeId,
            });
            toast.success('Xóa Device thành công');

            remove(index);
        } else {
            remove(index);
        }
    };

    const showNameDevice = (index: number) => {
        const data = getValues(`nodeItem.${nestIndex}.deviceItem`);

        if (data && data?.[index] && data?.[index]?.name) {
            return data?.[index]?.name;
        }

        return `D${index + 1}`;
    };

    return (
        <div>
            <AccordionItem
                value={`item-device-${nestIndex + 1}`}
                key={`item-device-${nestIndex + 1}`}
                className='border-solid border-2 border-blue-500 my-2  px-3 rounded-md'
            >
                <AccordionTrigger>
                    Cấu hình Device
                </AccordionTrigger>
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
                                                    name={`nodeItem.${nestIndex}.deviceItem.${index}.deviceId`}
                                                    label="Nhập Device ID"
                                                    placeholder="Nhập Device ID ..."
                                                />
                                                <FormHook
                                                    control={control}
                                                    name={`nodeItem.${nestIndex}.deviceItem.${index}.name`}
                                                    label="Nhập Tên Device"
                                                    placeholder="Nhập Tên Device..."
                                                />



                                                <FormHook
                                                    control={control}
                                                    name={`nodeItem.${nestIndex}.deviceItem.${index}.icon`}
                                                    label="Nhập Icon Device"
                                                    placeholder="Nhập Icon Device..."
                                                />

                                                <FormHook
                                                    control={control}
                                                    name={`nodeItem.${nestIndex}.deviceItem.${index}.styleON`}
                                                    label="Style Device ON"
                                                    placeholder="Nhập Style Device ON..."
                                                />

                                                <FormHook
                                                    control={control}
                                                    name={`nodeItem.${nestIndex}.deviceItem.${index}.styleOFF`}
                                                    label="Style Device OFF"
                                                    placeholder="Nhập Style Device OFF..."
                                                />


                                            </div>
                                            <div className="flex items-center space-x-2 my-4">
                                                <SwitchHook
                                                    control={control}
                                                    name={`nodeItem.${nestIndex}.deviceItem.${index}.active`}
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

                    <Button

                        onClick={handleAddDeviceForm}
                        className="mt-2 "
                    >
                        <MonitorSmartphone className="mr-2 h-4 w-4" />
                        Thêm Device
                    </Button>
                </AccordionContent>
            </AccordionItem>



        </div>
    );
}

export default NestedDevice;
