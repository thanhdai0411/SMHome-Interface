import { ContentLayout } from '@/components/layouts/content-layout';
import LoadingSpinner from '@/components/ui/loading-spiner';

function LoadinPage() {
    return (
        <ContentLayout title="Cấu hình Node">
            <LoadingSpinner text='Đang tải dữ liệu' />
        </ContentLayout>
    );
}

export default LoadinPage;
