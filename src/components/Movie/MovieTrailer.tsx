import { dateToMilliseconds, formatDay } from '@/utils/DateUtils';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import FontIcon from '../Common/FontIcon';
import { Tooltip } from '@mui/material';
import { TbDeviceTv, TbDeviceTvOff } from 'react-icons/tb';
import useLanguage from '@/hooks/useLanguage';
const MovieTrailer = () => {
    const text = useLanguage();
    const mute_Text = text('mute');
    const unmute_Text = text('unmute');
    const blockTrailer_Text = text('block_trailer');
    const unBlockTrailer_Text = text('unblock_trailer');

    const videoRef = useRef<HTMLVideoElement>(null);
    const posterRef = useRef<HTMLImageElement>(null);

    const [hideTitle, setHideTitle] = useState<boolean>(false);
    // Auto hide title
    useEffect(() => {
        const id = setTimeout(() => {
            setHideTitle(true);
        }, 3000);
        return () => {
            clearTimeout(id);
        };
    }, []);

    const [totalVotes, setTotalVotes] = useState<number>(0);
    const [timeVotingLeft, setTimeVotingLeft] = useState<number>(
        dateToMilliseconds(7, 0, 0, 15, 9, 2023) - Date.now(),
    );
    const handleVoting = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.disabled = true;
        return setTotalVotes(totalVotes + 1);
    };

    const [videoBlocked, setVideoBlocked] = useState<boolean>(false);
    const [videoEnded, setVideoEnded] = useState<boolean>(true);

    const toggleSetBlockTrailer = (status: boolean) => () => {
        if (!videoRef.current) return;
        if (status) {
            videoRef.current.currentTime = 0;
            videoRef.current.pause();
            setVideoBlocked(true);
            handleSetVideoEnded(true);
            return;
        }
        videoRef.current?.play();
        setVideoBlocked(false);
        handleSetVideoEnded(false);
        return;
    };
    const handleSetVideoEnded = (state: boolean) => {
        return setVideoEnded(state);
    };
    const [videoMuted, setVideoMuted] = useState<boolean>(true);
    const toggleMutedVideo = () => {
        setVideoMuted(!videoMuted);
    };
    useEffect(() => {
        if (!timeVotingLeft) return;
        const countdownId = setInterval(() => {
            setTimeVotingLeft(timeVotingLeft - 1000);
        }, 1000);
        return () => {
            clearInterval(countdownId);
        };
    }, [timeVotingLeft]);
    return (
        <div className="w-full h-full">
            <div
                onMouseEnter={() => {
                    if (videoBlocked) return;
                    handleSetVideoEnded(false);
                    videoRef.current?.play();
                }}
                className="flex flex-col w-full h-full relative bg-[#141414]"
            >
                <img
                    ref={posterRef}
                    src="muoichinsanghaimuoi-poster.jpg"
                    alt="movie poster"
                    className={clsx(
                        'absolute z-10 h-full w-full object-cover object-left-top scale-[1] transition-opacity duration-500 opacity-0',
                        {
                            '!opacity-70': videoEnded,
                        },
                    )}
                    onError={(e) => {
                        e.currentTarget.hidden = true;
                    }}
                />
                <video
                    ref={videoRef}
                    id="trailer"
                    className={clsx(
                        'h-full w-full object-cover object-left-center scale-[1] transition-opacity duration-500 opacity-0',
                        {
                            '!opacity-70': !videoEnded,
                        },
                    )}
                    muted={videoMuted}
                    onClick={(e) => {
                        e.currentTarget.currentTime =
                            e.currentTarget.duration - 5;
                    }}
                    onEnded={() => {
                        if (videoBlocked) return;
                        handleSetVideoEnded(true);
                        toggleSetBlockTrailer(true)();
                    }}
                    onCanPlay={(e) => {
                        if (videoBlocked) return;
                        handleSetVideoEnded(false);
                        e.currentTarget.play();
                    }}
                >
                    <source
                        src="muoichinsanghaimuoi-trailer.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="blur-bg z-10 absolute w-full bottom-[-1px] h-[30%]"></div>
                <div className="font-MP_Regular md:absolute w-full h-auto inline-flex z-10 top-[30%] justify-center">
                    <div className="text-md text-white flex w-full mx-5 md:mx-10 mt-4 mb-20 flex-col max-w-[2520px]">
                        <img
                            src="muoichinsanghaimuoi-title.png"
                            alt="Poster title image"
                            className="md:w-[50%] w-full h-auto mb-3"
                            onError={(e) => {
                                e.currentTarget.hidden = true;
                            }}
                        />
                        {/* <span className="flex items-center md:w-[50%] w-full h-full md:text-4xl text-3xl font-MP_Bold uppercase">
                            Phim: Mười chín sang hai mươi
                        </span> */}
                        <div
                            className={clsx(
                                'mb-3 w-full md:w-[50%] lg:w-[35%] text-ellipsis transition-all duration-700 h-full line-clamp-3',
                                {
                                    'md:h-0': hideTitle,
                                },
                            )}
                        >
                            Mười Chín Sang Hai Mươi – 19 to 20 là chương trình
                            sẽ theo sau những người thuộc thế hệ Z khi họ tận
                            hưởng tuần cuối cùng ở tuổi 19 và tuần đầu tiên ở
                            tuổi 20 sau khi đón giao năm 2023. Các thí sinh độc
                            đáo sẽ kết thúc năm bằng việc dành thời gian với bạn
                            bè và từ từ chuẩn bị cho tuổi trưởng thành.
                        </div>
                        <span className="mb-3 font-MP_Bold flex flex-row gap-2 sm:text-xl md:text-2xl lg:-text-3xl items-end uppercase">
                            <span>
                                Ngày khởi chiếu: Thứ 6, 15/09/2023 18:00 PM
                            </span>
                        </span>
                        <span className="mb-3 flex flex-row gap-2 sm:text-xl md:text-2xl lg:-text-3xl flex-wrap">
                            <span className="font-MP_Regular">
                                Thời gian mua vé còn lại:
                            </span>
                            <span className="font-TitanOne">
                                {formatDay(timeVotingLeft)}
                            </span>
                        </span>
                        <div className="mb-3 flex flex-row font-MP_Medium gap-3 items-center justify-between flex-wrap">
                            <div className="inline-flex flex-row gap-5">
                                <button
                                    onClick={handleVoting}
                                    className="capitalize sm:p-2 sm:text-md px-3 p-1 bg-red-netflix rounded-md text-[#fff] hover:opacity-90"
                                >
                                    Mua vé ngay
                                </button>
                                <button className="capitalize sm:p-2 sm:text-md px-3 p-1 bg-white rounded-md text-[#141414] hover:opacity-90">
                                    Xem chi tiết
                                </button>
                            </div>
                            <div className="inline-flex flex-row gap-5">
                                <Tooltip
                                    arrow={true}
                                    title={videoMuted ? unmute_Text : mute_Text}
                                >
                                    <button
                                        onClick={toggleMutedVideo}
                                        className="flex items-center capitalize sm:p-2 sm:text-md px-3 p-1 bg-white rounded-md text-[#141414] hover:opacity-90 active:opacity-75"
                                    >
                                        {videoMuted && (
                                            <FontIcon icon="bi-volume-mute-fill"></FontIcon>
                                        )}
                                        {!videoMuted && (
                                            <FontIcon icon="bi-volume-up-fill"></FontIcon>
                                        )}
                                    </button>
                                </Tooltip>
                                <Tooltip
                                    arrow={true}
                                    title={
                                        videoBlocked
                                            ? unBlockTrailer_Text
                                            : blockTrailer_Text
                                    }
                                >
                                    <button
                                        onClick={toggleSetBlockTrailer(
                                            !videoBlocked,
                                        )}
                                        className="flex items-center capitalize sm:p-2 sm:text-md px-3 p-1 bg-white rounded-md text-[#141414] hover:opacity-90 active:opacity-75"
                                    >
                                        {videoBlocked && (
                                            <TbDeviceTvOff className="text-[1.4rem]" />
                                        )}
                                        {!videoBlocked && (
                                            <TbDeviceTv className="text-[1.4rem]" />
                                        )}
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieTrailer;
