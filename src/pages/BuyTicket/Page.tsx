import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
export interface PageProps {
    title?: string;
}

interface BuyTicketPageProps extends PageProps {}
const BuyTicketPage: React.FC<BuyTicketPageProps> = ({
    title = 'Mua vé - HIU Cinema',
}) => {
    document.title = title; // Set Title
    return (
        <div className="w-full h-full pt-4 bg-white">
            <div className="mx-5 lg:mx-10">
                <Breadcrumbs
                    separator={<HiOutlineChevronRight />}
                    aria-aria-label="breadcrumb"
                >
                    <Link to={'home'}>
                        <span className="text-MP_Regular hover:underline">
                            Home
                        </span>
                    </Link>
                    <Typography
                        color={'text.primary'}
                        className="text-MP_Regular"
                    >
                        Buy Ticket
                    </Typography>
                </Breadcrumbs>
                <div className="flex flex-row w-full border-[#ef4444] border-2 text-[#ef4444] rounded-xl">
                    <button className="basis-1/2 py-2 border-r-2 border-[#ef4444]">
                        <span className="uppercase">Chọn theo rạp</span>
                    </button>
                    <button className="basis-1/2 py-2">
                        <span className="uppercase">Chọn theo phim</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyTicketPage;
