import { Skeleton } from '@mui/material';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
    BsFillCaretLeftFill,
    BsFillCaretRightFill,
    BsChevronLeft,
    BsChevronRight,
} from 'react-icons/bs';
import MovieSliderApi from '@/test/API/MovieSliderApi.json';
import useLanguage from '@/hooks/useLanguage';
const getItemWidth = (deviceWidth: number): string => {
    if (deviceWidth < 480) return '100%';
    if (deviceWidth < 768) return '50%';
    if (deviceWidth < 1024) return '33.333%';
    return '25%';
};

const splitTotalSlide = (deviceWidth: number, totalItem: number): number => {
    if (deviceWidth < 480) return totalItem;
    if (deviceWidth < 768) return totalItem - 1;
    if (deviceWidth < 1024) return totalItem - 2;
    if (totalItem <= 4) return 1;
    return totalItem - 3;
};

export type TypeSlider = {
    id: string;
    title: string;
    movieList: any[];
    totalItem: number;
    totalSlide: number;
    currentSlide: number;
    canScroll: {
        left: boolean;
        right: boolean;
    };
};

export const MovieSliderSkeleton = () => {
    return (
        <div className="w-full h-auto mb-6">
            <div className="title text-base dark:text-white mb-2 inline-block mx-5 lg:mx-10 dark:bg-[#ffffff0e] bg-[#ffffff91]">
                <Skeleton
                    variant="rectangular"
                    width={'150px'}
                    height={'1.5rem'}
                />
            </div>
            <div className="movie-card mb-4 w-full overflow-hidden px-10 lg:px-20 relative">
                <div
                    className={clsx(
                        'movie-slider flex flex-nowrap gap-1 transition-transform w-full',
                        '-translate-x-[100%] min-[480px]:-translate-x-[50%] md:-translate-x-[33.333%] lg:-translate-x-[25%]',
                    )}
                >
                    {['', '', '', '', '', ''].map((_, index) => {
                        return (
                            <span
                                key={index}
                                className={clsx(
                                    'block text-white dark:bg-[#ffffff0e] bg-[#ffffff91] rounded-sm',
                                    'lg:h-[15vw] md:h-[20vw] sm:h-[25vw] min-[480px]:h-[30vw] h-[40vw]', // height
                                    'lg:min-w-[25%] md:min-w-[33.333%] min-[480px]:min-w-[50%] min-w-full', // width
                                )}
                            >
                                <Skeleton
                                    variant="rectangular"
                                    width={'100%'}
                                    height={'100%'}
                                    className="rounded-sm"
                                    animation="pulse"
                                />
                            </span>
                        );
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
    const toggleHoverSlider = (state: boolean) => () => {
        setHoverSlider(state);
    };
    useEffect(() => {
        const fakeFetchId = setTimeout(() => {
            const fakeApi =
                MovieSliderApi[
                    path?.split('/')[1] as keyof typeof MovieSliderApi
                ];
            if (!fakeApi) return;
            const completeFakeApi: TypeSlider = {
                ...fakeApi,
                canScroll: { left: true, right: true },
                totalItem: fakeApi.movieList.length,
                totalSlide: splitTotalSlide(
                    document.body.clientWidth,
                    fakeApi.movieList.length,
                ),
                currentSlide: 0,
            };
            setSliderApi(completeFakeApi);
        }, 5000);

        return () => {
            clearTimeout(fakeFetchId);
        };
    }, []);
    if (!sliderApi) return <MovieSliderSkeleton />;
    // Scroll event movieCard
    const handleScrollLeft = (id: string) => () => {
        const movieSliderById: HTMLDivElement | null = document.querySelector(
            '#' + id + ' .movie-slider',
        );
        const itemWidth = getItemWidth(document.body.clientWidth);
        if (!movieSliderById || !sliderApi || !itemWidth) return;
        if (sliderApi.totalSlide !== 0 && sliderApi.currentSlide <= 0) {
            // is start of slider and now back to end of slide 0
            sliderApi.currentSlide = sliderApi.totalSlide - 1;
        } else {
            sliderApi.currentSlide -= 1;
        }
        movieSliderById.style.transform = `translateX(calc((-${itemWidth} - 0.25rem) * ${sliderApi.currentSlide}))`;
        // // Check if can scroll to the left
        // if (sliderApi.currentSlide !== 0) sliderApi.canScroll.left = true;
        // else sliderApi.canScroll.left = false;
        // Save state
        setSliderApi(sliderApi);
    };

    const handleScrollRight = (id: string) => () => {
        const movieSliderById: HTMLDivElement | null = document.querySelector(
            '#' + id + ' .movie-slider',
        );
        const itemWidth = getItemWidth(document.body.clientWidth);

        if (!movieSliderById || !sliderApi || !itemWidth) return;
        if (
            sliderApi.totalSlide !== 0 &&
            sliderApi.currentSlide >= sliderApi.totalSlide - 1
        ) {
            // is end of slider and now back to slide 0
            sliderApi.currentSlide = 0;
        } else {
            sliderApi.currentSlide += 1;
        }
        movieSliderById.style.transform = `translateX(calc((-${itemWidth} - 0.25rem) * ${sliderApi.currentSlide}))`;

        // // Check if can scroll to the left
        // if (slider.currentSlide !== 0) slider.canScroll.left = true;
        // else slider.canScroll.left = false;

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
            <div className="cursor-pointer capitalize text-base dark:text-white mb-2 inline-flex items-end mx-5 lg:mx-10">
                {sliderApi.title}

                <span
                    className={clsx(
                        'text-xs inline-flex items-center w-0 invisible ml-2 text-ellipsis overflow-hidden whitespace-nowrap',
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
            </div>
            <div className="movie-card mb-4 w-full overflow-hidden px-10 lg:px-20 relative">
                <div
                    className={clsx(
                        'movie-slider flex flex-nowrap gap-1 transition-transform w-full',
                    )}
                >
                    {sliderApi.movieList.map((movieApi, index) => {
                        return (
                            <span
                                onClick={() => {
                                    console.log(index);
                                }}
                                key={index}
                                className={clsx(
                                    'block text-white dark:bg-[#ffffff0e] bg-[#ffffff91] rounded-sm cursor-pointer',
                                    'lg:h-[15vw] md:h-[20vw] sm:h-[25vw] min-[480px]:h-[30vw] h-[40vw]', // height
                                    'lg:min-w-[25%] md:min-w-[33.333%] min-[480px]:min-w-[50%] min-w-full', // width
                                )}
                            >
                                {movieApi.src ? (
                                    <img
                                        src={movieApi.src}
                                        className="object-cover object-center w-full h-full rounded-sm"
                                        onError={(e) => {
                                            e.currentTarget.remove();
                                        }}
                                    />
                                ) : (
                                    <Skeleton
                                        variant="rectangular"
                                        width={'100%'}
                                        height={'100%'}
                                        className="rounded-sm"
                                        animation="pulse"
                                    />
                                )}
                            </span>
                        );
                    })}
                    {['', '', '', ''].map((_, index) => {
                        return (
                            <span
                                key={index}
                                className={clsx(
                                    'block text-white dark:bg-[#ffffff0e] bg-[#ffffff91] rounded-sm',
                                    'lg:h-[15vw] md:h-[20vw] sm:h-[25vw] min-[480px]:h-[30vw] h-[40vw]', // height
                                    'lg:min-w-[25%] md:min-w-[33.333%] min-[480px]:min-w-[50%] min-w-full', // width
                                )}
                            >
                                <Skeleton
                                    variant="rectangular"
                                    width={'100%'}
                                    height={'100%'}
                                    className="rounded-sm"
                                    animation="pulse"
                                />
                            </span>
                        );
                    })}
                </div>
                {hoverSlider && (
                    <>
                        <div
                            onClick={handleScrollLeft(sliderApi.id)}
                            className={clsx(
                                'bg-[#1a1a1aea] text-white cursor-pointer absolute top-0 left-0 px-[0.625rem] md:px-[0.35rem] min-[480px]:px-[0.5rem] lg:px-[1.5rem] rounded-r-sm h-full inline-flex items-center invisible text-2xl',
                                {
                                    '!visible': sliderApi.canScroll.left,
                                },
                            )}
                        >
                            <BsChevronLeft />
                        </div>
                        <div
                            onClick={handleScrollRight(sliderApi.id)}
                            className={clsx(
                                'bg-[#1A1A1AEA] text-white cursor-pointer absolute top-0 right-0 px-[0.625rem] md:px-[0.35rem] min-[480px]:px-[0.5rem] lg:px-[1.5rem] rounded-l-sm h-full inline-flex items-center invisible text-2xl',
                                {
                                    '!visible': sliderApi.canScroll.right,
                                },
                            )}
                        >
                            <BsChevronRight />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MovieSlider;
