import { dateToMilliseconds } from '@/utils/DateUtils';
import clsx from 'clsx';
import { useEffect, useRef, useState, memo } from 'react';
import FontIcon from '../Common/FontIcon';
import { Tooltip } from '@mui/material';
import { TbDeviceTv, TbDeviceTvOff } from 'react-icons/tb';
import { IoInformationCircle } from 'react-icons/io5';
import useLanguage from '@/hooks/useLanguage';
import { HiMiniTicket } from 'react-icons/hi2';
import { MovieItem } from './MovieSlider';
import { Link } from 'react-router-dom';
import { RiFullscreenFill } from 'react-icons/ri';

interface MovieTrailerProps {
    movieApi?: MovieItem;
    isInteractDocumentFirst?: boolean;
}
const MovieTrailer: React.FC<MovieTrailerProps> = ({
    movieApi,
    isInteractDocumentFirst = false,
}) => {
    const text = useLanguage();
    const mute_Text = text('mute');
    const unmute_Text = text('unmute');
    const blockTrailer_Text = text('block_trailer');
    const unBlockTrailer_Text = text('unblock_trailer');
    const exploreAll_Text = text('explore_all');
    const buyTicket_Text = text('buy_ticket', 'now');
    const fullscreen_Text = text('fullscreen');

    const videoRef = useRef<HTMLVideoElement>(null);
    const posterRef = useRef<HTMLImageElement>(null);

    const [hideTitle, setHideTitle] = useState<boolean>(false);
    // Auto hide title
    useEffect(() => {
        const id = setTimeout(() => {
            setHideTitle(true);
        }, 5000);
        return () => {
            clearTimeout(id);
        };
    }, [hideTitle]);

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
    const [videoMuted, setVideoMuted] = useState<boolean>(
        isInteractDocumentFirst,
    );
    const toggleMutedVideo = () => {
        setVideoMuted(!videoMuted);
    };

    const [timeVotingLeft, setTimeVotingLeft] = useState<number>(
        dateToMilliseconds(7, 0, 0, 15, 9, 2023) - Date.now(),
    );

    useEffect(() => {
        if (!timeVotingLeft) return;
        const countdownId = setInterval(() => {
            setTimeVotingLeft(timeVotingLeft - 1000);
        }, 1000);
        return () => {
            clearInterval(countdownId);
        };
    }, [timeVotingLeft]);

    // Reset again for display trailer
    useEffect(() => {
        if (!posterRef.current || !videoRef.current) return;
        posterRef.current.hidden = false;
        videoRef.current.pause();
        videoRef.current.load();
        isInteractDocumentFirst && !videoBlocked && videoRef.current.play();
        setHideTitle(false);
    }, [movieApi]);
    useEffect(() => {
        if (!posterRef.current || !videoRef.current) return;
        if (isInteractDocumentFirst) {
            setVideoEnded(false);
            setHideTitle(false);
            videoRef.current.play();
            return;
        }
    }, [isInteractDocumentFirst]);
    const [fullscreen, setFullscreen] = useState(false);
    const handleFullscreen = () => {
        if (!videoRef.current) return;
        videoRef.current.requestFullscreen({ navigationUI: 'hide' });
    };
    useEffect(() => {
        if (!videoRef.current) return;
        videoRef.current.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) setFullscreen(false);
            else setFullscreen(true);
        });
        return () => {
            if (!videoRef.current) return;
            videoRef.current.removeEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement) setFullscreen(false);
                else setFullscreen(true);
            });
        };
    }, []);
    useEffect(() => {
        if (!videoRef.current || !movieApi) return;
        if (fullscreen) {
            videoRef.current.style.scale = '';
        } else {
            videoRef.current.style.scale = movieApi.movieScale;
        }
    }, [fullscreen]);
    return (
        <div className="w-full h-full">
            <div className="flex flex-col w-full h-full relative bg-[#141414] overflow-hidden">
                <img
                    ref={posterRef}
                    loading="lazy"
                    src={movieApi?.backgroundSrc || movieApi?.posterSrc || ''}
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
                        'h-full w-full object-contain object-left-center scale-[1] transition-opacity duration-500 opacity-0 max-md:!scale-100',
                        {
                            '!opacity-70': !videoEnded,
                        },
                    )}
                    style={{ scale: movieApi?.movieScale }}
                    loop={true}
                    controlsList="nodownload noplaybackrate noremoteplayback"
                    disablePictureInPicture={true}
                    preload={'auto'}
                    muted={videoMuted}
                    onCanPlay={(e) => {
                        if (videoBlocked) return;
                        setVideoEnded(false);
                        e.currentTarget.play();
                    }}
                    onError={() => {
                        setVideoEnded(true);
                    }}
                >
                    <source src={movieApi?.movieTrailerSrc || ''} />
                </video>
                <div className="blur-bg z-10 absolute w-full bottom-[-1px] h-[30%]"></div>
                <div
                    className={clsx(
                        'font-MP_Regular md:absolute w-full h-auto inline-flex z-10 justify-center md:top-[30%] transition-all duration-1000',
                        {
                            'lg:top-[50%] top-[30%]': hideTitle,
                        },
                    )}
                >
                    <div className="text-md text-white flex w-full md:mx-10 mt-4 mx-4 flex-col max-w-[1700px]">
                        {movieApi?.movieTitleImgSrc ? (
                            <img
                                src={movieApi?.movieTitleImgSrc}
                                alt="Poster title image"
                                className="md:w-[50%] w-full h-auto mb-2 min-h-[120px] max-h-[140px] object-contain object-left"
                                onError={(e) => {
                                    e.currentTarget.hidden = true;
                                }}
                            />
                        ) : (
                            <span className="flex items-center md:w-[50%] w-full h-full md:text-4xl text-3xl font-MP_Bold uppercase">
                                {movieApi?.movieTitle}
                            </span>
                        )}
                        <div
                            className={clsx(
                                'mb-4 w-full md:w-[50%] lg:w-[35%] text-ellipsis transition-all duration-700 h-full line-clamp-4',
                                {
                                    'md:h-0': hideTitle,
                                },
                            )}
                        >
                            {movieApi?.movieDescription}
                        </div>
                        {movieApi && (
                            <div className="mb-4 flex flex-row font-MP_Medium gap-5 items-center justify-between flex-wrap">
                                <div className="inline-flex flex-row gap-5 flex-wrap justify-between">
                                    <Link
                                        to={movieApi?.buyTicketSrc || ''}
                                        className="inline-flex items-center text-xl capitalize py-2 px-3 bg-red-netflix rounded-md text-[#fff] hover:opacity-90"
                                    >
                                        <HiMiniTicket className="text-3xl" />
                                        <span className="px-2">
                                            {buyTicket_Text}
                                        </span>
                                    </Link>
                                    <Link
                                        to={movieApi?.detailMovieSrc || ''}
                                        className="inline-flex items-center text-xl capitalize py-2 px-3 bg-white rounded-md text-[#141414] hover:opacity-90"
                                    >
                                        <IoInformationCircle className="text-3xl" />
                                        <span className="px-2">
                                            {exploreAll_Text}
                                        </span>
                                    </Link>
                                </div>
                                <div className="inline-flex flex-row gap-5">
                                    <Tooltip
                                        arrow={true}
                                        title={
                                            videoMuted ? unmute_Text : mute_Text
                                        }
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
                                    <Tooltip
                                        arrow={true}
                                        title={fullscreen_Text}
                                    >
                                        <button
                                            onClick={handleFullscreen}
                                            className="flex items-center capitalize sm:p-2 sm:text-md px-3 p-1 bg-white rounded-md text-[#141414] hover:opacity-90 active:opacity-75"
                                        >
                                            <RiFullscreenFill className="text-[1.4rem]" />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(MovieTrailer);
