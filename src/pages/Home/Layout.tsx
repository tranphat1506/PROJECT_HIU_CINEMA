import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import React from 'react';

interface HomeLayoutProps {
    children?: React.ReactNode;
}
const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    return (
        <div className="dark:bg-[#141414] bg-[#FFECD7] h-full">
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default HomeLayout;
