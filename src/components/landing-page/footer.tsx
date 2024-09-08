import Link from 'next/link';
import { ReactNode } from 'react';

interface FooterLandingProps {
    childrenCustom?: ReactNode;
}

function FooterLanding({ childrenCustom }: FooterLandingProps) {
    const branchApp = process.env.NEXT_PUBLIC_BRANCH_NAME || 'SMHome';

    return (
        <footer className="py-6 md:py-0 border-t border-border/40">
            <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
                {childrenCustom ?? (
                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
                        <Link
                            href="/dashbord"
                            rel="noopener noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            {branchApp}
                        </Link>{' '}
                        Thông minh cho mọi nhà
                    </p>
                )}
            </div>
        </footer>
    );
}

export default FooterLanding;
