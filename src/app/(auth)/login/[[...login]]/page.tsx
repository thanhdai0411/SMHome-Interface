import { SignIn } from '@clerk/nextjs';

function LoginPage() {
    return (
        <div className="flex justify-center items-center h-screen">
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
