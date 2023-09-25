import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import BuyTicketApi from '@/test/API/BuyTicketApi.json';
import useGlobalSetting from '@/hooks/useGlobalSetting';
export interface PageProps {
    title?: string;
}
type PageDisplayType = {
    id: string;
    title: string;
};
interface BuyTicketPageProps extends PageProps {}
const BuyTicketPage: React.FC<BuyTicketPageProps> = ({
    title = 'Mua vé - HIU Cinemas',
}) => {
    document.title = title; // Set Title
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    const [setting, _] = useGlobalSetting();
    const PagesDisplayApi =
        BuyTicketApi.pages_display[
            setting?.language as keyof typeof BuyTicketApi.pages_display
        ];
    const [currentPageDisplay, setPageDisplay] =
        useState<PageDisplayType | null>(PagesDisplayApi[0]);
    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        setPageDisplay(JSON.parse(e.currentTarget.value));
    };
    return (
        <div className="max-w-[1700px] mx-auto w-full pt-6 h-[1000px]">
            <div className="mx-5 lg:mx-10">
                <div
                    className={clsx(
                        'flex flex-row w-full text-[#ef4444] dark:text-red-netflix font-MP_Bold',
                        {},
                    )}
                >
                    {Object.keys(PagesDisplayApi).map((id, index, arr) => {
                        const pageApi =
                            PagesDisplayApi[id as keyof typeof PagesDisplayApi];
                        return (
                            <button
                                key={id}
                                id={pageApi.id}
                                onClick={handleChangePage}
                                className={clsx(
                                    'basis-1/2 py-2 border-2 border-[#ef4444] dark:border-red-netflix',
                                    {
                                        'dark:bg-red-netflix bg-[#ef4444] text-[#FFECD7] dark:text-white':
                                            currentPageDisplay?.id ===
                                            pageApi.id,
                                        'rounded-l-xl': index === 0,
                                        'rounded-r-xl':
                                            index === arr.length - 1,
                                    },
                                )}
                                value={JSON.stringify(pageApi)}
                            >
                                <span className="uppercase">
                                    {pageApi.title}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BuyTicketPage;
