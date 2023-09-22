import { Link } from 'react-router-dom';
import NavItemApi from '@/test/API/NavItemApi.json';
import clsx from 'clsx';
import useLanguage from '@/hooks/useLanguage';
import MenuItem from '../MenuItem/MenuItem';
import FontIcon from '../Common/FontIcon';
export interface NavItemStructure {
    title: string;
    direct_url: string;
    icon: string;
}

const BottomNav = () => {
    const params = window.location.pathname;
    const text = useLanguage();
    return (
        <div
            id="bottom-nav"
            className="lg:flex hidden visible w-full justify-center"
        >
            {Object.keys(NavItemApi).map((id) => {
                const navDetails: NavItemStructure =
                    NavItemApi[id as keyof typeof NavItemApi];
                const title_Text: string = text(navDetails.title);
                const to: string = navDetails.direct_url;
                const icon: string = navDetails.icon;
                return (
                    <Link key={id} to={to} className="relative px-4">
                        {to === params && (
                            <span className="ticket-circle w-4 h-4 flex absolute z-10 rounded-full top-1 left-[5px] bg-[#FFECD7] dark:bg-[#141414]"></span>
                        )}
                        <MenuItem
                            className={clsx('!p-0 !px-2 !rounded-sm', {
                                '!bg-[#ef4444] dark:!bg-red-netflix cursor-default':
                                    to === params,
                            })}
                            key={id}
                            Icon={
                                <FontIcon
                                    icon={icon}
                                    className={clsx(
                                        'dark:text-white text-[#4b4b4b]',
                                        {
                                            'text-[#FFECD7]': to === params,
                                        },
                                    )}
                                    iconSize={'1.1rem'}
                                />
                            }
                            title={
                                <span
                                    className={clsx(
                                        'px-2 border-x-[1px] border-none dark:border-white font-MP_Medium dark:text-white text-[#4b4b4b]',
                                        {
                                            'border-[#FFECD7] !border-dashed text-[#FFECD7]':
                                                to === params,
                                        },
                                    )}
                                >
                                    <span className="capitalize">
                                        {title_Text}
                                    </span>
                                </span>
                            }
                        />
                        {to === params && (
                            <span className="ticket-circle w-4 h-4 flex absolute z-10 rounded-full top-1 right-[5px] bg-[#FFECD7] dark:bg-[#141414]"></span>
                        )}
                    </Link>
                );
            })}
        </div>
    );
};

export default BottomNav;
