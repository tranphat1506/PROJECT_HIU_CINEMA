import Header from '@/components/Header';
import React from 'react';

interface HomeLayoutProps {
    children?: React.ReactNode;
}
const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default HomeLayout;
