import { ModeToggle } from '@/components/mode-toggle';
import { UserNav } from '@/components/admin-panel/user-nav';
import { SheetMenu } from '@/components/admin-panel/sheet-menu';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import FCMNotify from '../notification/fcm-notify';

interface NavbarProps {
    title: string;
}

export function Navbar({ title }: NavbarProps) {
    return (
        <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                    <h1
                        className="font-bold"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {title}
                    </h1>
                </div>
                <div className="flex flex-1 items-center space-x-2 justify-end">
                    <ModeToggle />
                    <SignedIn>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full w-8 h-8 bg-background"
                            asChild
                        >
                            <UserButton
                                appearance={{
                                    elements: {
                                        footer: { display: 'none' },
                                        userButtonPopoverFooter: {
                                            display: 'none',
                                        },
                                    },
                                }}
                            />
                        </Button>
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
