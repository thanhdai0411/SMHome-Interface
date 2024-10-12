import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';

import {
    IDeviceConfigDTO,
    setConfigDevice,
} from '@/actions/firebase/deviceConfig';
import { INodeConfigDTO, setNodeConfig } from '@/actions/firebase/nodeConfig';
import {
    ISensorConfigDTO,
    setConfigSensor,
} from '@/actions/firebase/sensorConfig';
import FormHook from '../ui/form-hook';
import { ScrollArea } from '../ui/scroll-area';
import SwitchHook from '../ui/switch-hook';
import NestedDevice from './nested-device';
import NestedSensor from './nested-sensor';

const formSchema = z.object({});
export type FormCreateRole = z.infer<typeof formSchema>;

interface DialogAddNodeProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    dataEdit?: INodeConfigDTO | null;
    setDataEdit?: Dispatch<SetStateAction<INodeConfigDTO | null>>;
}

interface NodeItemForm extends INodeConfigDTO {
    deviceItem?: IDeviceConfigDTO[];
    sensorItem?: ISensorConfigDTO[];
}

interface NodeConfigForm {
    nodeItem: NodeItemForm[];
}

function DialogAddNode({
    open,
    setOpen,
    dataEdit,
    setDataEdit,
}: DialogAddNodeProps) {
    // define form
    const form = useForm<NodeConfigForm>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    });

    useFieldArray({
        control: form.control,
        name: 'nodeItem',
    });

    const handleSaveConfig = (index: number) => {
        const data = form.getValues('nodeItem');
        const dataIndex = data[index];

        if (dataIndex && dataIndex.nodeId && dataIndex.name) {
            let deviceItem = dataIndex?.deviceItem || [];
            let sensorItem = dataIndex?.sensorItem || [];

            const dataNodeConfig: INodeConfigDTO = {
                ...dataIndex,
                active: dataIndex?.active ?? false,
            };

            if (deviceItem.length > 0) {
                deviceItem = deviceItem.map((v) => {
                    return {
                        ...v,
                        styleOFF: v?.styleOFF ?? '',
                        styleON: v?.styleON ?? '',
                        icon: v?.icon ?? '',
                    };
                });
                dataNodeConfig.deviceItem = deviceItem;
            }

            if (sensorItem.length > 0) {
                sensorItem = sensorItem.map((v) => {
                    return {
                        ...v,
                        unit: v.unit ?? '',
                        style: v.style ?? '',
                        icon: v?.icon ?? '',
                        minThreshold: v?.minThreshold ?? '',
                        maxThreshold: v?.maxThreshold ?? '',
                    };
                });
                dataNodeConfig.sensorItem = sensorItem;
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

            toast.success(
                dataEdit
                    ? 'Chỉnh sửa cấu hình thành công'
                    : 'Thêm cấu hình thành công',
            );
            setOpen(false);
            setDataEdit && setDataEdit(null);
        } else {
            toast.error('Trường ID và Tên của Node là bắt buộc');
        }
    };

    const handleClose = () => {
        setDataEdit && setDataEdit(null);
        setOpen(false);
    };

    useEffect(() => {
        if (dataEdit) {
            form.setValue('nodeItem', [dataEdit]);
        }
    }, [dataEdit, form]);

    return (
        <div>
            <Dialog
                onOpenChange={(s) => {
                    setOpen(s);
                    if (!s) {
                        form.reset();
                        setDataEdit && setDataEdit(null);
                    }
                }}
                open={open}
            >
                <DialogContent className="max-w-screen-md">
                    <DialogHeader>
                        <DialogTitle>
                            {dataEdit
                                ? `Chỉnh sửa Node ${dataEdit.name}`
                                : 'Thêm Node'}
                        </DialogTitle>
                    </DialogHeader>

                    <ScrollArea className="h-[calc(100vh-200px)] px-3">
                        <div className="px-1">
                            <Form {...form}>
                                <>
                                    <p className="font-medium mb-3">
                                        Thông tin Node
                                    </p>
                                    <div className="grid gap-3 sm:grid-cols-1 grid-cols-1 grid-rows-2 border border-yellow-400 px-4 py-2 rounded-md">
                                        <FormHook
                                            control={form.control}
                                            name={`nodeItem.${0}.name`}
                                            label="Tên"
                                        />
                                        <FormHook
                                            control={form.control}
                                            name={`nodeItem.${0}.nodeId`}
                                            label="Node ID"
                                        />

                                        {/* <FormHook
                                                control={form.control}
                                                name={`nodeItem.${0}.icon`}
                                                label="Icon Node"
                                                placeholder="Nhập icon node ..."
                                            /> */}

                                        <div className="flex items-center space-x-2 my-4">
                                            <SwitchHook
                                                control={form.control}
                                                name={`nodeItem.${0}.active`}
                                            />
                                        </div>
                                    </div>

                                    {/* config device */}
                                    {/* <div className="border border-slate-400 my-4"></div> */}

                                    <div className="mt-4">
                                        <NestedDevice
                                            control={form.control}
                                            register={form.register}
                                            nestIndex={0}
                                            getValues={form.getValues}
                                        />
                                    </div>
                                    {/* <div className="border border-slate-400  my-4"></div> */}
                                    <div className="mt-4">
                                        <NestedSensor
                                            control={form.control}
                                            register={form.register}
                                            nestIndex={0}
                                            getValues={form.getValues}
                                        />
                                    </div>
                                </>
                            </Form>
                        </div>
                    </ScrollArea>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleClose}
                            >
                                Đóng
                            </Button>
                        </DialogClose>

                        <Button onClick={() => handleSaveConfig(0)}>
                            {dataEdit ? 'Chỉnh sửa Node' : 'Thêm Node'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DialogAddNode;
