import {
    CircularProgress,
    Dialog,
    DialogTitle,
    IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
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
    const handleOpenAd = (e: React.MouseEvent) => {
        if (!handleCloseAd || !adDetails) return;
        handleSetMovieDisplay(adDetails);
        handleCloseAd(e);
    };
    const handleClose = (byPass: boolean) => (e: React.MouseEvent) => {
        if (!handleCloseAd) return;
        if (adTimeLeft !== 0) return;
        if (byPass === true || !adTimeLeft) {
            handleCloseAd(e);
        }
    };
    const adTitle_Text = 'Giới thiệu bạn phim mới cập bến rạp nèeee';
    return (
        <Dialog
            open={open}
            onClose={handleClose(false)}
            PaperProps={{
                className:
                    'max-[480px]:!rounded-none max-[480px]:!m-0 max-[480px]:min-h-full !rounded-xl bg-white dark:bg-[#141414]',
            }}
        >
            <div className="m-4">
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
                    <DialogTitle
                        className="!font-MP_Bold max-[480px]:!my-7 !my-3 max-[480px]:!text-4xl max-[480px]:w-full w-5/6 !text-3xl max-md:text-md !py-0 mx-auto max-[480px]:!px-0 dark:text-white"
                        textTransform={'uppercase'}
                    >
                        {adTitle_Text}
                    </DialogTitle>
                </div>
                {adDetails ? (
                    <div className="mb-2 w-full min-[480px]:h-auto h-full flex flex-col items-center">
                        <img
                            onClick={handleOpenAd}
                            src={adDetails.posterSrc}
                            alt={adDetails.movieTitle}
                            className="w-auto h-auto object-contain rounded-md mb-2 max-h-[450px] cursor-pointer"
                        />
                        <span className="flex w-auto justify-between font-MP_Regular gap-2 flex-wrap">
                            <Link
                                to={adDetails.buyTicketSrc || ''}
                                className="max-md:rounded-md max-md:basis-full inline-flex items-center max-[480px]:text-lg capitalize px-3 p-1 bg-red-netflix rounded-full text-[#fff] hover:opacity-90"
                            >
                                <HiMiniTicket className="text-3xl" />
                                <span className="px-1">{buyTicket_Text}</span>
                            </Link>
                            <Link
                                to={adDetails.detailMovieSrc || ''}
                                className="max-md:rounded-md max-md:basis-full font-MP_Regular inline-flex items-center max-[480px]:text-lg capitalize px-3 p-1 dark:text-[#fff] hover:opacity-90 dark:border-[#fff] border-[#000] border-[1px]"
                            >
                                <IoInformationCircle className="text-3xl" />
                                <span className="px-1">{exploreAll_Text}</span>
                            </Link>
                            <button
                                onClick={handleOpenAd}
                                className="max-md:rounded-md max-md:basis-full inline-flex items-center max-[480px]:text-lg capitalize px-3 p-1 text-[#fff] dark:bg-white dark:text-[#141414] rounded-md bg-[#9a9a9a] hover:opacity-90"
                            >
                                <IoPlayCircle className="text-3xl" />
                                <span className="px-1">
                                    {watchTrailer_Text}
                                </span>
                            </button>
                        </span>
                    </div>
                ) : (
                    <div className="mb-2 w-full min-[380px]:h-auto h-full flex justify-center !my-[100px]">
                        <CircularProgress />
                    </div>
                )}
            </div>
        </Dialog>
    );
};

export default HomeAd;
