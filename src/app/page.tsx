import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import HeaderLogo from '@/components/header/header-logo';
import ContentLanding from '@/components/landing-page/content';
import FooterLanding from '@/components/landing-page/footer';
import { Button } from '@/components/ui/button';

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderLogo isShowButtonLogin={true} />

            <ContentLanding
                button={
                    <>
                        <Button variant="default" asChild>
                            <Link href="/dashboard">
                                Khám phá ngay
                                <ArrowRightIcon className="ml-2" />
                            </Link>
                        </Button>
                    </>
                }
                title="SMHome Thông minh cho mọi nhà"
                desc="Hệ thống nhà thông minh. Giám sát an toàn và điều khiển thông minh"
            />

            <FooterLanding />
        </div>
    );
}
