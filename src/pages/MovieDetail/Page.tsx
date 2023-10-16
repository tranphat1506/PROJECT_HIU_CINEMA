import React, { useState, useEffect } from 'react';
import { PageProps } from '../Home/Page';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
    Breadcrumbs,
    Divider,
    IconButton,
    Rating,
    Stack,
    Typography,
} from '@mui/material';
import { RxDotFilled } from 'react-icons/rx';
import { AiOutlineClockCircle } from 'react-icons/ai';
import {
    BiDislike,
    BiLike,
    BiMoviePlay,
    BiPlayCircle,
    BiSolidDislike,
    BiSolidLike,
} from 'react-icons/bi';
import { IoEarth, IoPlayCircle } from 'react-icons/io5';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { HiMiniTicket } from 'react-icons/hi2';
import { PiDotBold } from 'react-icons/pi';
import useLanguage from '@/hooks/useLanguage';
import { FaAngleRight } from 'react-icons/fa6';
import { AvatarByString } from '@/components/Common/Avatar';
interface MovieDetailPageProps extends PageProps {}
const MovieDetailPage: React.FC<MovieDetailPageProps> = ({
    title = 'Phim - HIU Cinemas',
}) => {
    document.title = title; // Set Title
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    const route = useLocation();
    const { id } = useParams();
    const text = useLanguage();
    const exploreAll_Text = text('explore_all');
    const buyTicket_Text = text('buy_ticket');
    const watchTrailer_Text = text('watch_trailer') || text('unblock_trailer');
    return (
        <>
            <div
                id="movie-detail"
                className="w-full h-auto max-w-[1200px] mx-auto my-4"
            >
                <div className="sm:mx-10 mx-4 mt-4 flex justify-start flex-wrap !text-[#3b3b3b] dark:!text-white">
                    <div className="flex font-MP_Medium w-full justify-between items-center mx-6">
                        <h1 className="font-MP_Bold text-[2rem] h-fit uppercase max-w-[600px] leading-[1.2]">
                            Mười: Lời nguyền trở lại
                        </h1>
                        {/* Rating in header */}
                        <span className="my-2 gap-8 md:inline-flex hidden">
                            <span className="inline-flex flex-col items-center">
                                <div className="uppercase font-MP_Bold text-base dark:text-[#B8B8B8] text-[#3b3b3b] w-max">
                                    HCine Rating
                                </div>
                                <span className="inline-flex items-center gap-2 cursor-pointer dark:hover:bg-[#ffffff1e] hover:bg-[#7373731f] px-2 py-[1px] rounded">
                                    <BsStarFill className="text-[#ffce65] text-2xl" />
                                    <span className="flex flex-col">
                                        <span>
                                            <span className="text-xl font-MP_Bold">
                                                5.2
                                            </span>
                                            <span className="text-base dark:text-[#ffffffb2] text-[#6a6a6a]">
                                                /10
                                            </span>
                                        </span>
                                        <span className="leading-none text-base dark:text-[#ffffffb2] text-[#6a6a6a]">
                                            2k
                                        </span>
                                    </span>
                                </span>
                            </span>
                            <span className="inline-flex flex-col items-center">
                                <div className="uppercase font-MP_Bold text-base dark:text-[#ffffffb2] text-[#3b3b3b] w-max">
                                    Your Rating
                                </div>
                                <span className="inline-flex items-center gap-2 cursor-pointer dark:hover:bg-[#ffffff1e] hover:bg-[#7373731f] px-2 py-[1px] rounded h-full">
                                    {/* <BsStarFill className="text-[#8165ff] text-xl" />
                                    <span>
                                        <span className="text-xl font-MP_Bold">5.2</span>
                                        <span className="text-base dark:text-[#ffffffb2] text-[#6a6a6a]">
                                            /10
                                        </span>
                                    </span> */}
                                    <BsStar className="text-[#8165ff] text-2xl" />
                                    <span>
                                        <span className="text-xl text-[#8165ff]">
                                            Rate
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </div>
                    <div className="w-auto flex md:flex-nowrap flex-wrap gap-2 justify-center my-2">
                        {/* Image */}
                        <div className="h-fit w-auto inline-flex justify-center relative">
                            <img
                                src="/island/island-poster.jpg"
                                alt=""
                                className="max-sm:max-w-[230px] max-w-[340px] w-auto h-auto object-contain"
                            />
                            <div className="play-trailer absolute w-full h-full bg-[#00000084] top-0 justify-center items-center flex opacity-0 hover:opacity-100">
                                <IconButton className="!text-white">
                                    <BiPlayCircle className="text-[50px]" />
                                </IconButton>
                            </div>
                        </div>
                        {/* Detail */}
                        <div className="flex mx-6 flex-col font-MP_Medium w-full">
                            <div className="flex flex-row items-center gap-4">
                                <Link
                                    to={''}
                                    className="cursor-pointer md:px-4 px-2 md:py-[6px] py-[2px] max-[480px]:py-[6px] max-[480px]:px-4 rounded-md bg-red-500 dark:bg-red-netflix hover:text-red-500 hover:dark:text-red-netflix hover:!bg-white active:!bg-red-500 active:dark:!bg-red-netflix active:!text-white flex justify-center items-center gap-2"
                                >
                                    <HiMiniTicket className="text-3xl text-white" />
                                    <span className="text-xl text-white">
                                        {buyTicket_Text}
                                    </span>
                                </Link>
                                <Link
                                    to={'/movie'}
                                    // state={{ movieItem: movieApi }}
                                    className="cursor-pointer md:px-4 px-2 md:py-[6px] max-[480px]:py-[6px] max-[480px]:px-4 py-[2px] border-[1px] flex justify-center items-center gap-2 hover:bg-[#0000005e] active:bg-[#00000072] border-[#000] dark:border-white"
                                >
                                    <IoPlayCircle className="text-3xl" />
                                    <span className="text-xl">
                                        {watchTrailer_Text}
                                    </span>
                                </Link>
                            </div>
                            <span className="flex gap-5 items-center my-3">
                                <span className="font-MP_Medium text-base flex-col inline-flex items-center">
                                    <IoEarth className="text-xl" />
                                    Việt Nam
                                </span>
                                <span className="font-MP_Medium text-base flex-col inline-flex items-center">
                                    <AiOutlineClockCircle className="text-xl" />
                                    1h35m
                                </span>
                                <span className="font-MP_Medium text-base flex-col inline-flex items-center">
                                    <BiMoviePlay className="text-xl" />
                                    Không phụ đề
                                </span>
                            </span>
                            <span className="my-2 dark:bg-[#ffffff0c] bg-transparent border-2 rounded-sm border-dashed dark:border-red-netflix border-red-500 px-6 py-2 pt-4">
                                <span className="sm:line-clamp-2 line-clamp-4 rounded dark:text-[#cecece] text-[#1a1a1a]">
                                    Mười Chín Sang Hai Mươi - 19/20 là chương
                                    trình sẽ theo sau những người thuộc thế hệ Z
                                    khi họ tận hưởng tuần cuối cùng ở tuổi 19 và
                                    tuần đầu tiên ở tuổi 20 sau khi đón giao năm
                                    2023. Các thí sinh độc đáo sẽ kết thúc năm
                                    bằng việc dành thời gian với bạn bè và từ từ
                                    chuẩn bị cho tuổi trưởng thành.
                                </span>
                                <a
                                    href={'#movie-desc'}
                                    className="text-sm cursor-pointer float-right dark:text-[#fff] text-[#1a1a1a] underline"
                                >
                                    Xem thêm
                                </a>
                            </span>
                            {/* Rating */}
                            <span className="my-3 gap-8 md:hidden inline-flex">
                                <span className="inline-flex items-center gap-2 cursor-pointer dark:hover:bg-[#ffffff1e] hover:bg-[#7373731f] px-2 py-[1px] rounded">
                                    <BsStarFill className="text-[#ffce65] text-xl" />
                                    <span className="inline-flex flex-row items-center">
                                        <span>
                                            <span className="text-xl font-MP_Bold">
                                                5.2
                                            </span>
                                            <span className="text-base dark:text-[#ffffffb2] text-[#6a6a6a]">
                                                /10
                                            </span>
                                        </span>
                                        <span className="flex items-center">
                                            <PiDotBold className="h-full dark:text-[#ffffffb2] text-[#6a6a6a]" />
                                        </span>
                                        <span className="text-base dark:text-[#ffffffb2] text-[#6a6a6a]">
                                            2k
                                        </span>
                                    </span>
                                </span>
                                <span className="inline-flex items-center gap-2 cursor-pointer dark:hover:bg-[#ffffff1e] hover:bg-[#7373731f] px-2 py-[1px] rounded">
                                    <BsStarFill className="text-[#8165ff] text-xl" />
                                    <span>
                                        <span className="text-xl font-MP_Bold">
                                            5.2
                                        </span>
                                        <span className="text-base dark:text-[#ffffffb2] text-[#6a6a6a]">
                                            /10
                                        </span>
                                    </span>
                                    {/* <BsStar className="text-[#8165ff] text-xl" />
                                    <span>
                                        <span className="text-xl text-[#8165ff]">Rate</span>
                                    </span> */}
                                </span>
                            </span>
                            <span className="my-3 dark:!text-[#ffffffb2] flex flex-wrap-reverse gap-x-3 gap-y-1 lg:w-4/6 w-full">
                                {[
                                    'Kinh dị',
                                    'Drama',
                                    'Kinh dị',
                                    'Drama',
                                    'Kinh dị',
                                    'Drama',
                                    'Kinh dị',
                                    'Drama',
                                    'Kinh dị',
                                    'Drama',
                                ].map((name, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            to={''}
                                            className="font-MP_Medium text-sm px-2 py-[2px] border-[1px] dark:border-[#fff] border-[#111] rounded-full dark:hover:bg-[#ffffff17] hover:bg-[#00000015]"
                                        >
                                            {name}
                                        </Link>
                                    );
                                })}
                            </span>
                            <div className="flex flex-col font-MP_Regular text-base">
                                <span className="border-t-[1px] dark:border-[#ffffff37] border-[#111] py-3">
                                    <span className="uppercase text-base font-MP_Bold dark:text-[#cecece]">
                                        Ngôn ngữ:
                                    </span>
                                    <span className="font-MP_Medium mx-2">
                                        Tiếng Việt
                                    </span>
                                </span>
                                <span className="border-t-[1px] dark:border-[#ffffff37] border-[#111] py-3">
                                    <span className="uppercase text-base font-MP_Bold dark:text-[#cecece]">
                                        Diễn viên:
                                    </span>
                                    <span className="font-MP_Medium mx-2">
                                        Jason Statham, 50 Cent, Megan Fox
                                    </span>
                                </span>
                                <span className="border-t-[1px] dark:border-[#ffffff37] border-[#111] py-3">
                                    <span className="uppercase text-base font-MP_Bold dark:text-[#cecece]">
                                        Đạo diễn:
                                    </span>
                                    <span className="font-MP_Medium mx-2">
                                        Scott Waugh
                                    </span>
                                </span>
                                <span className="border-t-[1px] dark:border-[#ffffff37] border-[#111] py-3">
                                    <span className="uppercase text-base font-MP_Bold dark:text-[#cecece]">
                                        Ngày khởi chiếu:
                                    </span>
                                    <span className="font-MP_Medium mx-2">
                                        22/09/2023
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div id="movie-desc" className="mx-6 pt-4 font-MP_Regular">
                        <div className="inline-flex h-8 items-center gap-2">
                            <Divider className="!border-red-500 dark:!border-red-netflix !border-4 !h-full" />
                            <span className="font-MP_Medium uppercase text-2xl">
                                Nội dung phim
                            </span>
                        </div>
                        <span className="block lg:w-3/5 w-full">
                            Mười Chín Sang Hai Mươi - 19/20 là chương trình sẽ
                            theo sau những người thuộc thế hệ Z khi họ tận hưởng
                            tuần cuối cùng ở tuổi 19 và tuần đầu tiên ở tuổi 20
                            sau khi đón giao năm 2023. Các thí sinh độc đáo sẽ
                            kết thúc năm bằng việc dành thời gian với bạn bè và
                            từ từ chuẩn bị cho tuổi trưởng thành.
                        </span>
                    </div>
                    <div
                        id="movie-review"
                        className="mx-6 pt-4 font-MP_Regular"
                    >
                        <div className="inline-flex h-8 items-center gap-2">
                            <Divider className="!border-red-500 dark:!border-red-netflix !border-4 !h-full" />
                            <span className="font-MP_Medium uppercase text-2xl">
                                Đánh giá
                            </span>
                            <FaAngleRight />
                        </div>
                        <Stack
                            id="comment-list"
                            direction={'column'}
                            rowGap={'1rem'}
                            marginY={'1rem'}
                        >
                            <div className="flex flex-col py-2 px-4 shadow-xl rounded-xl border-[1px] lg:w-3/5 w-full flex-wrap min-w-fit">
                                <div className="flex flex-row flex-wrap justify-between">
                                    <div className="inline-flex felx-row items-center w-max gap-3">
                                        <AvatarByString stringName="Tran Phat" />
                                        <Breadcrumbs separator={<PiDotBold />}>
                                            <Typography className="!font-MP_Medium sm:!text-base !text-sm">
                                                Tran Phat
                                            </Typography>
                                            <Typography className="!font-MP_Medium sm:!text-base !text-sm">
                                                30/09/2023
                                            </Typography>
                                        </Breadcrumbs>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-2 py-[1px] rounded">
                                        <BsStarFill className="text-[#ffce65] text-xl" />
                                        <span className="inline-flex flex-row items-center">
                                            <span>
                                                <span className="sm:text-xl text-base font-MP_Bold">
                                                    5.2
                                                </span>
                                                <span className="sm:text-base text-xs dark:text-[#ffffffb2] text-[#6a6a6a]">
                                                    /10
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <span className="inline-flex w-auto text-[#3b3b3b] p-2">
                                    Phim rat hay!! Phim rat hay!! Phim rat hay!!
                                    Phim rat hay!!Phim rat hay!! Phim rat hay!!
                                    Phim rat hay!! Phim rat hay!!Phim rat hay!!
                                    Phim rat hay!! Phim rat hay!! Phim rat
                                    hay!!Phim rat hay!! Phim rat hay!! Phim rat
                                    hay!! Phim rat hay!!Phim rat hay!! Phim rat
                                    hay!! Phim rat hay!! Phim rat hay!!
                                </span>
                                <Stack gap={'1.25rem'} direction={'row'}>
                                    <Stack
                                        direction={'row'}
                                        alignItems={'center'}
                                        display={'inline-flex'}
                                    >
                                        <IconButton size="medium">
                                            {1 ? <BiLike /> : <BiSolidLike />}
                                        </IconButton>
                                        <span className="text-xs">200</span>
                                    </Stack>
                                    <Stack
                                        direction={'row'}
                                        alignItems={'center'}
                                        display={'inline-flex'}
                                    >
                                        <IconButton size="medium">
                                            {1 ? (
                                                <BiDislike />
                                            ) : (
                                                <BiSolidDislike />
                                            )}
                                        </IconButton>
                                        <span className="text-xs">200</span>
                                    </Stack>
                                </Stack>
                            </div>
                            <div className="flex flex-col py-2 px-4 shadow-xl rounded-xl border-[1px] lg:w-3/5 w-full flex-wrap min-w-fit">
                                <div className="flex flex-row flex-wrap justify-between">
                                    <div className="inline-flex felx-row items-center w-max gap-3">
                                        <AvatarByString stringName="Tran Phat" />
                                        <Breadcrumbs separator={<PiDotBold />}>
                                            <Typography className="!font-MP_Medium sm:!text-base !text-sm">
                                                Tran Phat
                                            </Typography>
                                            <Typography className="!font-MP_Medium sm:!text-base !text-sm">
                                                30/09/2023
                                            </Typography>
                                        </Breadcrumbs>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-2 py-[1px] rounded">
                                        <BsStarFill className="text-[#ffce65] text-xl" />
                                        <span className="inline-flex flex-row items-center">
                                            <span>
                                                <span className="sm:text-xl text-base font-MP_Bold">
                                                    5.2
                                                </span>
                                                <span className="sm:text-base text-xs dark:text-[#ffffffb2] text-[#6a6a6a]">
                                                    /10
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <span className="inline-flex w-auto text-[#3b3b3b] p-2">
                                    Phim rat hay!!
                                </span>
                                <Stack gap={'1.25rem'} direction={'row'}>
                                    <Stack
                                        direction={'row'}
                                        alignItems={'center'}
                                        display={'inline-flex'}
                                    >
                                        <IconButton size="medium">
                                            {1 ? <BiLike /> : <BiSolidLike />}
                                        </IconButton>
                                        <span className="text-xs">200</span>
                                    </Stack>
                                    <Stack
                                        direction={'row'}
                                        alignItems={'center'}
                                        display={'inline-flex'}
                                    >
                                        <IconButton size="medium">
                                            {1 ? (
                                                <BiDislike />
                                            ) : (
                                                <BiSolidDislike />
                                            )}
                                        </IconButton>
                                        <span className="text-xs">200</span>
                                    </Stack>
                                </Stack>
                            </div>
                            <div className="flex flex-col py-2 px-4 shadow-xl rounded-xl border-[1px] lg:w-3/5 w-full flex-wrap min-w-fit">
                                <div className="flex flex-row flex-wrap justify-between">
                                    <div className="inline-flex felx-row items-center w-max gap-3">
                                        <AvatarByString stringName="Tran Phat" />
                                        <Breadcrumbs separator={<PiDotBold />}>
                                            <Typography className="!font-MP_Medium sm:!text-base !text-sm">
                                                Tran Phat
                                            </Typography>
                                            <Typography className="!font-MP_Medium sm:!text-base !text-sm">
                                                30/09/2023
                                            </Typography>
                                        </Breadcrumbs>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-2 py-[1px] rounded">
                                        <BsStarFill className="text-[#ffce65] text-xl" />
                                        <span className="inline-flex flex-row items-center">
                                            <span>
                                                <span className="sm:text-xl text-base font-MP_Bold">
                                                    5.2
                                                </span>
                                                <span className="sm:text-base text-xs dark:text-[#ffffffb2] text-[#6a6a6a]">
                                                    /10
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <span className="inline-flex w-auto text-[#3b3b3b] p-2">
                                    Phim rat hay!!
                                </span>
                                <Stack gap={'1.25rem'} direction={'row'}>
                                    <Stack
                                        direction={'row'}
                                        alignItems={'center'}
                                        display={'inline-flex'}
                                    >
                                        <IconButton size="medium">
                                            {1 ? <BiLike /> : <BiSolidLike />}
                                        </IconButton>
                                        <span className="text-xs">200</span>
                                    </Stack>
                                    <Stack
                                        direction={'row'}
                                        alignItems={'center'}
                                        display={'inline-flex'}
                                    >
                                        <IconButton size="medium">
                                            {1 ? (
                                                <BiDislike />
                                            ) : (
                                                <BiSolidDislike />
                                            )}
                                        </IconButton>
                                        <span className="text-xs">200</span>
                                    </Stack>
                                </Stack>
                            </div>
                        </Stack>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieDetailPage;
