import { SMHomePermission } from '@/constants/roles';
import usePermission from '@/hooks/usePermission';
import { cn } from '@/lib/utils';
import { BellIcon } from 'lucide-react';
import { Card } from './card';
import { Label } from './label';
import { Switch } from './switch';
import { Icon } from '@iconify/react';
interface CardSwitchProps {
    className?: string;
    onCheckedChange: (checked: boolean) => void;
    status: string;
    name: string;
    icon?: string;
}

const statusDeviceChecked = (checked: string) => {
    return checked == 'ON' ? true : false;
};

function CardSwitch({
    className,
    onCheckedChange,
    status,
    name,
    icon,
}: CardSwitchProps) {
    const canControl = usePermission({
        permissions: [SMHomePermission.Control, SMHomePermission.Admin],
    });

    return (
        <Card className={className}>
            <div className=" flex rounded-md  p-4">
                <div className="flex-1 space-y-4">
                    <Icon
                        icon={icon || 'mdi:lamp-outline'}
                        fontSize={'1.85rem'}
                        fontWeight={'bold'}
                    />
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
