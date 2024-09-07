import { SignedOut } from '@clerk/nextjs';
import { PanelsTopLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
interface HeaderLogoProps {
    isShowButtonLogin?: boolean;
}
function HeaderLogo({ isShowButtonLogin = false }: HeaderLogoProps) {
    const branchApp = process.env.NEXT_PUBLIC_BRANCH_NAME || 'SMHome';

    return (
        <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
            <div className="container h-14 flex items-center">
                <Link
                    href="/"
                    className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
                >
                    <PanelsTopLeft className="w-6 h-6 mr-3" />
                    <span className="font-bold">{branchApp}</span>
                    <span className="sr-only">{branchApp}</span>
                </Link>
                <nav className="ml-auto flex items-center gap-2">
                    {isShowButtonLogin && (
                        <SignedOut>
                            <Link href="/login">
                                <Button className=" h-8">Đăng nhập</Button>
                            </Link>
                        </SignedOut>
                    )}

                    {/* <ModeToggle /> */}
                </nav>
            </div>
        </header>
    );
}

export default HeaderLogo;
