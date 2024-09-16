import { ChartTempHumi } from '@/components/chart/chart-temp';
import SwitchControl from '@/components/dashboard/switch-control';
import { ContentLayout } from '@/components/layouts/content-layout';
import { Card } from '@/components/ui/card';
import CardSensor from '@/components/ui/card-sensor';
import CardSwitch from '@/components/ui/card-switch';
import { ThermometerSnowflake, ThermometerSun } from 'lucide-react';
import { FormEvent } from 'react';

const switchConfig = [
    {
        name: 'Lamp1',
    },
    {
        name: 'Lamp2',
    },
    {
        name: 'Lamp3',
    },
    {
        name: 'Lamp4',
    },
];

export default function DashboardPage() {
    return (
        <ContentLayout title="Tổng quan">
            <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-4 grid-cols-2 grid-rows-1">
                    <CardSensor
                        name="Nhiệt độ"
                        value={'100 °C'}
                        icon={
                            <ThermometerSun
                                size={80}
                                className="text-red-500"
                            />
                        }
                    />
                    <CardSensor
                        name="Độ ẩm"
                        value="20 %"
                        icon={
                            <ThermometerSnowflake
                                size={80}
                                className="text-sky-500"
                            />
                        }
                    />
                </div>
                <div className="grid gap-4 grid-cols-4 grid-rows-1">
                    <SwitchControl />
                </div>

                <div className="grid  grid-cols-1 grid-rows-1">
                    <ChartTempHumi />
                </div>
            </div>
        </ContentLayout>
    );
}
