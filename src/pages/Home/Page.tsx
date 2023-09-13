import MovieTrailer from '@/components/Movie';
import React from 'react';

export interface PageProps {
    title?: string;
}

interface HomePageProps extends PageProps {}
const Home: React.FC<HomePageProps> = ({
    title = 'Trang chủ - HIU Cinema',
}) => {
    document.title = title;
    return (
        <div className="dark:bg-[#141414] bg-[#FFECD7] h-[1000px]">
            <MovieTrailer />
        </div>
    );
};

export default Home;
