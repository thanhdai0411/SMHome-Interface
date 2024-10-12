import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import Chip from '../ui/chip';

interface CardConfigProps extends React.ComponentProps<typeof Card> {
    nodeName: string;
    onClickEdit: () => void;
    onClickDelete: () => void;
    onCheckedChange: (checked: boolean) => void;
    amountDevice?: number;
    amountSensor?: number;
    active?: boolean;
}

export function CardConfig({
    className,
    nodeName,
    onClickEdit,
    onClickDelete,
    onCheckedChange,
    amountDevice,
    amountSensor,
    active,
    ...props
}: CardConfigProps) {
    return (
        <Card className={cn(className)} {...props}>
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-xl text-yellow-400">
                    {nodeName}
                </CardTitle>
                <Switch onCheckedChange={onCheckedChange} checked={active} />
            </CardHeader>
            <CardContent className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                    Cấu hình Node {nodeName}. Cân nhắc trước khi xóa hoặc chỉnh
                    sửa
                </p>
                <div className="flex gap-1.5">
                    <Chip
                        name={`${amountDevice} Thiết bị`}
                        variant={'secondary'}
                    />
                    <Chip
                        name={`${amountSensor} Cảm biến`}
                        variant={'secondary'}
                    />
                </div>
            </CardContent>
            <CardFooter className="gap-2">
                <Button className="w-full" onClick={onClickEdit}>
                    <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
                </Button>
                <Button
                    className="w-full"
                    onClick={onClickDelete}
                    variant={'destructive'}
                >
                    <Trash2 className="mr-2 h-4 w-4" /> Xóa
                </Button>
            </CardFooter>
        </Card>
    );
}
