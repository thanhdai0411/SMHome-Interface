import ClerkProviderr from '@/providers/clerk-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import MyClerkLoading from '@/components/clerk-loading';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'SM Home',
    description: 'SM Home Giám sát an toàn và điều khiển thông minh',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProviderr>

            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <ClerkLoading>
                            <MyClerkLoading />
                        </ClerkLoading>
                        <ClerkLoaded>{children}</ClerkLoaded>
                    </ThemeProvider>
                    <Toaster richColors position="top-right" />
                </body>
            </html>
        </ClerkProviderr>
    );
}
