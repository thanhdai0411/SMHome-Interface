import { viVN } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';

export default function ClerkProviderr({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <ClerkProvider localization={viVN}>{children}</ClerkProvider>;
}
