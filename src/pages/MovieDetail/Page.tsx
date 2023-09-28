import React, { useState, useEffect } from 'react';
import { PageProps } from '../Home/Page';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs, Divider, Rating } from '@mui/material';
import { RxDotFilled } from 'react-icons/rx';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { IoEarth } from 'react-icons/io5';
import { BsStar, BsStarFill } from 'react-icons/bs';
interface MovieDetailPageProps extends PageProps {}
const MovieDetailPage: React.FC<MovieDetailPageProps> = ({
    title = 'Phim - HIU Cinemas',
}) => {
    document.title = title; // Set Title
    const route = useLocation();
    const { id } = useParams();

    return (
        <>
            <div
                id="movie-detail"
                className="w-full h-[1400px] max-w-[1000px] mx-auto"
            >
                <div className="sm:mx-10 mx-4 mt-4 flex justify-start flex-wrap !text-[#3b3b3b] dark:!text-white">
                    <div className="flex font-MP_Medium w-full justify-between">
                        <span className="font-MP_Bold text-[1.7rem] h-fit uppercase max-w-[600px] leading-[1.2]">
                            Mười: Lời nguyền trở lại Mười: Lời nguyền trở lại
                        </span>
                        {/* Rating in header */}
                        <span className="my-2 gap-8 md:flex hidden">
                            <span className="inline-flex flex-col items-center">
                                <div className="uppercase font-MP_Bold text-base dark:text-[#ffffffb2] text-red-500 w-max">
                                    HCine Rating
                                </div>
                                <span className="inline-flex items-center gap-2 cursor-pointer hover:bg-[#ffffff1e] px-2 py-[1px] rounded">
                                    <BsStarFill className="text-[#ffce65] text-xl" />
                                    <span>
                                        <span className="text-xl font-MP_Bold">
                                            5.2
                                        </span>
                                        <span className="text-base dark:text-[#ffffffb2] text-[#6a6a6a]">
                                            /10
                                        </span>
                                    </span>
                                </span>
                            </span>
                            <span className="inline-flex flex-col items-center">
                                <div className="uppercase font-MP_Bold text-base dark:text-[#ffffffb2] text-red-500 w-max">
                                    Your Rating
                                </div>
                                <span className="inline-flex items-center gap-2 cursor-pointer hover:bg-[#ffffff1e] px-2 py-[1px] rounded">
                                    {/* <BsStarFill className="text-[#8165ff] text-xl" />
                                    <span>
                                        <span className="text-xl font-MP_Bold">5.2</span>
                                        <span className="text-base dark:text-[#ffffffb2] text-[#6a6a6a]">
                                            /10
                                        </span>
                                    </span> */}
                                    <BsStar className="text-[#8165ff] text-xl" />
                                    <span>
                                        <span className="text-xl text-[#8165ff]">
                                            Rate
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </span>
                    </div>
                    <div className="w-auto flex sm:flex-nowrap flex-wrap gap-2 justify-center">
                        {/* Image */}
                        <div className="h-auto w-max rounded-md inline-flex justify-center">
                            <img
                                src="/muoi/muoi-poster.jpg"
                                alt=""
                                className="min-[380px]:rounded-md lg:min-w-[400px] md:min-w-[300px] w-auto h-auto object-cover"
                            />
                        </div>
                        {/* Detail */}
                        <div className="flex mx-6 flex-col font-MP_Medium w-full">
                            <span className="flex gap-5 items-center">
                                <span className="font-MP_Medium text-base flex-col inline-flex items-center">
                                    <IoEarth />
                                    Việt Nam
                                </span>
                                <span className="font-MP_Medium text-base flex-col inline-flex items-center">
                                    <AiOutlineClockCircle />
                                    1h35m
                                </span>
                                <span className="font-MP_Medium text-base flex-col inline-flex items-center">
                                    <BiMoviePlay />
                                    Không phụ đề
                                </span>
                            </span>
                            <Breadcrumbs
                                separator={<RxDotFilled />}
                                aria-label="type_of_movie"
                                className="!mb-2 dark:!text-[#ffffffb2]"
                            >
                                <Link
                                    to={''}
                                    className="font-MP_Medium text-base hover:underline"
                                >
                                    Kinh dị
                                </Link>
                                <Link
                                    to={''}
                                    className="font-MP_Medium text-base hover:underline"
                                >
                                    Việt Nam
                                </Link>
                            </Breadcrumbs>
                            <span className="mb-2 line-clamp-3">
                                Mười Chín Sang Hai Mươi - 19/20 là chương trình
                                sẽ theo sau những người thuộc thế hệ Z khi họ
                                tận hưởng tuần cuối cùng ở tuổi 19 và tuần đầu
                                tiên ở tuổi 20 sau khi đón giao năm 2023. Các
                                thí sinh độc đáo sẽ kết thúc năm bằng việc dành
                                thời gian với bạn bè và từ từ chuẩn bị cho tuổi
                                trưởng thành.
                            </span>
                            <span className="mb-2 gap-8 md:flex hidden">
                                <span className="inline-flex items-center gap-2 cursor-pointer hover:bg-[#ffffff1e] px-2 py-[1px] rounded">
                                    <BsStarFill className="text-[#ffce65] text-xl" />
                                    <span>
                                        <span className="text-xl font-MP_Bold">
                                            5.2
                                        </span>
                                        <span className="text-base dark:text-[#ffffffb2] text-[#6a6a6a]">
                                            /10
                                        </span>
                                    </span>
                                </span>
                                <span className="inline-flex items-center gap-2 cursor-pointer hover:bg-[#ffffff1e] px-2 py-[1px] rounded">
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
                            <div className="flex flex-col font-MP_Regular text-base gap-1">
                                <span>
                                    <span className="text-[14px] uppercase">
                                        Ngôn ngữ:
                                    </span>
                                    <span className="font-MP_Medium mx-2">
                                        Tiếng Việt
                                    </span>
                                </span>
                                <span>
                                    <span className="text-[14px] uppercase">
                                        Diễn viên
                                    </span>
                                    <span className="font-MP_Medium mx-2">
                                        Jason Statham, 50 Cent, Megan Fox
                                    </span>
                                </span>
                                <span>
                                    <span className="text-[14px] uppercase">
                                        Đạo diễn:
                                    </span>
                                    <span className="font-MP_Medium mx-2">
                                        Scott Waugh
                                    </span>
                                </span>
                                <span>
                                    <span className="text-[14px] uppercase">
                                        Ngày khởi chiếu:
                                    </span>
                                    <span className="font-MP_Medium mx-2">
                                        22/09/2023
                                    </span>
                                </span>
                            </div>
                        </div>
                        {/* Rating */}
                        <div className=""></div>
                    </div>
                    <div className="mx-6 mt-4 font-MP_Regular">
                        <div className="inline-flex h-8 items-center gap-2">
                            <Divider className="!border-red-500 dark:!border-red-netflix !border-2 !h-full" />
                            <span className="font-MP_Medium uppercase text-2xl">
                                Nội dung phim
                            </span>
                        </div>
                        <span className="block lg:w-3/5 leading-[1.25]">
                            Mười Chín Sang Hai Mươi - 19/20 là chương trình sẽ
                            theo sau những người thuộc thế hệ Z khi họ tận hưởng
                            tuần cuối cùng ở tuổi 19 và tuần đầu tiên ở tuổi 20
                            sau khi đón giao năm 2023. Các thí sinh độc đáo sẽ
                            kết thúc năm bằng việc dành thời gian với bạn bè và
                            từ từ chuẩn bị cho tuổi trưởng thành.
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieDetailPage;
