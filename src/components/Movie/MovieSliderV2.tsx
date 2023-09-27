import { Skeleton } from '@mui/material';
import clsx from 'clsx';
import { memo, useEffect, useRef, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import MovieSliderApi from '@/test/API/MovieSliderApi.json';
import useLanguage from '@/hooks/useLanguage';

import SlideItem from './SlideItem';
const getItemWidth = (deviceWidth: number): string => {
    if (deviceWidth < 480) return '100%';
    return '33.333%';
};

const splitTotalSlide = (deviceWidth: number, totalItem: number): number => {
    if (deviceWidth < 480) return totalItem;
    return totalItem - 2;
};

export type TypeSlider = {
    id: string;
    to: string;
    title: { text: string; subText: string };
    movieList: MovieItem[];
    totalItem: number;
    totalSlide: number;
    currentSlide: number;
    canScroll: {
        left: boolean;
        right: boolean;
    };
};
export type MovieItem = {
    id: string | number;
    buyTicketSrc: string;
    detailMovieSrc: string;
    posterSrc: string;
    backgroundSrc: string;
    movieTrailerSrc: string;
    movieScale: string;
    movieTitle: string;
    movieTitleImgSrc: string;
    movieType: string;
    movieDescription: string;
};
export const MovieSliderSkeleton = () => {
    return (
        <div className="w-full h-auto mb-6 max-w-[1700px] mx-auto">
            <div className="title text-base dark:text-white mb-2 inline-block mx-5 lg:mx-10 dark:bg-[#ffffff0e] bg-[#ffffff91]">
                <Skeleton
                    variant="rectangular"
                    width={'150px'}
                    height={'1.5rem'}
                    animation="wave"
                />
            </div>
            <div className="movie-card mb-4 w-full overflow-hidden px-10 lg:px-20 relative">
                <div
                    className={clsx(
                        'movie-slider flex flex-nowrap gap-1 transition-transform w-full',
                        '-translate-x-[100%] min-[480px]:-translate-x-[50%] md:-translate-x-[33.333%] lg:-translate-x-[25%]',
                    )}
                >
                    {[1, 2, 3, 4, 5, 6].map((id) => {
                        return <SlideItem key={id} />;
                    })}
                </div>
            </div>
        </div>
    );
};
interface MovieSliderProps {}

const MovieSlider: React.FC<MovieSliderProps> = () => {
    const text = useLanguage();
    const sliderIdList = useRef<string[]>([]);
    const [currentSliderId, setCurrentSliderId] = useState<string | null>(null);
    const [slidersState, setSlidersState] = useState<{
        [id: string]: TypeSlider;
    } | null>(null);

    const [hoverSlider, setHoverSlider] = useState(false);
    const slidingPosition = useRef<number | null>(null);
    const toggleHoverSlider = (state: boolean) => () => {
        setHoverSlider(state);
    };
    useEffect(() => {
        const fakeFetchId = setTimeout(() => {
            let cloneSlidersState: { [id: string]: TypeSlider } = {};
            let cloneSliderIdList: string[] = [];
            Object.keys(MovieSliderApi).map((sliderId) => {
                const slider =
                    MovieSliderApi[sliderId as keyof typeof MovieSliderApi];
                // push to slider id list
                cloneSliderIdList.push(sliderId);
                // push slider api to slider list (TEMP NEED TO SET STATE)
                cloneSlidersState[sliderId] = {
                    ...slider,
                    canScroll: { left: false, right: true },
                    totalItem: slider.movieList.length,
                    totalSlide: splitTotalSlide(
                        document.body.clientWidth,
                        slider.movieList.length * 3,
                    ),
                    currentSlide: 0,
                };
            });
            sliderIdList.current = cloneSliderIdList;
            // set sliders state
            setSlidersState(cloneSlidersState);
            // set first slider is current slider
            setCurrentSliderId(sliderIdList.current[0]);
        }, 2000);

        return () => {
            clearTimeout(fakeFetchId);
        };
    }, []);
    // wait for fetching Movie Slider
    if (!currentSliderId || !slidersState) return <MovieSliderSkeleton />;
    const currentSlider = slidersState[currentSliderId]; // SET CURRENT SLIDER

    // Scroll event movieCard
    const handleScrollLeft = () => {
        if (!currentSlider.canScroll.left) return;
        const movieSliderById: HTMLDivElement | null = document.querySelector(
            '#' + currentSliderId + ' .movie-slider',
        );
        const itemWidth = getItemWidth(document.body.clientWidth);
        if (!movieSliderById || !currentSlider || !itemWidth) return;
        currentSlider.currentSlide -= 1;
        if (currentSlider.totalSlide !== 0 && currentSlider.currentSlide == 0) {
            // is start of slider and now back to end of slide 0
            let id = setTimeout(() => {
                currentSlider.currentSlide = currentSlider.totalItem;
                movieSliderById.style.transition = 'none';
                movieSliderById.style.transform = `translateX(calc((-${itemWidth} - 0.25rem) * ${currentSlider.currentSlide}))`;
                setSlidersState({
                    ...slidersState,
                    currentSliderId: currentSlider,
                });
                clearTimeout(id);
            }, 150);
        }
        movieSliderById.style.transition = 'transform 150ms';
        movieSliderById.style.transform = `translateX(calc((-${itemWidth} - 0.25rem) * ${currentSlider.currentSlide}))`;
        // Save state
        setSlidersState({ ...slidersState, currentSliderId: currentSlider });
    };
    const handleScrollRight = () => {
        if (!currentSlider.canScroll.right) return;
        const movieSliderById: HTMLDivElement | null = document.querySelector(
            '#' + currentSliderId + ' .movie-slider',
        );
        const itemWidth = getItemWidth(document.body.clientWidth);

        if (!movieSliderById || !currentSlider || !itemWidth) return;
        // Enable for scroll left
        currentSlider.canScroll.left = true;
        currentSlider.currentSlide += 1;
        if (
            currentSlider.totalSlide !== 0 &&
            currentSlider.currentSlide >= currentSlider.totalItem + 1
        ) {
            // is end of slider and now back to first slide
            let id = setTimeout(() => {
                currentSlider.currentSlide = 1;
                movieSliderById.style.transition = 'none';
                movieSliderById.style.transform = `translateX(calc((-${itemWidth} - 0.25rem) * ${currentSlider.currentSlide}))`;
                setSlidersState({
                    ...slidersState,
                    currentSliderId: currentSlider,
                });
                clearTimeout(id);
            }, 150);
        }
        movieSliderById.style.transition = 'transform 150ms';
        movieSliderById.style.transform = `translateX(calc((-${itemWidth} - 0.25rem) * ${currentSlider.currentSlide}))`;
        // Save state
        setSlidersState({ ...slidersState, currentSliderId: currentSlider });
    };
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.value === currentSliderId) return;
        setCurrentSliderId(event.currentTarget.value);
        const nextSlider: TypeSlider = slidersState[event.currentTarget.value];
        const movieSliderById: HTMLDivElement | null = document.querySelector(
            '#' + currentSliderId + ' .movie-slider',
        );
        const itemWidth = getItemWidth(document.body.clientWidth);
        if (!movieSliderById || !itemWidth || !nextSlider) return;
        movieSliderById.style.transition = 'none';
        movieSliderById.style.transform = `translateX(calc((-${itemWidth} - 0.25rem) * ${nextSlider.currentSlide}))`;
    };
    return (
        <div
            id={currentSliderId}
            className="w-full h-auto mb-6 max-w-[1700px] mx-auto"
            onMouseEnter={toggleHoverSlider(true)}
            onMouseLeave={toggleHoverSlider(false)}
        >
            <div className="mx-5 lg:mx-10 mb-4">
                <div
                    className={clsx(
                        'flex flex-row w-full text-[#ef4444] dark:text-red-netflix font-MP_Bold border-2 border-[#ef4444] dark:border-red-netflix rounded-sm',
                        {},
                    )}
                >
                    {sliderIdList.current.map((id, index) => {
                        return (
                            <button
                                disabled={id === currentSliderId}
                                key={id}
                                onClick={handleChangePage}
                                className={clsx(
                                    'basis-1/2 py-2 border-l-inherit border-l-2 max-[480px]:text-[12px]',
                                    {
                                        'dark:bg-red-netflix bg-[#ef4444] text-[#FFECD7] dark:text-white':
                                            id === currentSliderId,
                                        '!border-l-0': index === 0,
                                    },
                                )}
                                value={id}
                            >
                                <span className="uppercase">
                                    {text(
                                        slidersState[id].title.text,
                                        slidersState[id].title.subText,
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
            {currentSlider.totalItem > 0 && (
                <div
                    onTouchStart={(e) => {
                        slidingPosition.current = e.touches[0].clientX;
                    }}
                    onTouchMove={(e) => {
                        if (!slidingPosition.current) return;
                        const minWidthSlideThreshold = 50; // 50px
                        const slideSpacing =
                            e.changedTouches[0].clientX -
                            slidingPosition.current;
                        if (slideSpacing >= minWidthSlideThreshold) {
                            slidingPosition.current = null;
                            handleScrollLeft();
                            return;
                        }
                        if (slideSpacing <= -minWidthSlideThreshold) {
                            slidingPosition.current = null;
                            handleScrollRight();
                            return;
                        }
                    }}
                    className="movie-card mb-4 w-full overflow-hidden px-10 lg:px-20 relative"
                >
                    <div
                        className={clsx(
                            'movie-slider flex flex-nowrap gap-1 transition-transform w-full',
                        )}
                    >
                        {
                            <MovieSliderContainer
                                movieItemList={currentSlider.movieList}
                            />
                        }
                    </div>

                    <div
                        onClick={handleScrollLeft}
                        className={clsx(
                            'bg-[#1a1a1a98] text-white cursor-pointer absolute top-0 left-0 px-[0.625rem] md:px-[0.35rem] min-[480px]:px-[0.5rem] lg:px-[1.5rem] rounded-r-sm h-full inline-flex items-center text-2xl',
                            'opacity-0',
                            {
                                '!opacity-100':
                                    currentSlider.canScroll.left && hoverSlider,
                            },
                        )}
                    >
                        <BsChevronLeft />
                    </div>
                    <div
                        onClick={handleScrollRight}
                        className={clsx(
                            'bg-[#1a1a1a98] text-white cursor-pointer absolute top-0 right-0 px-[0.625rem] md:px-[0.35rem] min-[480px]:px-[0.5rem] lg:px-[1.5rem] rounded-l-sm h-full inline-flex items-center text-2xl',
                            'opacity-0',
                            {
                                '!opacity-100':
                                    currentSlider.canScroll.right &&
                                    hoverSlider,
                            },
                        )}
                    >
                        <BsChevronRight />
                    </div>
                </div>
            )}
        </div>
    );
};

interface MovieSliderContainerProps {
    movieItemList: MovieItem[];
}
const MovieSliderContainer: React.FC<MovieSliderContainerProps> = memo(
    ({ movieItemList }) => {
        return (
            <>
                {[1, 2, 3].map((loopSliderId) => {
                    if (loopSliderId !== 3)
                        return movieItemList.map((movieApi, index) => {
                            return (
                                <SlideItem
                                    movieApi={movieApi}
                                    key={index}
                                    id={index}
                                />
                            );
                        });
                    return movieItemList.slice(0, 2).map((movieApi, index) => {
                        return (
                            <SlideItem
                                movieApi={movieApi}
                                key={index}
                                id={index}
                            />
                        );
                    });
                })}
            </>
        );
    },
);

export default MovieSlider;
