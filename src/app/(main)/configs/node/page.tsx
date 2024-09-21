import NodeConfig from '@/components/config-page/node-config';
import { ContentLayout } from '@/components/layouts/content-layout';

function ConfigNode() {
    return (
        <ContentLayout title="Cấu hình Node">
            <NodeConfig />
        </ContentLayout>
    );
}

export default ConfigNode;
