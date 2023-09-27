import { Skeleton } from '@mui/material';
import clsx from 'clsx';
import { memo, useEffect } from 'react';
import { MovieItem } from './MovieSlider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMiniTicket } from 'react-icons/hi2';
import { IoPlayCircle } from 'react-icons/io5';
import useLanguage from '@/hooks/useLanguage';

interface SlideItemProps {
    id?: string | number;
    movieApi?: MovieItem;
}
const MOVIE_TRAILER_PATH = '/movie';
const SlideItem: React.FC<SlideItemProps> = ({ id, movieApi }) => {
    const text = useLanguage();
    const exploreAll_Text = text('explore_all');
    const buyTicket_Text = text('buy_ticket');
    const watchTrailer_Text = text('watch_trailer') || text('unblock_trailer');
    const navigate = useNavigate();
    const route = useLocation();
    useEffect(() => {
        if (id === 0 && document.location.pathname === MOVIE_TRAILER_PATH) {
            // check if not in movie trailer endpoint
            if (route.state?.movieItem) return; // check if route state already have movie to show so skip
            navigate(MOVIE_TRAILER_PATH, { state: { movieItem: movieApi } });
        }
    }, []);
    return (
        <span
            className={clsx(
                'block text-white dark:bg-[#ffffff0e] bg-[#ffffff91] rounded-sm relative',
                'min-h-[50%]', // height
                'min-[480px]:min-w-[33.333%] min-w-full', // width
            )}
        >
            {movieApi ? (
                <>
                    <img
                        src={movieApi.posterSrc}
                        draggable={false}
                        className="object-cover object-center w-full h-full rounded-sm"
                        onError={(e) => {
                            e.currentTarget.remove();
                        }}
                    />
                    <div className="absolute top-0 flex flex-col w-full h-full justify-end text-white md:text-xl text-xs max-[480px]:text-xl opacity-0 hover:opacity-100 transition-opacity duration-300 gap-4 bg-[#00000065]">
                        <Link
                            to={movieApi.buyTicketSrc}
                            className="cursor-pointer mx-auto lg:w-4/6 md:px-4 px-2 md:py-[6px] py-[2px] max-[480px]:py-[6px] max-[480px]:px-4 rounded-md bg-red-500 dark:bg-red-netflix hover:text-red-500 hover:dark:text-red-netflix hover:!bg-white active:!bg-red-500 active:dark:!bg-red-netflix active:!text-white flex justify-center items-center gap-2"
                        >
                            <HiMiniTicket className="text-2xl" />
                            <span>{buyTicket_Text}</span>
                        </Link>
                        <Link
                            to={'/movie'}
                            state={{ movieItem: movieApi }}
                            className="cursor-pointer mx-auto lg:w-4/6 md:px-4 px-2 md:py-[6px] max-[480px]:py-[6px] max-[480px]:px-4 py-[2px] border-[1px] flex justify-center items-center gap-2 hover:bg-[#0000005e] active:bg-[#00000072]"
                        >
                            <IoPlayCircle className="text-2xl" />
                            <span>{watchTrailer_Text}</span>
                        </Link>
                        <Link
                            to={movieApi.detailMovieSrc}
                            className="cursor-pointer font-MP_Regular md:px-4 px-2 mx-auto md:text-base text-xs max-[480px]:text-base hover:underline flex justify-center items-center gap-2 mb-4"
                        >
                            <span>{exploreAll_Text}</span>
                        </Link>
                    </div>
                </>
            ) : (
                <Skeleton
                    variant="rectangular"
                    width={'100%'}
                    height={'20vh'}
                    className="rounded-sm"
                    animation="wave"
                />
            )}
        </span>
    );
};

export default memo(SlideItem);
