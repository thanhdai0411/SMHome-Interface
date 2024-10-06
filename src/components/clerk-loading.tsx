import React from 'react';
import HeaderLogo from './header/header-logo';
import ContentLanding from './landing-page/content';
import FooterLanding from './landing-page/footer';
import LoadingSpinner from './ui/loading-spiner';

const MyClerkLoading = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderLogo />

            <ContentLanding
                button={
                    <>
                        <LoadingSpinner text="Vui lòng chờ" />
                    </>
                }
                title="SMHome Thông minh cho mọi nhà"
                desc="Hệ thống nhà thông minh. Giám sát an toàn và điều khiển từ xa"
            />

            <FooterLanding />
        </div>
    );
};

export default MyClerkLoading;
