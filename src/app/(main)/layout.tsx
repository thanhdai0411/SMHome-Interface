import MainLayout from '@/components/layouts/main-layout';

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
