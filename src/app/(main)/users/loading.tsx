import { ContentLayout } from '@/components/layouts/content-layout';
import LoadingSpinner from '@/components/ui/loading-spiner';

function LoadinPage() {
    return (
        <ContentLayout title="Danh sách người dùng">
           <LoadingSpinner text='Đang tải dữ liệu' />
        </ContentLayout>
    );
}

export default LoadinPage;
