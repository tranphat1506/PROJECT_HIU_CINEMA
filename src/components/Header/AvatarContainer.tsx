import { useRef, useState } from 'react';
import {
    Button,
    Tooltip,
    Divider,
    Box,
    MenuList,
    IconButton,
} from '@mui/material';
import { AvatarBySrc } from '../Common/Avatar';
import { SlOptionsVertical } from 'react-icons/sl';
import PopperMenu, { PopperMenuProps } from '../Common/PopperMenu';
import NavSidebar, { NavSidebarProps } from '../Common/NavSidebar';
import SidebarLayoutDefault from '../SidebarLayouts/SidebarLayoutDefault';
import AppearanceMenuItem, { AppearanceSubMenu } from '../MenuItem/Appearance';
import LanguageMenuItem, { LanguageSubMenu } from '../MenuItem/Language';
import SettingMenuItem from '../MenuItem/Setting';
import HelpCenterMenuItem from '../MenuItem/HelpCenter';
import AuthMenuBox from '../MenuItem/AuthMenuBox';
import useGlobalSetting from '@/hooks/useGlobalSetting';
import useLanguage from '@/hooks/useLanguage';
interface AvatarContainerProps {
    position?: 'header' | 'bottom';
}
interface AccountMenuPopperProps {
    handleOpenSubMenu: (
        id: number | null,
    ) => (event: React.MouseEvent<HTMLElement>) => void;
}
const AccountMenuPopper: React.FC<AccountMenuPopperProps> = ({
    handleOpenSubMenu,
}) => {
    return (
        <Box
            component={'div'}
            className="my-[8px] h-full overflow-y-auto scroll-smooth font-MP_Regular"
        >
            <AuthMenuBox handleClick={handleOpenSubMenu(null)} />
            {/* Client display */}
            <AppearanceMenuItem handleClick={handleOpenSubMenu(0)} />
            <LanguageMenuItem handleClick={handleOpenSubMenu(1)} />
            <Divider /> {/* Setting and help */}
            <SettingMenuItem handleClick={handleOpenSubMenu(null)} />
            <HelpCenterMenuItem handleClick={handleOpenSubMenu(null)} />
        </Box>
    );
};

interface SubMenuContainerProps {
    idMenu: number | null;
    menuProps: PopperMenuProps | NavSidebarProps;
    handleBack: React.MouseEventHandler;
    typeMenu?: 'popper' | 'sidebar';
}
const SubMenuContainer: React.FC<SubMenuContainerProps> = ({
    idMenu,
    menuProps,
    handleBack,
    typeMenu = 'popper',
}) => {
    let MenuComponent: React.ReactNode | null = null;
    switch (idMenu) {
        case 0:
            MenuComponent = <AppearanceSubMenu handleBack={handleBack} />;
            break;
        case 1:
            MenuComponent = <LanguageSubMenu handleBack={handleBack} />;
            break;
        default:
            // if non match any menu
            return <></>;
    }
    if (typeMenu === 'sidebar') {
        return (
            <NavSidebar
                {...(menuProps as NavSidebarProps)}
                SidebarLayout={
                    <MenuList className="w-screen">{MenuComponent}</MenuList>
                }
            />
        );
    }
    return (
        <PopperMenu {...(menuProps as PopperMenuProps)}>
            <Box minWidth={300}>{MenuComponent}</Box>
        </PopperMenu>
    );
};

const AvatarContainer: React.FC<AvatarContainerProps> = ({
    position = 'header',
}) => {
    const text = useLanguage();
    const [setting, _] = useGlobalSetting();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const mainMenuButtonRef = useRef<HTMLButtonElement>(null);
    const [menuId, setMenuId] = useState<number | null>(null);
    const openMainMenu = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        return setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseSubMenu = (back: boolean) => () => {
        if (back) setAnchorEl(mainMenuButtonRef.current);
        setMenuId(null);
    };
    const handleOpenSubMenu = (id: number | null) => () => {
        setMenuId(id);
        setAnchorEl(null);
    };
    let accountSetting_Text = text('account_setting');
    if (position === 'header')
        return (
            <>
                <Tooltip arrow={true} title={accountSetting_Text}>
                    <IconButton
                        ref={mainMenuButtonRef}
                        onClick={handleClick}
                        size="small"
                    >
                        <AvatarBySrc bgSize="35px" />
                    </IconButton>
                </Tooltip>
                <PopperMenu
                    open={openMainMenu}
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                    position={position}
                    className="dark:!bg-[#141414e3] !bg-[#ffffffdb] dark:text-white"
                >
                    <AccountMenuPopper handleOpenSubMenu={handleOpenSubMenu} />
                </PopperMenu>
                <SubMenuContainer
                    typeMenu="popper"
                    idMenu={menuId}
                    menuProps={{
                        open: true,
                        anchorEl: mainMenuButtonRef.current,
                        handleClose: handleCloseSubMenu(false),
                        position: position,
                        transitionDuration: 600,
                        className:
                            'dark:!bg-[#141414e3] !bg-[#ffffffdb] dark:text-white',
                    }}
                    handleBack={handleCloseSubMenu(true)}
                />
            </>
        );

    return (
        <>
            <Tooltip arrow={true} title={accountSetting_Text}>
                <Button
                    ref={mainMenuButtonRef}
                    onClick={handleClick}
                    variant="outlined"
                    className="flex flex-row gap-2 py-1 text-[#808080] !border-[#ddd] rounded-3xl hover:shadow-md"
                    aria-controls={openMainMenu ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMainMenu ? 'true' : undefined}
                >
                    <SlOptionsVertical />
                    <AvatarBySrc bgSize="30px" />
                </Button>
            </Tooltip>
            {setting?.deviceDetail.device === 'mobile' ||
            setting?.deviceDetail.device === 'tablet' ? (
                <>
                    <NavSidebar
                        animationFrom="bottom"
                        open={openMainMenu}
                        handleClose={handleClose}
                        SidebarLayout={
                            <SidebarLayoutDefault
                                className="h-screen"
                                handleClose={handleClose}
                            >
                                <AccountMenuPopper
                                    handleOpenSubMenu={handleOpenSubMenu}
                                />
                            </SidebarLayoutDefault>
                        }
                    />
                    <SubMenuContainer
                        typeMenu="sidebar"
                        idMenu={menuId}
                        menuProps={
                            {
                                open: menuId !== null,
                                handleClose: handleCloseSubMenu(
                                    false,
                                ) as React.MouseEventHandler<HTMLElement>,
                                animationFrom: 'right',
                            } as NavSidebarProps
                        }
                        handleBack={handleCloseSubMenu(true)}
                    />
                </>
            ) : (
                <>
                    <PopperMenu
                        open={openMainMenu}
                        handleClose={handleClose}
                        anchorEl={anchorEl}
                        position={position}
                        className="dark:!bg-[#141414e3] !bg-[#ffffffdb] dark:text-white"
                    >
                        <AccountMenuPopper
                            handleOpenSubMenu={handleOpenSubMenu}
                        />
                    </PopperMenu>
                    <SubMenuContainer
                        typeMenu="popper"
                        idMenu={menuId}
                        menuProps={{
                            open: true,
                            anchorEl: mainMenuButtonRef.current,
                            handleClose: handleCloseSubMenu(false),
                            position: position,
                        }}
                        handleBack={handleCloseSubMenu(true)}
                    />
                </>
            )}
        </>
    );
};

export default AvatarContainer;
