import HeaderLogo from '@/components/header/header-logo';
import FooterLanding from '@/components/landing-page/footer';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex  h-screen flex-col">
            <HeaderLogo />
            {children}
            <FooterLanding />
        </div>
    );
}
