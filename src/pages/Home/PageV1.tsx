// import HomeAd from '@/components/Advertisement/HomeAd';
// // import MovieSlider, { MovieItem } from '@/components/Movie/MovieSlider';
// import MovieSliderV2, { MovieItem } from '@/components/Movie/MovieSliderV2';
// import MovieTrailer from '@/components/Movie/MovieTrailer';
// import React, { useState, useCallback } from 'react';
// export interface PageProps {
//     title?: string;
// }

// interface HomePageProps extends PageProps {}
// const HomePage: React.FC<HomePageProps> = ({
//     title = 'Trang chủ - HIU Cinemas',
// }) => {
//     document.title = title; // Set Title
//     const [currentMovieDisplay, setCurrentMovieDisplay] = useState<
//         MovieItem | undefined
//     >();
//     const [isAdClosed, setIsAdClosed] = useState(true);
//     const handleCloseAd = useCallback(() => {
//         setIsAdClosed(true);
//     }, []);
//     return (
//         <>
//             <HomeAd
//                 open={!isAdClosed}
//                 handleCloseAd={handleCloseAd}
//                 handleSetMovieDisplay={setCurrentMovieDisplay}
//             />
//             <MovieTrailer
//                 movieApi={currentMovieDisplay}
//                 isInteractDocumentFirst={isAdClosed}
//             />
//             <div className="h-auto w-full font-MP_Medium">
//                 {/* Movie slider v1 */}
//                 {/* <MovieSlider
//                     path="/currentShowing"
//                     handleSetMovieDisplay={setCurrentMovieDisplay}
//                 /> */}

//                 {/* Movie slider v2 */}
//                 {/* <MovieSliderV2 handleSetMovieDisplay={setCurrentMovieDisplay} /> */}
//             </div>
//         </>
//     );
// };

// export default HomePage;
