import { PiDotBold } from 'react-icons/pi';
import { AvatarBySrc } from '../Common/Avatar';
import { Breadcrumbs, IconButton, Stack, Typography } from '@mui/material';
import { BsStarFill } from 'react-icons/bs';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { useState } from 'react';

export type MovieCommentProps =
    | {
          author?: {
              username?: string;
              avatar_url?: string;
              isMe?: boolean;
          };
          comment_created_at?: string;
          rating_star?: number;
          comment_text?: string;
          like_comment?: number;
          dislike_comment?: number;
      }
    | undefined;
const MovieComment: React.FC<MovieCommentProps> = (props) => {
    const [like, setLike] = useState<number>(props?.like_comment || 0);
    const [dislike, setDislike] = useState<number>(props?.dislike_comment || 0);

    const handleDislikeComment = () => {
        setDislike(dislike + 1);
    };
    const handleLikeComment = () => {
        setLike(like + 1);
    };
    return (
        <div className="flex flex-col py-2 px-4 shadow-sm rounded-xl border-[1px] lg:w-4/5 w-full min-w-fit-content flex-wrap">
            <div className="flex flex-row flex-wrap justify-between gap-3">
                <div className="inline-flex felx-row items-center gap-2">
                    <AvatarBySrc src={props?.author?.avatar_url} />
                    <Breadcrumbs separator={<PiDotBold />}>
                        <Typography className="dark:text-white !font-MP_Medium sm:!text-base !text-sm w-max flex gap-1 items-center">
                            {props?.author?.isMe ? (
                                <>
                                    <Typography
                                        component={'span'}
                                        fontFamily={'inherit'}
                                        className="min-[480px]:block hidden"
                                    >
                                        {props.author.username}
                                    </Typography>
                                    <Typography
                                        component={'span'}
                                        fontFamily={'inherit'}
                                        className="text-[#8165ff] min-[480px]:block hidden"
                                    >
                                        (Me)
                                    </Typography>
                                    <Typography
                                        component={'span'}
                                        fontFamily={'inherit'}
                                        className="text-[#8165ff] min-[480px]:hidden block"
                                    >
                                        Me
                                    </Typography>
                                </>
                            ) : (
                                props?.author?.username || 'Anonymous'
                            )}
                        </Typography>
                        <Typography className="dark:text-white !font-MP_Medium sm:!text-base !text-sm max-md:hidden">
                            {props?.comment_created_at || '0/0/0'}
                        </Typography>
                    </Breadcrumbs>
                </div>
                <div className="inline-flex items-center gap-2 px-2 py-[1px] rounded">
                    <BsStarFill className="text-[#ffce65] text-xl" />
                    <span className="inline-flex flex-row items-center">
                        <span>
                            <span className="sm:text-xl text-base font-MP_Bold">
                                {props?.rating_star}
                            </span>
                            <span className="sm:text-base text-xs dark:text-[#ffffffb2] text-[#6a6a6a]">
                                /10
                            </span>
                        </span>
                    </span>
                </div>
            </div>
            <span className="inline-flex w-auto dark:text-white text-[#3b3b3b] p-2">
                {props?.comment_text}
            </span>
            <Stack gap={'1.25rem'} direction={'row'}>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    display={'inline-flex'}
                >
                    <IconButton
                        onClick={handleLikeComment}
                        size="medium"
                        className="dark:text-[#fff]"
                    >
                        {1 ? <BiLike /> : <BiSolidLike />}
                    </IconButton>
                    <span className="text-xs pl-2">{like}</span>
                </Stack>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    display={'inline-flex'}
                >
                    <IconButton
                        onClick={handleDislikeComment}
                        size="medium"
                        className="dark:text-[#fff]"
                    >
                        {1 ? <BiDislike /> : <BiSolidDislike />}
                    </IconButton>
                    <span className="text-xs pl-2">{dislike}</span>
                </Stack>
            </Stack>
        </div>
    );
};

export default MovieComment;
