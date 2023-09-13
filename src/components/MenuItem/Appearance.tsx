'use client';
import {
    Box,
    IconButton,
    MenuList,
    Stack,
    MenuItem as MUI_MenuItem,
} from '@mui/material';
import MenuItem from './MenuItem';
import { MouseEventHandler } from 'react';
import useGlobalSetting from '@/hooks/useGlobalSetting';
import clsx from 'clsx';
import { MdOutlineArrowBack } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import { changeAppearance } from '@/contexts/setting/actions';
import { RiMoonFoggyFill } from 'react-icons/ri';
import { BsFillSunFill } from 'react-icons/bs';
import { TbDeviceDesktop } from 'react-icons/tb';
import useLanguage from '@/hooks/useLanguage';

interface AppearanceMenuItemProps {
    handleClick: MouseEventHandler;
}
const AppearanceMenuItem: React.FC<AppearanceMenuItemProps> = ({
    handleClick,
}) => {
    const [setting, dispatchSetting] = useGlobalSetting();
    const text = useLanguage();
    let appearance_Text = text('appearance');
    let appearanceMode_Text = text('appearance', setting?.appearance);
    return (
        <MenuItem
            Icon={
                <IconButton
                    sx={{ color: 'inherit' }}
                    className="dark:!text-white"
                >
                    <RiMoonFoggyFill />
                </IconButton>
            }
            handleClick={handleClick}
            canExpand={true}
            title={`${appearance_Text}: ${appearanceMode_Text}`}
        />
    );
};
interface AppearanceSubMenuProps {
    handleBack: React.MouseEventHandler;
    className?: string;
}
const AppearanceSubMenu: React.FC<AppearanceSubMenuProps> = ({
    handleBack,
    className,
}) => {
    const [setting, dispatchSetting] = useGlobalSetting();
    const text = useLanguage();
    const handleChangeAppearance =
        (mode: 'device' | 'light' | 'dark') => (event: React.MouseEvent) => {
            // @ts-ignore
            dispatchSetting(changeAppearance(mode));
            handleBack(event);
        };
    return (
        <>
            <Box
                component={'div'}
                className={clsx('flex flex-col w-full', className)}
                id="appearance-setting"
                tabIndex={0}
            >
                <MenuList
                    component={Stack}
                    className="w-full h-auto !px-4"
                    flexDirection={'row'}
                    alignItems={'center'}
                    gap={'1rem'}
                    style={{ color: 'inherit' }}
                >
                    <IconButton
                        onClick={handleBack}
                        size="medium"
                        style={{ color: 'inherit' }}
                    >
                        <MdOutlineArrowBack />
                    </IconButton>
                    <span className="text-2xl font-bold px-[8px]">
                        {text('appearance')}
                    </span>
                </MenuList>

                <Box component={'div'} id="appearance-container">
                    {['light', 'dark', 'device'].map((appearance) => {
                        return (
                            <MUI_MenuItem
                                className="dark:hover:bg-[#ffffff1c] flex w-full !justify-between"
                                style={{ fontFamily: 'inherit' }}
                                key={appearance}
                                onClick={handleChangeAppearance(
                                    appearance as 'device' | 'light' | 'dark',
                                )}
                            >
                                <Stack
                                    direction={'row'}
                                    alignItems={'center'}
                                    gap={'0.6rem'}
                                >
                                    <IconButton
                                        style={{ color: 'inherit' }}
                                        size="medium"
                                    >
                                        {appearance === 'light' && (
                                            <BsFillSunFill />
                                        )}
                                        {appearance === 'dark' && (
                                            <RiMoonFoggyFill />
                                        )}
                                        {appearance === 'device' && (
                                            <TbDeviceDesktop />
                                        )}
                                    </IconButton>
                                    <span>
                                        {text('appearance', appearance)}
                                    </span>
                                </Stack>
                                {setting?.appearance === appearance && (
                                    <TiTick className="text-red-500" />
                                )}
                            </MUI_MenuItem>
                        );
                    })}
                </Box>
            </Box>
        </>
    );
};
export { AppearanceSubMenu };
export default AppearanceMenuItem;
