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

    const toggleSetBlockTrailer = () => {
        if (!videoRef.current) return;
        if (!videoBlocked) {
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
        <div className="absolute top-0 w-full h-full">
            <div
                onMouseEnter={(e) => {
                    if (videoBlocked) return;
                    handleSetVideoEnded(false);
                    videoRef.current?.play();
                }}
                onMouseLeave={(e) => {
                    if (videoBlocked) return;
                    handleSetVideoEnded(true);
                    videoRef.current?.pause();
                }}
                className="lg:h-[auto] h-[80%] w-full overflow-hidden relative bg-[#141414]"
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
                    onEnded={(e) => {
                        if (videoBlocked) return;
                        handleSetVideoEnded(true);
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
                <div className="blur-bg z-10 absolute w-full bottom-[-20px] dark:bottom-0 h-[30%]"></div>
                <div className="font-MP_Regular absolute top-[30%] lg:top-[25%] inline-flex z-10">
                    <div className="text-md text-white flex w-full mx-10 flex-col md:gap-3 gap-2">
                        <img
                            src="muoichinsanghaimuoi-title.png"
                            alt="Poster title image"
                            className="md:w-[50%] w-full"
                        />
                        <div className="w-full md:w-[50%] lg:w-[35%] lg:line-clamp-3 line-clamp-2 text-ellipsis">
                            Mười Chín Sang Hai Mươi – 19 to 20 là chương trình
                            sẽ theo sau những người thuộc thế hệ Z khi họ tận
                            hưởng tuần cuối cùng ở tuổi 19 và tuần đầu tiên ở
                            tuổi 20 sau khi đón giao năm 2023. Các thí sinh độc
                            đáo sẽ kết thúc năm bằng việc dành thời gian với bạn
                            bè và từ từ chuẩn bị cho tuổi trưởng thành.
                        </div>
                        <span className="font-MP_Bold flex flex-row gap-2 sm:text-xl md:text-2xl lg:-text-3xl items-end">
                            <span>Số lượt vote: {totalVotes}</span>
                            <span className="text-white px-2 border-l-2">
                                #1
                            </span>
                        </span>
                        <span className="flex flex-row gap-2 sm:text-xl md:text-2xl lg:-text-3xl">
                            <span className="font-MP_Regular">
                                Thời gian còn lại:
                            </span>
                            <span className="font-TitanOne">
                                {formatDay(timeVotingLeft)}
                            </span>
                        </span>
                        <div className="flex flex-row font-MP_Medium gap-3 items-center justify-between flex-wrap">
                            <div className="inline-flex flex-row gap-5">
                                <button className="capitalize sm:p-2 sm:text-md px-3 p-1 bg-white rounded-md text-[#141414] hover:opacity-90">
                                    Vote là gì ?
                                </button>
                                <button
                                    onClick={handleVoting}
                                    className="capitalize sm:p-2 sm:text-md px-3 p-1 bg-red-netflix rounded-md text-[#fff] hover:opacity-90"
                                >
                                    Vote
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
                                        {!videoMuted && (
                                            <FontIcon icon="bi-volume-mute-fill"></FontIcon>
                                        )}
                                        {videoMuted && (
                                            <FontIcon icon="bi-volume-up-fill"></FontIcon>
                                        )}
                                    </button>
                                </Tooltip>
                                <Tooltip
                                    arrow={true}
                                    title={
                                        !blockTrailer_Text
                                            ? unBlockTrailer_Text
                                            : blockTrailer_Text
                                    }
                                >
                                    <button
                                        onClick={toggleSetBlockTrailer}
                                        className="flex items-center capitalize sm:p-2 sm:text-md px-3 p-1 bg-white rounded-md text-[#141414] hover:opacity-90 active:opacity-75"
                                    >
                                        {!videoBlocked && (
                                            <TbDeviceTvOff className="text-[1.4rem]" />
                                        )}
                                        {videoBlocked && (
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
