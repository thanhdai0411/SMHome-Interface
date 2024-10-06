import { cn } from '@/lib/utils';
import { BellIcon } from 'lucide-react';
import { Card } from './card';
import { Label } from './label';
import { Switch } from './switch';
import useRole from '@/hooks/useRole';
import usePermission from '@/hooks/usePermission';
import { SMHomePermission } from '@/constants/roles';
interface CardSwitchProps {
    className?: string;
    onCheckedChange: (checked: boolean) => void;
    status: string;
    name: string;
}

const statusDeviceChecked = (checked: string) => {
    return checked == 'ON' ? true : false;
};

function CardSwitch({
    className,
    onCheckedChange,
    status,
    name,
}: CardSwitchProps) {
    const canControl = usePermission({
        permissions: [SMHomePermission.Control, SMHomePermission.Admin],
    });

    return (
        <Card className={cn(className)}>
            <div className=" flex rounded-md  p-4">
                <div className="flex-1 space-y-4">
                    <BellIcon />
                    <p
                        className="text-md font-medium"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {name}
                    </p>
                </div>
                <div className="flex items-start">
                    <div className="flex items-center gap-2">
                        <Label className="text-sm">{status}</Label>
                        {canControl && (
                            <Switch
                                onCheckedChange={onCheckedChange}
                                checked={statusDeviceChecked(status)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CardSwitch;
