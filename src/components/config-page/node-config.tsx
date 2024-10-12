'use client';
import {
    getNode,
    INodeConfigDTO,
    removeNode,
    setNodeConfig,
} from '@/actions/firebase/nodeConfig';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import DialogConfirm from '../ui/dialog-confirm';
import { CardConfig } from './card-config';
import DialogAddNode from './dialog-add-node';

function NodeConfig() {
    const [nodeConfig, setNodeConfigS] = useState<INodeConfigDTO[]>([]);
    const [dialogConfig, setDialogConfig] = useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<INodeConfigDTO | null>(null);

    const [nodeIdDelete, setNodeIdDelete] = useState<string | null>(null);
    const [dialogDelete, setDialogDelete] = useState<boolean>(false);

    const callBackCallDevice = (data: any) => {
        const key = Object.keys(data);

        if (key && key.length > 0) {
            const resInit = key.map((v) => {
                const dataByKey = data?.[v]?.config as unknown as any;
                return dataByKey;
            });

            setNodeConfigS(resInit);
        }
    };

    useEffect(() => {
        const unsubscribe = getNode({
            callBack: callBackCallDevice,
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickEdit = (nodeId: string) => {
        const dataById = nodeConfig.find((v) => v.nodeId == nodeId);

        if (dataById) {
            setDataEdit(dataById);
            setDialogConfig(true);
        }
    };

    const handleClickDelete = (nodeId: string) => {
        setDialogDelete(true);
        setNodeIdDelete(nodeId);
    };

    const handleActiveNode = (checked: boolean, nodeId: string) => {
        const dataById = nodeConfig.find((v) => v.nodeId == nodeId);

        if (dataById) {
            setNodeConfig({
                ...dataById,
                active: checked,
            });

            const textToast =
                checked == true
                    ? `Kích hoạt Node ${dataById.name} Thành công`
                    : `Tắt Node ${dataById.name} Thành công`;

            toast.success(textToast);
        }
    };

    const handleAddNode = () => {
        setDialogConfig(true);
    };

    const handleConfirmDelete = () => {
        if (nodeIdDelete) {
            removeNode({
                nodeId: nodeIdDelete,
            });
        }

        setDialogDelete(false);
        toast.success('Xóa cấu hình Node thành công');
    };

    return (
        <div>
            <div className="mb-3">
                <Button onClick={handleAddNode}>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm Node
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 ">
                {nodeConfig?.map((v, index) => (
                    <CardConfig
                        key={v.nodeId + index}
                        nodeName={v.name}
                        onClickEdit={() => handleClickEdit(v.nodeId)}
                        onClickDelete={() => handleClickDelete(v.nodeId)}
                        onCheckedChange={(checked) =>
                            handleActiveNode(checked, v.nodeId)
                        }
                        amountDevice={v.deviceItem?.length || 0}
                        amountSensor={v.sensorItem?.length || 0}
                        active={v.active}
                    />
                ))}
            </div>

            {dialogConfig && (
                <DialogAddNode
                    open={dialogConfig}
                    setOpen={setDialogConfig}
                    dataEdit={dataEdit}
                    setDataEdit={setDataEdit}
                />
            )}

            {dialogDelete && (
                <DialogConfirm
                    open={dialogDelete}
                    setOpen={setDialogDelete}
                    title="Xóa Node"
                    desc="Bạn chắc chắn muốn xóa Node. Khi xóa sẽ xóa tất cả dữ liệu liên quan tới Node này. Bạn có thể cân nhắc Tắt hoạt động thay vì xóa luôn Node"
                    handleConfirm={handleConfirmDelete}
                    nameButton="Xóa Node"
                    nameButtonClose="Quay lại"
                />
            )}
        </div>
    );
}

export default NodeConfig;
