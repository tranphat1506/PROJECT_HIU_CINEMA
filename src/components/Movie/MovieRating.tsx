import useLanguage from '@/hooks/useLanguage';
import { Dialog, IconButton, Rating } from '@mui/material';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { MovieCommentProps } from './MovieComment';

const MIN_LENGTH_COMMENT = 10;
type MovieRatingProps = {
    open: boolean;
    handleClose: React.MouseEventHandler;
    handleSetUserRate: (
        rate?: number,
        comment?: string,
    ) => (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    userRate?: MovieCommentProps;
    movieTitle: string;
};
const MovieRating: React.FC<MovieRatingProps> = ({
    open = true,
    handleClose,
    userRate,
    handleSetUserRate,
    movieTitle,
}) => {
    const text = useLanguage();
    const [rateValue, setRateValue] = useState(userRate?.rating_star || 0);
    const [displayUserComment, setDisplayUserComment] = useState<
        string | undefined
    >(userRate?.comment_text);
    const [blockSubmit, setBlockSumbit] = useState(true);

    useEffect(() => {
        if (
            !displayUserComment ||
            displayUserComment.length < MIN_LENGTH_COMMENT ||
            rateValue <= 0
        ) {
            setBlockSumbit(true);
        } else {
            setBlockSumbit(false);
        }
    }, [rateValue, displayUserComment]);

    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDisplayUserComment(e.currentTarget.value);
    };

    const handleChangeValue = (
        _: React.SyntheticEvent<Element, Event>,
        value: number | null,
    ) => {
        if (!value || value <= 0) return;
        setRateValue(value);
    };

    const handleSubmitRating = (e: React.MouseEvent<Element, MouseEvent>) => {
        if (blockSubmit) return;
        handleSetUserRate(rateValue, displayUserComment)();
        handleClose(e);
    };

    let rating_Text = text('rating');
    let ratingNow_Text = text('rating', 'now');
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                className:
                    '!bg-transparent max-[480px]:!m-0 max-[480px]:min-h-full max-[480px]:w-screen max-[480px]:justify-end !shadow-none',
            }}
        >
            <div className="mx-auto relative top-[80px]">
                <div className="w-full relative">
                    <BsStarFill
                        className={clsx('text-[130px] text-[#8165ff] w-full')}
                    />
                    <span className="text-2xl text-[#fff] absolute top-0 left-0 flex w-full h-full items-center justify-center leading-none font-MP_Medium">
                        <p className="w-9 text-center mt-3">
                            {!rateValue ? '?' : rateValue}
                        </p>
                    </span>
                </div>
                <p className="leading-normal dark:text-[#ffc649] uppercase text-md font-medium text-center">
                    {ratingNow_Text}
                </p>
            </div>
            <div className="w-auto h-auto max-[480px]:!rounded-none !rounded-xl bg-white dark:bg-[#141414] shadow-lg">
                <IconButton
                    onClick={handleClose}
                    className="dark:!text-white hover:!bg-[#ffffff21] !mt-4 !mr-4 float-right"
                    size="medium"
                >
                    <IoMdClose />
                </IconButton>
                <div className="w-full mt-[5rem] min-[480px]:px-8 py-4 pb-8 px-4">
                    <h1 className="text-center dark:text-white font-MP_Medium text-xl mx-2">
                        {movieTitle}
                    </h1>
                    <div className="flex justify-center mt-10">
                        <Rating
                            value={rateValue}
                            icon={
                                <BsStarFill className="text-[#ffce65] mx-1 min-[480px]:text-[1.7rem] max-[380px]:text-xl text-2xl max-[330px]:text-lg" />
                            }
                            emptyIcon={
                                <BsStar className="text-[#bbb] min-[480px]:text-[1.7rem] mx-1 text-2xl max-[380px]:text-xl max-[330px]:text-lg" />
                            }
                            max={10}
                            onChange={handleChangeValue}
                        />
                    </div>
                    <div className="w-full mt-10">
                        <textarea
                            onChange={handleChangeComment}
                            name="comment"
                            id="comment-input"
                            placeholder="Đánh giá tối thiểu 10 kí tự trở lên"
                            className="w-full font-MP_Regular p-2 rounded border-2 dark:border-none"
                            value={displayUserComment}
                        ></textarea>
                        <div className="float-right">
                            <p className="dark:text-white text-xs font-MP_Regular">
                                {(displayUserComment?.length || 0) +
                                    '/' +
                                    MIN_LENGTH_COMMENT}
                            </p>
                        </div>
                    </div>
                    <div className="w-3/4 mx-auto mt-10">
                        <button
                            onClick={handleSubmitRating}
                            className={clsx(
                                'bg-[#ffc649] dark:text-black py-1 px-2 rounded w-full font-MP_Medium',
                                {
                                    'opacity-70 cursor-not-allowed':
                                        blockSubmit,
                                },
                            )}
                        >
                            {rating_Text}
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default MovieRating;
