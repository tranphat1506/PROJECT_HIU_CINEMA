import MovieTrailer from '@/components/Movie/MovieTrailer';
import React, { useEffect, useRef, useState } from 'react';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
export interface PageProps {
    title?: string;
}

interface HomePageProps extends PageProps {}
const Home: React.FC<HomePageProps> = ({
    title = 'Trang chủ - HIU Cinema',
}) => {
    document.title = title;
    document.body.style.overflowX = 'hidden';

    const [hoverMovieCard, setHoverMovieCard] = useState<boolean>(false);
    const handleHoverMovieCard = () => {
        setHoverMovieCard(true);
    };
    const handleUnHoverMovieCard = () => {
        setHoverMovieCard(false);
    };
    // Scroll movieCard
    const [canScroll, setCanScroll] = useState({ left: false, right: true });

    const handleScrollLeft = () => {
        if (!firstNavRef.current) return;
        firstNavRef.current.scrollBy(-280, 0);
    };

    const handleScrollRight = () => {
        if (!firstNavRef.current) return;
        firstNavRef.current.scrollBy(280, 0);
    };
    const firstNavRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <MovieTrailer />
            <div className="h-[500px] w-full font-MP_Medium">
                <div
                    id="current-voting"
                    className="w-full h-auto"
                    onMouseEnter={handleHoverMovieCard}
                    onMouseLeave={handleUnHoverMovieCard}
                >
                    <div className="cursor-pointer title capitalize text-xl dark:text-white mb-4 inline-block mx-5 lg:mx-10">
                        Phim sắp chiếu {'>'}
                    </div>
                    <div id="movie-card" className="mb-4 relative">
                        <div
                            ref={firstNavRef}
                            className="flex flex-row gap-4 flex-nowrap overflow-x-hidden scroll-smooth"
                            style={{ scrollSnapType: 'x mandatory' }}
                        >
                            <div className="ml-5 lg:ml-10 h-[180px] min-w-[280px] dark:bg-[#292727] bg-[#ffffff91] rounded-xl">
                                <img
                                    src="island.webp"
                                    alt=""
                                    className="mx-auto object-cover w-full h-full rounded-xl"
                                    style={{
                                        scrollSnapAlign: 'none',
                                        scrollMargin: '0',
                                    }}
                                />
                            </div>
                            <div className="h-[180px] min-w-[280px] dark:bg-[#292727] bg-[#ffffff91] rounded-xl">
                                <img
                                    src="island.webp"
                                    alt=""
                                    className="object-cover w-full h-full rounded-xl"
                                    style={{
                                        scrollSnapAlign: 'none',
                                        scrollMargin: '0',
                                    }}
                                />
                            </div>
                            <div className="h-[180px] min-w-[280px] dark:bg-[#292727] bg-[#ffffff91] rounded-xl">
                                <img
                                    src="island.webp"
                                    alt=""
                                    className="object-cover w-full h-full rounded-xl"
                                    style={{
                                        scrollSnapAlign: 'none',
                                        scrollMargin: '0',
                                    }}
                                />
                            </div>
                            <div className="h-[180px] min-w-[280px] dark:bg-[#292727] bg-[#ffffff91] rounded-xl">
                                <img
                                    src="island.webp"
                                    alt=""
                                    className="object-cover w-full h-full rounded-xl"
                                    style={{
                                        scrollSnapAlign: 'none',
                                        scrollMargin: '0',
                                    }}
                                />
                            </div>
                            <div className="h-[180px] min-w-[280px] dark:bg-[#292727] bg-[#ffffff91] rounded-xl">
                                <img
                                    src="island.webp"
                                    alt=""
                                    className="object-cover w-full h-full rounded-xl"
                                    style={{
                                        scrollSnapAlign: 'none',
                                        scrollMargin: '0',
                                    }}
                                />
                            </div>
                            <div className="mr-5 lg:mr-10 h-[180px] min-w-[280px] dark:bg-[#292727] bg-[#ffffff91] rounded-xl">
                                <img
                                    src="island.webp"
                                    alt=""
                                    className="object-cover w-full h-full rounded-xl"
                                    style={{
                                        scrollSnapAlign: 'none',
                                        scrollMargin: '0',
                                    }}
                                />
                            </div>
                        </div>
                        {hoverMovieCard && (
                            <div className="absolute w-screen h-full top-0">
                                {canScroll.left && (
                                    <div
                                        onClick={handleScrollLeft}
                                        className="cursor-pointer text-3xl text-white inline-flex items-center h-full px-4 bg-[#141414ab]"
                                    >
                                        <BsFillCaretLeftFill />
                                    </div>
                                )}
                                {canScroll.right && (
                                    <div
                                        onClick={handleScrollRight}
                                        className="cursor-pointer text-3xl text-white inline-flex items-center h-full px-4 bg-[#141414ab] float-right"
                                    >
                                        <BsFillCaretRightFill />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
