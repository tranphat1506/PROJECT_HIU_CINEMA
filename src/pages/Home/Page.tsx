import MovieTrailer from '@/components/Movie/MovieTrailer';
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
        <>
            <MovieTrailer />
            <div className="h-[500px] rounded-b-xl"></div>
        </>
    );
};

export default Home;
