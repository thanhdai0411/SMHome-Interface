import ContentLanding from '@/components/landing-page/content';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

function RegisterPage() {
    return (
        <div className="flex flex-col gap-2 justify-center items-center h-screen">
            <ContentLanding
                button={
                    <>
                        <Button variant="default" asChild>
                            <Link href="/login">
                                <ArrowLeftIcon className="mr-2" />
                                Quay lại Đăng nhập
                            </Link>
                        </Button>
                    </>
                }
                title="Tài khoản không tồn tại"
                desc="Tài khoản của bạn chưa đươc đăng kí vào hệ thống.
                            Vui lòng liên hệ với Admin để được đăng kí tài khoản
                            và hỗ trợ"
            />
        </div>
    );
}

export default RegisterPage;
