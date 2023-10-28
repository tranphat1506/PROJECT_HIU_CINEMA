import useLanguage from '@/hooks/useLanguage';
import clsx from 'clsx';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { PiDotBold } from 'react-icons/pi';

type RatingButtonProps = {
    rate?: number;
    maxRate?: number;
    handleOpenMenu?: React.MouseEventHandler;
};
const RatingButton: React.FC<RatingButtonProps> = ({
    maxRate = 10,
    rate,
    handleOpenMenu,
}) => {
    let text = useLanguage();
    let rate_Text = text('rating');
    return (
        <button
            onClick={handleOpenMenu}
            className="inline-flex items-center gap-2 cursor-pointer dark:hover:bg-[#ffffff1e] hover:bg-[#7373731f] px-2 py-[1px] rounded h-full"
        >
            {rate ? (
                <>
                    <BsStarFill className="text-[#8165ff] text-xl" />
                    <span>
                        <span className="text-xl font-MP_Bold">{rate}</span>
                        <span className="text-base dark:text-[#ffffffb2] text-[#6a6a6a]">
                            {'/' + maxRate}
                        </span>
                    </span>
                </>
            ) : (
                <>
                    <BsStar className="text-[#8165ff] text-2xl" />
                    <span>
                        <span className="text-xl text-[#8165ff]">
                            {rate_Text}
                        </span>
                    </span>
                </>
            )}
        </button>
    );
};

type MovieRatingButtonProps = RatingButtonProps & {
    direction?: 'col' | 'row';
    totalRates?: number;
    href?: string;
};
const MovieRatingButton: React.FC<MovieRatingButtonProps> = ({
    maxRate = 10,
    rate,
    direction = 'col',
    totalRates,
    href = '',
}) => {
    let text = useLanguage();
    let noneRating_Text = text('rating', 'none');
    let rate_Text = text('rating');
    return (
        <a
            href={href}
            className="inline-flex items-center gap-2 cursor-pointer dark:hover:bg-[#ffffff1e] hover:bg-[#7373731f] px-2 py-[1px] rounded"
        >
            <BsStarFill className="text-[#ffce65] text-xl" />
            <span
                className={clsx('inline-flex items-center', {
                    'flex-col': direction === 'col',
                    'flex-row': direction === 'row',
                })}
            >
                <span>
                    <span className="text-xl font-MP_Bold">{rate || 0}</span>
                    <span className="text-base dark:text-[#ffffffb2] text-[#6a6a6a]">
                        {'/' + maxRate}
                    </span>
                </span>
                {direction === 'row' && (
                    <span className="flex items-center">
                        <PiDotBold className="h-full dark:text-[#ffffffb2] text-[#6a6a6a]" />
                    </span>
                )}
                <span className="text-base dark:text-[#ffffffb2] text-[#6a6a6a]">
                    {totalRates + ' ' + rate_Text.toLowerCase() ||
                        noneRating_Text}
                </span>
            </span>
        </a>
    );
};
export { MovieRatingButton };
export default RatingButton;
