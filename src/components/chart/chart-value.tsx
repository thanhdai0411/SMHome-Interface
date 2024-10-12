'use client';

import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { getDataSensor } from '@/actions/firebase/getDataSensor';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { addDays } from 'date-fns';
import moment from 'moment';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from '../ui/date-picker';
import { INodeConfigDTO } from '@/actions/firebase/nodeConfig';

export const description = 'An interactive area chart';

const chartConfig = {
    SMH_SENSOR1: {
        label: 'SMH_SENSOR1',
        // color: 'hsl(var(--chart-1))',
        // color: '#2563eb',
    },
    SMH_SENSOR2: {
        label: 'SMH_SENSOR2',
        // color: 'hsl(var(--chart-2))',
        // color: '#60a5fa',
    },
} satisfies ChartConfig;

const colorDefine = ['#F95454', '#00A9FF', '#FCCD2A', 'orange'];

interface ChartValueProps {
    node: INodeConfigDTO;
}

export function ChartValue({ node }: ChartValueProps) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), -30),
        to: new Date(),
    });

    const [chartConfig, setChartConfig] = useState<ChartConfig>();

    const [dataChart, setDataChart] = useState<any[]>([]);
    const [sensorIds, setSensorIds] = useState<string[]>([]);

    const handleGetDataSensor = async (sensorIds: string[]) => {
        const startTime = date?.from;
        const endTime = date?.to;

        console.log('get data sensor ');
        if (startTime && endTime) {
            const listSensorOfNode = node?.sensorItem || [];

            if (listSensorOfNode.length > 0) {
                const resDataSensor = await Promise.all(
                    listSensorOfNode.map((v) => {
                        return getDataSensor(
                            node.nodeId,
                            v.sensorId,
                            moment(startTime).startOf('date').toISOString(),
                            moment(endTime).endOf('date').toISOString(),
                        );
                    }),
                );

                console.log({ listSensorOfNode, resDataSensor });

                const mergeData = resDataSensor.flat().map((v) => ({
                    ...v,
                    date: moment(v.timestamp.toDate()).format(
                        'DD/MM/YYYY HH:mm:ss',
                    ),
                }));

                const groupData = new Map();

                mergeData.forEach((v) => {
                    const key = v.date;
                    if (!groupData.get(key)) {
                        groupData.set(key, {
                            data: {
                                date: key,
                            },
                        });
                    }

                    groupData.get(key).data[v.sensorId] = Number(v.value);
                });

                const res = Array.from(groupData.values()).map((v) => {
                    let obj = v.data;
                    sensorIds.forEach((v2) => {
                        if (!obj?.[v2]) {
                            obj[v2] = 0;
                        }
                    });

                    return obj;
                });

                setDataChart(res);
            } else {
                setDataChart([]);
            }
        }
    };

    useEffect(() => {
        if (node && node?.sensorItem && node?.sensorItem?.length > 0) {
            const listSensorId = node.sensorItem
                .map((v) => v.sensorId)
                .filter((v2) => v2);

            const myChartConfig: ChartConfig = {};

            listSensorId.map((v) => {
                myChartConfig[v] = {
                    label:
                        node?.sensorItem?.find((sensor) => sensor.sensorId == v)
                            ?.name || v,
                };
            });
            setSensorIds(listSensorId);
            setChartConfig(myChartConfig);
            handleGetDataSensor(listSensorId);
        } else {
            setDataChart([]);
        }
    }, [date, node.name, node.nodeId]);

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Biểu đồ giá trị {node?.name || ''} </CardTitle>
                    <CardDescription>
                        Giá trị nhiệt độ độ ẩm từ{' '}
                        {moment(date?.from).format('DD/MM/YYYY')} tới{' '}
                        {moment(date?.to).format('DD/MM/YYYY')}
                    </CardDescription>
                </div>

                <DatePickerWithRange setDate={setDate} date={date} />
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {chartConfig && (
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[350px] w-full"
                    >
                        <AreaChart data={dataChart}>
                            <defs>
                                {sensorIds?.map((v, index) => (
                                    <linearGradient
                                        key={index}
                                        id={v}
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor={colorDefine[index]}
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor={colorDefine[index]}
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                ))}
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={true}
                                axisLine={true}
                                tickMargin={8}
                                minTickGap={20}
                                tickFormatter={(value) => {
                                    // const date = new Date(value);
                                    // return date.toLocaleDateString('en-US', {
                                    //     month: 'short',
                                    //     day: 'numeric',
                                    // });
                                    return value;
                                }}
                            />

                            <YAxis
                                tickLine={true}
                                axisLine={true}
                                tickMargin={8}
                                // tickCount={3}
                            />

                            <ChartTooltip
                                cursor={true}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => {
                                            // return new Date(
                                            //     value,
                                            // ).toLocaleDateString('en-US', {
                                            //     month: 'short',
                                            //     day: 'numeric',
                                            // });
                                            return value;
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />

                            {sensorIds?.map((v, index) => (
                                <Area
                                    key={index}
                                    dataKey={v}
                                    // type="basis"
                                    fill={`url(#${v})`}
                                    stroke={colorDefine[index]}
                                    stackId={'a' + index}
                                />
                            ))}

                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}
