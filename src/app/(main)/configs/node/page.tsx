import ConfigView from '@/components/config-page/ConfigView';
import { ContentLayout } from '@/components/layouts/content-layout';

function ConfigNode() {
    return (
        <ContentLayout title="Cấu hình Node">
            <ConfigView />
        </ContentLayout>
    );
}

export default ConfigNode;
