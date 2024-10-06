import { Navbar } from '@/components/admin-panel/navbar';
import Image from 'next/image';

export function UnAuthorzationView() {
    return (
        <div className="h-full">
            <Navbar title={''} />
            <div className="container">
                <div>
                    <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
                        <Image
                            src="/images/unthor.png"
                            alt="unauthor"
                            className="w-1/3"
                        />

                        <h1 className="text-center text-xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                            Không có quyền truy cập 🚫
                        </h1>
                        <span className="max-w-[750px] text-center text-sm md:text-lg font-light text-foreground">
                            Bạn không có quyền truy cập trang này. Vui lòng liên
                            hệ với quản trị để được hỗ trợ !
                        </span>
                    </section>
                </div>
            </div>
        </div>
    );
}
