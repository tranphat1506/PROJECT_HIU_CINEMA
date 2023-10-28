import { useState, useEffect, memo } from 'react';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import SlideshowApi from '@/test/API/SlideshowApi.json';
import { Skeleton } from '@mui/material';
type SlideShowItem = {
    currentSlide: number;
    totalSlide: number;
    slideItems: any[];
} | null;
const Slideshow = () => {
    const [slideState, setSlideState] = useState<SlideShowItem>(null);
    // fake fetch api
    useEffect(() => {
        const fakeFetchApi = setTimeout(() => {
            const slideItems = SlideshowApi.items;
            setSlideState({
                currentSlide: 0,
                totalSlide: slideItems.length,
                slideItems: slideItems,
            });
            clearTimeout(fakeFetchApi);
        }, 2000);
        return () => {
            clearTimeout(fakeFetchApi);
        };
    }, []);
    // Auto slide
    useEffect(() => {
        if (!slideState) return;
        const autoSlide = setInterval(() => {
            return handleSlideRight();
        }, 5000);
        return () => {
            clearInterval(autoSlide);
        };
    }, [slideState]);
    const handleSlideRight = () => {
        const slideshowEl: HTMLDivElement | null =
            document.querySelector('#slideshow');
        if (!slideshowEl || !slideState) return;
        slideState.currentSlide += 1;
        if (slideState.currentSlide === slideState.totalSlide) {
            slideState.currentSlide = 0;
        }

        slideshowEl.style.transform = `translateX(calc(-${
            100 / slideState.totalSlide
        }% * ${slideState.currentSlide}))`;
        setSlideState(slideState);
    };
    const handleSlideLeft = () => {
        const slideshowEl: HTMLDivElement | null =
            document.querySelector('#slideshow');
        console.log(slideState);
        if (!slideshowEl || !slideState) return;

        slideState.currentSlide -= 1;
        if (slideState.currentSlide === -1) {
            slideState.currentSlide = slideState.totalSlide - 1;
        }
        slideshowEl.style.transform = `translateX(calc(-${
            100 / slideState.totalSlide
        }% * ${slideState.currentSlide}))`;
        setSlideState(slideState);
    };
    if (!slideState) {
        return (
            <div className="w-full h-auto bg-[#ffffffbe] dark:bg-[#ffffff0e]">
                <div className="w-auto h-auto relative md:mb-7 mb-4 max-w-[1700px] mx-auto overflow-hidden">
                    <div
                        id="slideshow"
                        className="w-full h-[200px] md:h-[300px] lg:h-[35vmax] flex transition-all duration-300"
                    >
                        <Skeleton
                            width={'100%'}
                            height={'100%'}
                            variant="rectangular"
                            animation="wave"
                        />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="w-full h-auto bg-[#ffffffbe] dark:bg-[#181818]">
            <div className="w-auto h-auto relative md:mb-7 mb-4 max-w-[1700px] mx-auto overflow-hidden">
                <div
                    id="slideshow"
                    className="w-max h-[200px] md:h-[300px] lg:h-[35vmax] flex transition-all duration-300"
                >
                    {slideState?.slideItems.map((item, index) => {
                        return (
                            <Link
                                to={item.to}
                                key={index}
                                state={item.link_state}
                            >
                                <img
                                    src={item.poster_url}
                                    alt={`Slide item id ${index}`}
                                    className="w-screen max-w-[1700px] h-full object-contain max-sm:!scale-100"
                                    style={{
                                        transform: `scale(${
                                            item.poster_scale || 1
                                        })`,
                                        objectFit: item.poster_fit.fit || '',
                                        objectPosition:
                                            item.poster_fit.position || '',
                                    }}
                                />
                            </Link>
                        );
                    })}
                </div>
                <div
                    onClick={handleSlideLeft}
                    className="absolute cursor-pointer top-0 left-0 md:text-4xl text-2xl font-black h-full flex items-center md:px-4 px-2 bg-[#00000032]"
                >
                    <span className="left">
                        <FaCircleChevronLeft className="text-white" />
                    </span>
                </div>
                <div
                    onClick={handleSlideRight}
                    className="absolute cursor-pointer top-0 right-0 md:text-4xl text-2xl font-black h-full flex items-center md:px-4 px-2 bg-[#00000032]"
                >
                    <span className="right">
                        <FaCircleChevronRight className="text-white" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default memo(Slideshow);
