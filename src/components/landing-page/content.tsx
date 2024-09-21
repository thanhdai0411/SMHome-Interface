import { ReactNode } from 'react';

interface ContentLandingProps {
    title: string;
    desc: string;
    button: ReactNode;
}

function ContentLanding({ title, desc, button }: ContentLandingProps) {
    return (
        <main className="min-h-[calc(100vh-57px-97px)] flex-1">
            <div className="container relative pb-10">
                <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
                    <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                        {title}
                    </h1>
                    <span className="max-w-[750px] text-center text-lg font-light text-foreground">
                        {desc}
                    </span>
                    <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
                        {button}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default ContentLanding;
