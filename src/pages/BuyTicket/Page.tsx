import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import useGlobalSetting from '@/hooks/useGlobalSetting';
import { Button } from '@mui/material';
import BuyTicketApi from '@/test/API/BuyTicketApi.json';
import { Link } from 'react-router-dom';
import useLanguage from '@/hooks/useLanguage';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { IoEarth } from 'react-icons/io5';
import { BiMoviePlay } from 'react-icons/bi';
import ChooseCinema from '@/components/Common/ChooseCinema';
export interface PageProps {
    title?: string;
}

interface BuyTicketPageProps extends PageProps {}
const BuyTicketPage: React.FC<BuyTicketPageProps> = ({
    title = 'Mua vé - HIU Cinemas',
}) => {
    document.title = title; // Set Title
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    const text = useLanguage();
    const [setting] = useGlobalSetting();
    const MovieDayOfWeek =
        BuyTicketApi.movie_dayofweek[
            setting?.language as keyof typeof BuyTicketApi.movie_dayofweek
        ] || {};
    const [dayState, setDayState] = useState(MovieDayOfWeek[0] || {});
    const handleChangeDayState = (movie: any) => {
        setDayState(movie);
    };
    return (
        <div className="max-w-[1700px] mx-auto w-full pt-6">
            <div className="border-2 w-max rounded my-6 mx-auto">
                <ChooseCinema autoHide={true} autoHideLocation={false} />
            </div>
            <div className="flex px-10 border-b-[1px] border-[#3b3b3b] py-1">
                <div className="mx-auto font-MP_Medium inline-flex gap-x-8 gap-y-4 flex-wrap">
                    {MovieDayOfWeek.map((movie, index) => {
                        return (
                            <Button
                                key={index}
                                variant="text"
                                className={clsx(
                                    'cursor-pointer lg:!text-[1.3rem] md:!text-base !font-semibold !font-MP_Medium !leading-none',
                                    {
                                        '!text-[#8165ff]':
                                            dayState.id === movie.id,
                                        '!text-[#535353] dark:!text-white':
                                            dayState.id !== movie.id,
                                    },
                                )}
                                onClick={() => {
                                    handleChangeDayState(movie);
                                }}
                            >
                                <span className="lg:text-[2.5rem] text-2xl">
                                    {(movie as any).date.date}
                                </span>
                                {`/${(movie as any).date.month} - ${
                                    (movie as any).date.day
                                }`}
                            </Button>
                        );
                    })}
                </div>
            </div>
            <div className="lg:m-10 m-5">
                {dayState.movies.map((movie, index) => {
                    return (
                        <div
                            key={index}
                            className="w-full h-auto flex gap-4 max-md:flex-col items-center border-b-[1px] border-[#3b3b3b] py-4"
                        >
                            <span className="w-[380px]">
                                <img
                                    src={movie.posterSrc}
                                    alt={movie.movieTitle}
                                    className="h-auto w-auto rounded object-contain"
                                />
                            </span>
                            <div className="p-4 w-full">
                                {/* title */}
                                <h1 className="uppercase font-MP_Bold leading-[1.2] lg:text-[2rem] md:text-3xl text-2xl text-[#535353] dark:text-white">
                                    {movie.movieTitle}
                                </h1>
                                {/* detail */}
                                <div className="flex gap-5 items-center my-3 dark:text-white text-[#3b3b3b]">
                                    <span className="font-MP_Medium text-base flex-col inline-flex items-center">
                                        <IoEarth className="text-xl" />
                                        {false || text('not_update')}
                                    </span>
                                    <span className="font-MP_Medium text-base flex-col inline-flex items-center">
                                        <AiOutlineClockCircle className="text-xl" />
                                        {false || text('not_update')}
                                    </span>
                                    <span className="font-MP_Medium text-base flex-col inline-flex items-center">
                                        <BiMoviePlay className="text-xl" />
                                        {false || text('not_update')}
                                    </span>
                                </div>
                                {/* type */}
                                <div className="my-3 !text-[#000] dark:!text-white flex flex-wrap-reverse gap-x-3 gap-y-1 lg:w-4/6 w-full">
                                    {movie.movieType.map((name, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                to={''}
                                                className="font-MP_Medium text-sm px-3 py-1 border-[1px] dark:border-[#fff] border-[#111] rounded-full dark:hover:bg-[#ffffff17] hover:bg-[#00000015]"
                                            >
                                                {text('movie_type', name)}
                                            </Link>
                                        );
                                    })}
                                </div>
                                {/* schedule */}
                                <div className="flex gap-4 w-full mt-8 flex-wrap">
                                    {!setting?.cinemaLocation && (
                                        <h2 className="font-MP_Medium text-[#3b3b3b] dark:text-white">
                                            Hãy chọn rạp để xem lịch chiếu
                                        </h2>
                                    )}
                                    {setting?.cinemaLocation &&
                                        movie.schedule.map((time) => {
                                            return (
                                                <Link
                                                    to={`./${time.id}`}
                                                    key={time.id}
                                                    className="py-1 px-4 text-white rounded-md !font-MP_Medium !leading-tight dark:!bg-red-netflix !bg-red-500"
                                                >
                                                    {time.time}
                                                </Link>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BuyTicketPage;
