import { SignIn } from '@clerk/nextjs';

function LoginPage() {
    return (
        <div className="flex flex-col gap-2 mt-14 items-center h-screen">
            <SignIn
                appearance={{
                    elements: {
                        footer: { display: 'none' },
                    },
                }}
            />
        </div>
    );
}

export default LoginPage;
