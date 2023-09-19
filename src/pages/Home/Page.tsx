import MovieSlider, { TypeSlider } from '@/components/Movie/MovieSlider';
import MovieTrailer from '@/components/Movie/MovieTrailer';
import React, { useEffect, useState } from 'react';
export interface PageProps {
    title?: string;
}

interface HomePageProps extends PageProps {}
const HomePage: React.FC<HomePageProps> = ({
    title = 'Trang chủ - HIU Cinema',
}) => {
    document.title = title; // Set Title
    console.log('render page');
    return (
        <>
            <MovieTrailer />
            <div className="h-auto w-full font-MP_Medium">
                <MovieSlider path="/currentShowing" />
                <MovieSlider path="/c" />
                <MovieSlider path="/c" />
                <MovieSlider path="/c" />
            </div>
        </>
    );
};

export default HomePage;
