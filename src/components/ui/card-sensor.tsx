import { Icon } from '@iconify/react';
import { Card } from './card';

interface CardSensorProps {
    className?: string;
    name: string;
    icon: string;
    value: string;
}
function CardSensor({ className, name, icon, value }: CardSensorProps) {
    return (
        <Card className={className}>
            <div className=" flex rounded-md p-4">
                <div className="flex-1 space-y-3">
                    <p className="text-xl font-medium">{name}</p>
                    <p className="text-4xl font-bold">{value}</p>
                </div>

                <Icon
                    icon={icon || 'ic:baseline-sensors'}
                    fontSize={'3.5rem'}
                    fontWeight={'bold'}
                    className="flex items-center"
                />
            </div>
        </Card>
    );
}

export default CardSensor;
