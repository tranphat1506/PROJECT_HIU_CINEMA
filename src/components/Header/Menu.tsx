'use client';
import { useCallback } from 'react';

import { RxHamburgerMenu } from 'react-icons/rx';
import {
    Box,
    Divider,
    IconButton,
    MenuItem as MUI_MenuItem,
    MenuList,
} from '@mui/material';
import NavSidebar from '../Common/NavSidebar';
import {
    defaultToggleSidebar,
    useDefaultSidebarState,
} from '@/hooks/sidebarHook';
import SidebarLayoutDefault from '../SidebarLayouts/SidebarLayoutDefault';
import clsx from 'clsx';
import useLanguage from '@/hooks/useLanguage';
import NavItemApi from '@/test/API/NavItemApi.json';
import { Link } from 'react-router-dom';
import MenuItem from '../MenuItem/MenuItem';
import FontIcon from '../Common/FontIcon';
import { NavItemStructure } from './BottomNav';

const MenuContainer = () => {
    const text = useLanguage();
    const params = window.location.pathname;

    return (
        <MenuList className="menu__container h-full overflow-y-auto scroll-smooth flex flex-col gap-1">
            {Object.keys(NavItemApi).map((id) => {
                // @ts-ignore
                const navDetails: NavItemStructure = NavItemApi[id];
                const title_Text: string = text(navDetails.title);
                const to: string = navDetails.direct_url;
                const icon: string = navDetails.icon;
                return (
                    <Link key={id} to={to} className="relative px-4">
                        {to === params && (
                            <span className="bg-white dark:bg-[#141414] w-6 h-6 flex absolute z-10 rounded-full top-3 left-[2px]"></span>
                        )}
                        <MenuItem
                            className={clsx('!min-h-[48px]', {
                                '!bg-[#ef4444] dark:!bg-red-netflix cursor-default !rounded-md':
                                    to === params,
                            })}
                            key={id}
                            Icon={
                                <FontIcon
                                    icon={icon}
                                    className={clsx(
                                        'dark:text-white text-[#4b4b4b]',
                                        {
                                            '!text-white': to === params,
                                        },
                                    )}
                                    iconSize={'1.3rem'}
                                />
                            }
                            title={
                                <span
                                    className={clsx(
                                        'px-2 border-x-[1px] border-none dark:border-white font-MP_Medium dark:text-white text-[#4b4b4b]',
                                        {
                                            'border-[#FFECD7] !border-dashed !text-white':
                                                to === params,
                                        },
                                    )}
                                >
                                    <span className="capitalize text-lg">
                                        {title_Text}
                                    </span>
                                </span>
                            }
                        />
                        {to === params && (
                            <span className="bg-white dark:bg-[#141414] w-6 h-6 flex absolute z-10 rounded-full top-3 right-[2px]"></span>
                        )}
                    </Link>
                );
            })}
        </MenuList>
    );
};

interface MenuProps {
    className?: string;
}
const Menu: React.FC<MenuProps> = ({ className }) => {
    const [open, setOpen] = useDefaultSidebarState();
    const handleOpenSidebar = useCallback(defaultToggleSidebar(true, setOpen), [
        setOpen,
    ]);
    const handleCloseSidebar = useCallback(
        defaultToggleSidebar(false, setOpen),
        [setOpen],
    );

    return (
        <Box component={'div'} className={className}>
            <IconButton
                size="medium"
                id="menu__btn"
                color="inherit"
                onClick={handleOpenSidebar}
            >
                <RxHamburgerMenu />
            </IconButton>
            <NavSidebar
                open={open}
                handleClose={handleCloseSidebar}
                SidebarLayout={
                    <SidebarLayoutDefault
                        className="w-screen min-[380px]:w-80 dark:!bg-[#141414] !bg-[#ffffff94] dark:!text-white"
                        handleClose={handleCloseSidebar}
                        showLogo={true}
                    >
                        <MenuContainer />
                    </SidebarLayoutDefault>
                }
            />
        </Box>
    );
};

export default Menu;
