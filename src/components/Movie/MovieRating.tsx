import { Dialog, IconButton, Rating } from '@mui/material';
import clsx from 'clsx';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';

type MovieRatingProps = {
    open?: boolean;
    handleClose: React.MouseEventHandler;
    handleSetUserRate: (
        value: number,
    ) => (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    userRate?: number;
};
const MovieRating: React.FC<MovieRatingProps> = ({
    open = true,
    handleClose,
    userRate,
    handleSetUserRate,
}) => {
    const [rateValue, setRateValue] = useState(userRate || 0);
    const handleChangeValue = (
        e: React.SyntheticEvent<Element, Event>,
        value: number | null,
    ) => {
        if (!value || value <= 0) return;
        setRateValue(value);
    };
    const handleSubmitRating = (e: React.MouseEvent<Element, MouseEvent>) => {
        handleSetUserRate(rateValue)();
        handleClose(e);
    };
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
                    Đánh giá ngay
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
                <div className="w-full mt-[5rem] min-[480px]:px-8 py-4 pb-8">
                    <h1 className="text-center dark:text-white font-MP_Medium text-xl mx-2">
                        Mười: Lời nguyền trở lại Mười: Lời nguyền trở lại Mười:
                        Lời nguyền trở lại
                    </h1>
                    <div className="flex justify-center my-10">
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
                    <div className="w-3/4 mx-auto">
                        <button
                            onClick={handleSubmitRating}
                            className="bg-[#ffc649] dark:text-black py-1 px-2 rounded w-full"
                        >
                            Đánh giá
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default MovieRating;
