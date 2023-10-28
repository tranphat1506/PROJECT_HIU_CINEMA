import clsx from 'clsx';
import { memo } from 'react';
import { MdChair } from 'react-icons/md';
import ChairStatus from '@/test/API/ChairStatus.json';
type ChairProps = {
    isAlreadyBought: boolean;
    chairId: string;
    handleChooseChair: (
        chairId: string,
        statusThisChair?: boolean,
    ) => () => void;
    userChoose: { [id: string]: boolean };
};
type ChairRowProps = {
    userChoose: { [id: string]: boolean };
    handleChooseChair: (
        chairId: string,
        statusThisChair?: boolean,
    ) => () => void;
};
const ChairRow: React.FC<ChairRowProps> = ({
    handleChooseChair,
    userChoose,
}) => {
    let room = ChairStatus.cinema.room.test;
    return (
        <>
            {room.map((_, index) => {
                return (
                    <div
                        key={index}
                        className="mx-3 flex gap-x-2 gap-y-3 flex-nowrap justify-center"
                    >
                        {room[index].map((chair) => {
                            return (
                                <Chair
                                    key={chair.id}
                                    isAlreadyBought={chair.isBuy}
                                    chairId={chair.id}
                                    handleChooseChair={handleChooseChair}
                                    userChoose={userChoose}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
};
const Chair: React.FC<ChairProps> = memo(
    ({ isAlreadyBought = false, chairId, handleChooseChair, userChoose }) => {
        return (
            <div
                key={chairId}
                onClick={handleChooseChair(chairId, isAlreadyBought)}
                className={clsx(
                    'flex flex-col relative font-MP_Regular w-[40px] h-[40px] cursor-pointer text-[#3b3b3b] dark:text-white',
                    {
                        '!text-[#8165ff]': userChoose[chairId],
                        '!text-red-netflix': isAlreadyBought,
                    },
                )}
            >
                <MdChair className="text-[40px]" />
                <div className="text-[10px] inline-flex justify-center absolute z-10 text-white dark:text-black top-[4px] left-0 w-full">
                    {chairId}
                </div>
            </div>
        );
    },
);
export { Chair };
export default memo(ChairRow);
