import MovieSliderV2 from '@/components/Movie/MovieSliderV2';
import Slideshow from '@/components/Slideshow';
import React from 'react';
export interface PageProps {
    title?: string;
}

interface HomePageProps extends PageProps {}
const HomePage: React.FC<HomePageProps> = ({
    title = 'Trang chủ - HIU Cinemas',
}) => {
    document.title = title; // Set Title
    return (
        <>
            <Slideshow />
            <div className="h-auto w-full font-MP_Medium">
                {/* Movie slider v2 */}
                <MovieSliderV2 />
            </div>
        </>
    );
};

export default HomePage;
