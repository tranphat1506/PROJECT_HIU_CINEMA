import HomeAd from '@/components/Advertisement/HomeAd';
// import MovieSlider, { MovieItem } from '@/components/Movie/MovieSlider';
import MovieSliderV2, { MovieItem } from '@/components/Movie/MovieSliderV2';
import MovieTrailer from '@/components/Movie/MovieTrailer';
import React, { useState, useCallback, useEffect } from 'react';
import { PageProps } from '../Home/Page';
import { useLocation } from 'react-router-dom';
interface MoviePageProps extends PageProps {}
const MoviePage: React.FC<MoviePageProps> = ({
    title = 'Phim - HIU Cinemas',
}) => {
    document.title = title; // Set Title
    const route = useLocation();
    const [currentMovieDisplay, setCurrentMovieDisplay] = useState<
        MovieItem | undefined
    >();
    const [isAdClosed, setIsAdClosed] = useState(false);
    const handleCloseAd = useCallback(() => {
        setIsAdClosed(true);
    }, []);
    useEffect(() => {
        window.scroll(0, 0);
        if (!route.state || !route.state.movieItem) return;
        const routeMovieState: MovieItem = route.state.movieItem;
        setCurrentMovieDisplay(routeMovieState);
    }, [route]);
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
                {/* Movie slider v2 */}
                <MovieSliderV2 />
            </div>
        </>
    );
};

export default MoviePage;
