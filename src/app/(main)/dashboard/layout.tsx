import { ContentLayout } from '@/components/layouts/content-layout';
import type { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
    return <ContentLayout title="Tổng quan">{props.children}</ContentLayout>;
}
