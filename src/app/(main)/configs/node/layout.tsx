import { ContentLayout } from '@/components/layouts/content-layout';
import { UnAuthorzationView } from '@/components/unauthorization-view';
import { SMHomePermission } from '@/constants/roles';
import { auth } from '@clerk/nextjs/server';
import type { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
    const { has } = auth();

    const canAccess = has({ permission: SMHomePermission.Admin });
    if (!canAccess) return <UnAuthorzationView />;

    return (
        <ContentLayout title="Cấu hình Node">{props.children}</ContentLayout>
    );
}
