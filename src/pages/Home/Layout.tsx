import Footer from '@/components/Footer/Footer';
import Header, { HeaderProps } from '@/components/Header/Header';
import React from 'react';

interface HomeLayoutProps {
    children?: React.ReactNode;
    headerProps?: HeaderProps;
}
const HomeLayout: React.FC<HomeLayoutProps> = ({ children, headerProps }) => {
    return (
        <div className="dark:bg-[#141414] bg-[#FFECD7] h-full">
            <Header {...headerProps} />
            {children}
            <Footer />
        </div>
    );
};

export default HomeLayout;
