'use client';

import { Navbar } from '@/components/admin-panel/navbar';
import useFetchConfigNode from '@/hooks/useFetchConfigNode';

interface ContentLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
    useFetchConfigNode();
    return (
        <div>
            <Navbar title={title} />
            <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
        </div>
    );
}
