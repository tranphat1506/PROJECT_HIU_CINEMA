import React, { useState, useEffect, MouseEventHandler } from 'react';
import { PageProps } from '../Home/Page';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Divider, IconButton, Stack } from '@mui/material';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiMoviePlay, BiPlayCircle } from 'react-icons/bi';
import { IoEarth, IoPlayCircle } from 'react-icons/io5';
import { HiMiniTicket } from 'react-icons/hi2';
import useLanguage from '@/hooks/useLanguage';
import { FaAngleRight } from 'react-icons/fa6';
import MovieComment from '@/components/Movie/MovieComment';
import RatingButton, {
    MovieRatingButton,
} from '@/components/Movie/RatingButton';
import MovieRating from '@/components/Movie/MovieRating';
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

    const [userRate, setUserRate] = useState<number>(0);
    const handleSetUserRate =
        (value: number) =>
        (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setUserRate(value);
        };
    const [ratingMenu, setRatingMenu] = useState(false);
    const toggleRatingMenu = (open: boolean) => (e?: React.MouseEvent) => {
        setRatingMenu(open);
    };
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
                                <MovieRatingButton
                                    href="#movie-review"
                                    rate={7}
                                    totalRates={12}
                                />
                            </span>
                            <span className="inline-flex flex-col items-center">
                                <div className="uppercase font-MP_Bold text-base dark:text-[#ffffffb2] text-[#3b3b3b] w-max">
                                    Your Rating
                                </div>
                                <RatingButton
                                    handleOpenMenu={toggleRatingMenu(true)}
                                    rate={userRate}
                                />
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
                                <MovieRatingButton
                                    direction="row"
                                    href="#movie-review"
                                    rate={7}
                                    totalRates={12}
                                />
                                <RatingButton
                                    handleOpenMenu={toggleRatingMenu(true)}
                                    rate={userRate}
                                />
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
                            <MovieComment
                                author={{
                                    avatar_url:
                                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUxftucoAyxyooI4z_vRBoQE1-OmOwzjNIBA&usqp=CAU',
                                    username: 'meongungoc123',
                                }}
                                comment_created_at="12/09/2023"
                                like_comment={1000}
                                dislike_comment={20}
                                rating_star={5}
                                comment_text="Phim rất hay ạ!! Mua vé trên HIU còn đc giảm 30k ^^"
                            />
                            <MovieComment
                                author={{
                                    avatar_url:
                                        'https://i.pinimg.com/1200x/c0/29/5a/c0295a690ba4e121e0ab092279d8ed6b.jpg',
                                    username: 'phatdeptraiqua',
                                }}
                                comment_created_at="12/09/2023"
                                like_comment={300}
                                dislike_comment={19}
                                rating_star={4.5}
                                comment_text="Phim rất hay ạ rất đáng xem mọi người ơi. Nam chính đẹp trai như mình vậy."
                            />
                            <MovieComment
                                author={{
                                    avatar_url:
                                        'https://assets-prd.ignimgs.com/2022/09/12/odd-taxi-blogroll-1663003695432.jpg',
                                    username: 'thichxemphim11',
                                }}
                                comment_created_at="12/09/2023"
                                like_comment={10}
                                dislike_comment={8}
                                rating_star={2}
                                comment_text="Phim quá chán !!!!"
                            />
                        </Stack>
                    </div>
                </div>
            </div>
            <MovieRating
                open={ratingMenu}
                userRate={userRate}
                handleClose={toggleRatingMenu(false)}
                handleSetUserRate={handleSetUserRate}
            />
        </>
    );
};

export default MovieDetailPage;
