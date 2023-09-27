import { Skeleton } from '@mui/material';
import clsx from 'clsx';
import { memo, useEffect } from 'react';
import { MovieItem } from './MovieSlider';

interface SlideItemProps {
    id?: string | number;
    movieApi?: MovieItem;
    handleSetVideoDisplay?: React.Dispatch<
        React.SetStateAction<MovieItem | undefined>
    >;
}
const SlideItem: React.FC<SlideItemProps> = ({
    id,
    movieApi,
    handleSetVideoDisplay,
}) => {
    useEffect(() => {
        if (id === 0 && handleSetVideoDisplay) {
            handleSetVideoDisplay(movieApi);
        }
    }, []);
    return (
        <span
            className={clsx(
                'block text-white dark:bg-[#ffffff0e] bg-[#ffffff91] rounded-sm cursor-pointer',
                'min-h-[50%]', // height
                'min-[480px]:min-w-[33.333%] min-w-full', // width
            )}
        >
            {movieApi ? (
                <img
                    src={movieApi.posterSrc}
                    draggable={false}
                    className="object-cover object-center w-full h-full rounded-sm"
                    onClick={() => {
                        if (!handleSetVideoDisplay) return;
                        handleSetVideoDisplay(movieApi);
                    }}
                    onError={(e) => {
                        e.currentTarget.remove();
                    }}
                />
            ) : (
                <Skeleton
                    variant="rectangular"
                    width={'100%'}
                    height={'20vh'}
                    className="rounded-sm"
                    animation="wave"
                />
            )}
        </span>
    );
};

export default memo(SlideItem);
