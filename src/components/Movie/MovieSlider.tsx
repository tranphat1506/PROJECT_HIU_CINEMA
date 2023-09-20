import { Skeleton } from '@mui/material';
import clsx from 'clsx';
import { memo, useEffect, useRef, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import MovieSliderApi from '@/test/API/MovieSliderApi.json';
import useLanguage from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
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
    title: string;
    movieList: MovieItem[];
    totalItem: number;
    totalSlide: number;
    currentSlide: number;
    canScroll: {
        left: boolean;
        right: boolean;
    };
};
type MovieItem = {
    src: string;
};
export const MovieSliderSkeleton = () => {
    return (
        <div className="w-full h-auto mb-6">
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
interface MovieSliderProps {
    path?: string;
}
const MovieSlider: React.FC<MovieSliderProps> = ({ path }) => {
    const text = useLanguage();
    const [sliderApi, setSliderApi] = useState<TypeSlider | null>(null);
    const [hoverSlider, setHoverSlider] = useState(false);
    const slidingPosition = useRef<number | null>(null);
    const toggleHoverSlider = (state: boolean) => () => {
        setHoverSlider(state);
    };
    console.log('re render movie slider');
    useEffect(() => {
        const fakeFetchId = setTimeout(() => {
            const fakeApi =
                MovieSliderApi[
                    path?.split('/')[1] as keyof typeof MovieSliderApi
                ];
            if (!fakeApi) return;
            const completeFakeApi: TypeSlider = {
                ...fakeApi,
                canScroll: { left: false, right: true },
                totalItem: fakeApi.movieList.length,
                totalSlide: splitTotalSlide(
                    document.body.clientWidth,
                    fakeApi.movieList.length * 3,
                ),
                currentSlide: 0,
            };
            setSliderApi(completeFakeApi);
        }, 2000);

        return () => {
            clearTimeout(fakeFetchId);
        };
    }, []);
    // wait for fetching Movie Slider
    if (!sliderApi) return <MovieSliderSkeleton />;

    // Scroll event movieCard
    const handleScrollLeft = (id: string) => () => {
        if (!sliderApi.canScroll.left) return;
        const movieSliderById: HTMLDivElement | null = document.querySelector(
            '#' + id + ' .movie-slider',
        );
        const itemWidth = getItemWidth(document.body.clientWidth);
        if (!movieSliderById || !sliderApi || !itemWidth) return;
        sliderApi.currentSlide -= 1;
        if (sliderApi.totalSlide !== 0 && sliderApi.currentSlide == 0) {
            // is start of slider and now back to end of slide 0
            let id = setTimeout(() => {
                sliderApi.currentSlide = sliderApi.totalItem;
                movieSliderById.style.transition = 'none';
                movieSliderById.style.transform = `translateX(calc((-${itemWidth} - 0.25rem) * ${sliderApi.currentSlide}))`;
                setSliderApi(sliderApi);
                clearTimeout(id);
            }, 150);
        }
        movieSliderById.style.transition = 'transform 150ms';
        movieSliderById.style.transform = `translateX(calc((-${itemWidth} - 0.25rem) * ${sliderApi.currentSlide}))`;
        // Save state
        setSliderApi(sliderApi);
    };
    const handleScrollRight = (id: string) => () => {
        if (!sliderApi.canScroll.right) return;
        const movieSliderById: HTMLDivElement | null = document.querySelector(
            '#' + id + ' .movie-slider',
        );
        const itemWidth = getItemWidth(document.body.clientWidth);

        if (!movieSliderById || !sliderApi || !itemWidth) return;
        // Enable for scroll left
        sliderApi.canScroll.left = true;
        sliderApi.currentSlide += 1;
        if (
            sliderApi.totalSlide !== 0 &&
            sliderApi.currentSlide >= sliderApi.totalItem + 1
        ) {
            // is end of slider and now back to first slide
            let id = setTimeout(() => {
                sliderApi.currentSlide = 1;
                movieSliderById.style.transition = 'none';
                movieSliderById.style.transform = `translateX(calc((-${itemWidth} - 0.25rem) * ${sliderApi.currentSlide}))`;
                setSliderApi(sliderApi);
                clearTimeout(id);
            }, 150);
        }
        movieSliderById.style.transition = 'transform 150ms';
        movieSliderById.style.transform = `translateX(calc((-${itemWidth} - 0.25rem) * ${sliderApi.currentSlide}))`;
        // Save state
        setSliderApi(sliderApi);
    };
    return (
        <div
            id={sliderApi.id}
            className="w-full h-auto mb-6"
            onMouseEnter={toggleHoverSlider(true)}
            onMouseLeave={toggleHoverSlider(false)}
        >
            <Link
                to={sliderApi.to}
                className="cursor-pointer capitalize text-xl dark:text-white mb-2 inline-flex items-end mx-5 lg:mx-10"
            >
                {sliderApi.title}
                <span
                    className={clsx(
                        'text-sm inline-flex items-center w-0 invisible ml-2 text-ellipsis overflow-hidden whitespace-nowrap',
                        {
                            '!w-[100px] !visible': hoverSlider,
                        },
                    )}
                    style={{ transition: 'width 500ms' }}
                >
                    {text('explore_all')}
                    <BsChevronRight />
                </span>

                {!hoverSlider && <BsChevronRight className="h-[1.5rem] ml-2" />}
            </Link>

            <div
                onTouchStart={(e) => {
                    slidingPosition.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                    if (!slidingPosition.current) return;
                    const minWidthSlideThreshold = 50; // 50px
                    const slideSpacing =
                        e.changedTouches[0].clientX - slidingPosition.current;
                    if (slideSpacing >= minWidthSlideThreshold) {
                        handleScrollLeft(sliderApi.id)();
                        return;
                    }
                    if (slideSpacing <= -minWidthSlideThreshold) {
                        handleScrollRight(sliderApi.id)();
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
                    <MovieSliderContainer movieItemList={sliderApi.movieList} />
                </div>

                <div
                    onClick={handleScrollLeft(sliderApi.id)}
                    className={clsx(
                        'bg-[#1a1a1aea] text-white cursor-pointer absolute top-0 left-0 px-[0.625rem] md:px-[0.35rem] min-[480px]:px-[0.5rem] lg:px-[1.5rem] rounded-r-sm h-full inline-flex items-center text-2xl',
                        'opacity-0',
                        {
                            '!opacity-100':
                                sliderApi.canScroll.left && hoverSlider,
                        },
                    )}
                >
                    <BsChevronLeft />
                </div>
                <div
                    onClick={handleScrollRight(sliderApi.id)}
                    className={clsx(
                        'bg-[#1A1A1AEA] text-white cursor-pointer absolute top-0 right-0 px-[0.625rem] md:px-[0.35rem] min-[480px]:px-[0.5rem] lg:px-[1.5rem] rounded-l-sm h-full inline-flex items-center text-2xl',
                        'opacity-0',
                        {
                            '!opacity-100':
                                sliderApi.canScroll.right && hoverSlider,
                        },
                    )}
                >
                    <BsChevronRight />
                </div>
            </div>
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
                    console.log('movie-item');
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
