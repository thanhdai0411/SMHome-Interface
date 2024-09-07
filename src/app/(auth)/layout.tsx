import HeaderLogo from '@/components/header/header-logo';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex  h-screen flex-col">
            <HeaderLogo />
            {children}
        </div>
    );
}
