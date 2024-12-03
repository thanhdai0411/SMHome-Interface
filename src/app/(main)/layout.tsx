import MainLayout from '@/components/layouts/main-layout';
import useFetchConfigNode from '@/hooks/useFetchConfigNode';

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
   
    return <MainLayout>{children}</MainLayout>;
}
