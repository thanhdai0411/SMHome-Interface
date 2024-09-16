import { cn } from '@/lib/utils';
import { BellIcon } from 'lucide-react';
import { FormEvent } from 'react';
import { Card } from './card';
import { Label } from './label';
import { Switch } from './switch';
interface CardSwitchProps {
    className?: string;
    onCheckedChange: (checked: boolean) => void;
    status: string;
    name: string;
}
function CardSwitch({
    className,
    onCheckedChange,
    status,
    name,
}: CardSwitchProps) {
    return (
        <Card className={cn(className)}>
            <div className=" flex rounded-md border p-4">
                <div className="flex-1 space-y-4">
                    <BellIcon />
                    <p className="text-xl font-medium">{name}</p>
                </div>
                <div className="flex items-start">
                    <div className="flex items-center gap-2">
                        <Label className="text-md">{status}</Label>
                        <Switch onCheckedChange={onCheckedChange} />
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CardSwitch;
