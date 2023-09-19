import { Skeleton } from '@mui/material';
import clsx from 'clsx';
import { memo } from 'react';

interface SlideItemProps {
    id?: string | number;
    movieApi?: any;
}
const SlideItem: React.FC<SlideItemProps> = ({ id, movieApi }) => {
    return (
        <span
            className={clsx(
                'block text-white dark:bg-[#ffffff0e] bg-[#ffffff91] rounded-sm cursor-pointer select-none',
                'min-h-[50%]', // height
                'min-[480px]:min-w-[33.333%] min-w-full', // width
            )}
        >
            {movieApi ? (
                <img
                    src={movieApi.src || ''}
                    className="object-cover object-center w-full h-full rounded-sm"
                    style={{ pointerEvents: 'none' }}
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
