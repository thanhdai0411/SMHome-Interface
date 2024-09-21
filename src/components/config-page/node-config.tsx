'use client';
import {
    IDeviceConfigDTO,
    setConfigDevice,
} from '@/actions/firebase/deviceConfig';
import {
    getNode,
    INodeConfigDTO,
    removeNode,
    setNodeConfig,
} from '@/actions/firebase/nodeConfig';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Plus,
    Save,
    Trash2
} from 'lucide-react';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import FormHook from '../ui/form-hook';
import SwitchHook from '../ui/switch-hook';
import NestedDevice from './nested-device';
import NestedSensor from './nested-sensor';
import { ISensorConfigDTO, setConfigSensor } from '@/actions/firebase/sensorConfig';

interface NodeItemForm extends INodeConfigDTO {
    deviceItem?: IDeviceConfigDTO[];
    sensorItem?: ISensorConfigDTO[];
}

interface NodeConfigForm {
    nodeItem: NodeItemForm[];
}

const formSchema = z.object({
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
});

function NodeConfig() {
    // define form
    const form = useForm<NodeConfigForm>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    const { append, remove } = useFieldArray({
        control: form.control,
        name: 'nodeItem',
    });

    const handleAddNode = () => {
        append([
            {
                nodeId: '',
                name: '',
                icon: '',
                active: false,
            },
        ]);
    };

    // get data config
    const callBackCallDevice = (data: any) => {
        const key = Object.keys(data);

        if (key && key.length > 0) {
            const resInit = key.map((v) => {
                const dataByKey = data?.[v]?.config as unknown as any;
                return dataByKey;
            });

            form.setValue('nodeItem', resInit);
        }
    };

    useEffect(() => {
        const unsubscribe = getNode({
            callBack: callBackCallDevice,
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteConfigNode = (index: number) => {
        const data = form.getValues('nodeItem');
        const dataIndex = data[index];
        if (dataIndex && dataIndex.nodeId) {
            removeNode({
                nodeId: dataIndex.nodeId,
            });
            remove(index);
            toast.success('Xóa cấu hình Node thành công');
        } else {
            remove(index);
        }
    };

    const handleSaveConfig = (index: number) => {
        const data = form.getValues('nodeItem');
        const dataIndex = data[index];
        if (dataIndex && dataIndex.nodeId) {
            let deviceItem = dataIndex?.deviceItem || [];
            let sensorItem = dataIndex?.sensorItem || [];


            const dataNodeConfig: INodeConfigDTO = {
                ...dataIndex,
            }

            if (deviceItem.length > 0) {
                deviceItem = deviceItem.map((v) => {
                    return {
                        ...v,
                        styleOFF: v?.styleOFF ?? "",
                        styleON: v?.styleON ?? ""

                    }
                })
                dataNodeConfig.deviceItem = deviceItem
            }

            if (sensorItem.length > 0) {
                sensorItem = sensorItem.map((v) => {
                    return {
                        ...v,
                        unit: v.unit ?? "",
                        style: v.style ?? ""

                    }
                })
                dataNodeConfig.sensorItem = sensorItem
            }


            setNodeConfig(dataNodeConfig);
            // device config node
            if (deviceItem.length > 0) {
                deviceItem.map((d) => {
                    setConfigDevice({
                        ...d,
                        icon: d?.icon ? d?.icon : 'icon',
                        nodeId: dataIndex.nodeId,
                    });
                });
            }

            // sensor config node
            if (sensorItem.length > 0) {
                sensorItem.map((s) => {
                    setConfigSensor({
                        ...s,
                        icon: s?.icon ? s?.icon : 'icon',
                        nodeId: dataIndex.nodeId,
                    });
                });
            }

            toast.success('Lưu cấu hình thành công');
        } else {
            toast.error('Vui lòng nhập đầy đủ thông tin');
        }
    };

    const showNameNode = (index: number) => {
        const data = form.getValues('nodeItem');

        if (data && data?.[index] && data?.[index]?.name) {
            return data?.[index]?.name;
        }

        return `N${index + 1}`;
    };

    const formWatch = form.watch('nodeItem');


    return (
        <div>
            <div className="grid gap-3 grid-cols-1 grid-rows-1">
                <Accordion type="single" collapsible >
                    <Form {...form}>
                        {formWatch &&
                            formWatch.length > 0 &&
                            formWatch.map((v, index) => (
                                <>
                                    <AccordionItem
                                        value={`item-${index + 1}`}
                                        key={index}
                                        className='border-solid border-2 border-yellow-600 my-2  px-3 rounded-md'
                                    >
                                        <AccordionTrigger>
                                            Cấu hình Node :{' '}
                                            {showNameNode(index)}
                                        </AccordionTrigger>
                                        <AccordionContent className="m-1 sm:m-3">
                                            <div className="grid gap-3 sm:grid-cols-3 grid-cols-1 grid-rows-1">
                                                <FormHook
                                                    control={form.control}
                                                    name={`nodeItem.${index}.nodeId`}
                                                    label="Nhập Node ID"
                                                    placeholder="Nhập Node ID ..."
                                                />
                                                <FormHook
                                                    control={form.control}
                                                    name={`nodeItem.${index}.name`}
                                                    label="Tên Node"
                                                    placeholder="Nhập Tên Node ..."
                                                />
                                                <FormHook
                                                    control={form.control}
                                                    name={`nodeItem.${index}.icon`}
                                                    label="Icon Node"
                                                    placeholder="Nhập icon node ..."
                                                />
                                            </div>
                                            <div className="flex items-center space-x-2 my-4">
                                                <SwitchHook
                                                    control={form.control}
                                                    name={`nodeItem.${index}.active`}
                                                />
                                            </div>
                                            {/* config device */}
                                            <Accordion type="single" collapsible >
                                                <div className="mt-4">
                                                    <NestedDevice
                                                        control={form.control}
                                                        register={form.register}
                                                        nestIndex={index}
                                                        getValues={form.getValues}
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <NestedSensor
                                                        control={form.control}
                                                        register={form.register}
                                                        nestIndex={index}
                                                        getValues={form.getValues}
                                                    />
                                                </div>
                                            </Accordion>
                                            {/* end config device */}



                                            <div className="mt-3 flex justify-end">
                                                <Button
                                                    onClick={() =>
                                                        handleSaveConfig(index)
                                                    }
                                                    className="mr-2"
                                                >
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Lưu cấu hình
                                                </Button>

                                                <Button
                                                    onClick={() =>
                                                        handleDeleteConfigNode(
                                                            index,
                                                        )
                                                    }
                                                    variant={'destructive'}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Xóa cấu hình
                                                </Button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </>
                            ))}
                    </Form>
                </Accordion>
            </div>

            <div className="mt-3">
                <Button onClick={handleAddNode}>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm Node
                </Button>
            </div>
        </div>
    );
}

export default NodeConfig;
