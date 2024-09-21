import { ChartTempHumi } from '@/components/chart/chart-temp';
import HeaderDashboard from '@/components/dashboard/header-dashboard';
import { ContentLayout } from '@/components/layouts/content-layout';

export default function DashboardPage() {
    return (
        <ContentLayout title="Tổng quan">
            <div className="grid grid-cols-1 gap-4">
                <HeaderDashboard />
                <div className="grid  grid-cols-1 grid-rows-1">
                    <ChartTempHumi />
                </div>
            </div>

        </ContentLayout>
    );
}
