import { CircularProgress, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MovieItem } from '../Movie/MovieSlider';
import { Link } from 'react-router-dom';
import { HiMiniTicket } from 'react-icons/hi2';
import { IoInformationCircle, IoPlayCircle } from 'react-icons/io5';
import useLanguage from '@/hooks/useLanguage';
import MovieSliderApi from '@/test/API/MovieSliderApi.json';
export type AdvertisementProps = {
    open: boolean;
    handleCloseAd?: React.MouseEventHandler;
    handleSetMovieDisplay: React.Dispatch<
        React.SetStateAction<MovieItem | undefined>
    >;
};

interface HomeAdProps extends AdvertisementProps {}
const HomeAd: React.FC<HomeAdProps> = ({
    handleCloseAd,
    open,
    handleSetMovieDisplay,
}) => {
    const text = useLanguage();
    const exploreAll_Text = text('explore_all');
    const buyTicket_Text = text('buy_ticket');
    const watchTrailer_Text = text('watch_trailer') || text('unblock_trailer');
    const [adDetails, setAdDetails] = useState<MovieItem | null>(null);
    const adContentRef = useRef<HTMLDivElement>(null);
    const [adTimeLeft, setAdTimeLeft] = useState<number>(6);
    useEffect(() => {
        const id = setInterval(() => {
            if (adTimeLeft === 0) return;
            setAdTimeLeft(adTimeLeft - 1);
        }, 1000);
        return () => {
            clearInterval(id);
        };
    }, [adTimeLeft]);
    function randomIntFromInterval(min: number, max: number) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    useEffect(() => {
        const id = setTimeout(() => {
            const movieList = MovieSliderApi.currentShowing.movieList;
            const randomMovieToAd: MovieItem =
                movieList[randomIntFromInterval(0, movieList.length - 1)];
            setAdDetails(randomMovieToAd);
            clearTimeout(id);
        }, 2000);
        return () => {
            clearTimeout(id);
        };
    }, []);
    useEffect(() => {
        if (!open) {
            document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }, [open]);
    const handleOpenAd = (e: React.MouseEvent) => {
        if (!handleCloseAd || !adDetails) return;
        handleSetMovieDisplay(adDetails);
        handleCloseAd(e);
    };
    const handleClose = (byPass: boolean) => (e: React.MouseEvent) => {
        if (!adContentRef.current || !handleCloseAd) return;
        if (adTimeLeft !== 0) return;
        if (
            (e.target as Element).contains(adContentRef.current) ||
            byPass === true
        ) {
            handleCloseAd(e);
        }
    };
    return (
        open && (
            <div
                onClick={handleClose(false)}
                className="fixed top-0 z-50 w-screen h-screen bg-[#141414fa] flex justify-center items-center"
            >
                <div
                    ref={adContentRef}
                    className="min-[480px]:w-auto min-w-[300px] min-[480px]:h-auto w-full h-full dark:bg-[#000] bg-[#fff] p-4 inline-flex flex-col rounded-sm"
                >
                    <div className="w-full mb-2 max-w-[480px]:absolute">
                        <IconButton
                            onClick={handleClose(true)}
                            className="dark:!text-white hover:!bg-[#ffffff21]"
                            size="medium"
                        >
                            {adTimeLeft === 0 ? (
                                <IoMdClose />
                            ) : (
                                <span className="text-sm">{adTimeLeft}</span>
                            )}
                        </IconButton>
                    </div>
                    {adDetails ? (
                        <div className="mb-2 w-full min-[480px]:h-auto h-full flex flex-col items-center">
                            <img
                                onClick={handleOpenAd}
                                src={adDetails.posterSrc}
                                alt={adDetails.movieTitle}
                                className="w-full h-auto object-contain rounded-md mb-2 max-w-[400px]"
                            />
                            <span className="flex w-auto justify-between font-MP_Regular gap-2 flex-wrap">
                                <Link
                                    to={adDetails.buyTicketSrc || ''}
                                    className="inline-flex items-center max-[480px]:text-lg capitalize px-3 p-1 bg-red-netflix rounded-md text-[#fff] hover:opacity-90"
                                >
                                    <HiMiniTicket className="text-3xl" />
                                    <span className="px-1">
                                        {buyTicket_Text}
                                    </span>
                                </Link>
                                <button
                                    onClick={handleOpenAd}
                                    className="inline-flex items-center max-[480px]:text-lg capitalize px-3 p-1 text-[#fff] dark:bg-white bg-[#141414] hover:opacity-90"
                                >
                                    <IoPlayCircle className="text-3xl" />
                                    <span className="px-1">
                                        {watchTrailer_Text}
                                    </span>
                                </button>
                                <Link
                                    to={adDetails.detailMovieSrc || ''}
                                    className="font-MP_Regular inline-flex items-center max-[480px]:text-lg capitalize px-3 p-1 dark:text-[#fff] hover:opacity-90 dark:border-[#fff] border-[#000] border-[1px]"
                                >
                                    <IoInformationCircle className="text-3xl" />
                                    <span className="px-1">
                                        {exploreAll_Text}
                                    </span>
                                </Link>
                            </span>
                        </div>
                    ) : (
                        <div className="mb-2 w-full min-[380px]:h-auto h-full flex justify-center !my-[100px]">
                            <CircularProgress />
                        </div>
                    )}
                </div>
            </div>
        )
    );
};

export default HomeAd;
