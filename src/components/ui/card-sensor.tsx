import { ThermometerSun } from 'lucide-react';
import { Card } from './card';
import { ReactNode } from 'react';
interface CardSensorProps {
    className?: string;
    name: string;
    icon: ReactNode;
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
                <div className="flex items-center">{icon}</div>
            </div>
        </Card>
    );
}

export default CardSensor;
