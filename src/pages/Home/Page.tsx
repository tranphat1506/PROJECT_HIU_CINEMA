import HomeAd from '@/components/Advertisement/HomeAd';
import MovieSlider, { MovieItem } from '@/components/Movie/MovieSlider';
import MovieTrailer from '@/components/Movie/MovieTrailer';
import React, { useState, useCallback } from 'react';
export interface PageProps {
    title?: string;
}

interface HomePageProps extends PageProps {}
const HomePage: React.FC<HomePageProps> = ({
    title = 'Trang chủ - HIU Cinema',
}) => {
    document.title = title; // Set Title
    const [currentMovieDisplay, setCurrentMovieDisplay] = useState<
        MovieItem | undefined
    >();
    const [isAdClosed, setIsAdClosed] = useState(false);
    const handleCloseAd = useCallback(() => {
        setIsAdClosed(true);
    }, []);
    return (
        <>
            <HomeAd
                open={!isAdClosed}
                handleCloseAd={handleCloseAd}
                handleSetMovieDisplay={setCurrentMovieDisplay}
            />
            <MovieTrailer
                movieApi={currentMovieDisplay}
                isInteractDocumentFirst={isAdClosed}
            />
            <div className="h-auto w-full font-MP_Medium">
                <MovieSlider
                    path="/currentShowing"
                    handleSetMovieDisplay={setCurrentMovieDisplay}
                />
                <MovieSlider path="/c" />
                <MovieSlider path="/c" />
                <MovieSlider path="/c" />
                <MovieSlider path="/c" />
                <MovieSlider path="/c" />
                <MovieSlider path="/c" />
            </div>
        </>
    );
};

export default HomePage;
