import { IconButton, Tooltip, Menu, MenuItem, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import { RiMoonFoggyFill } from 'react-icons/ri';
import { BsFillSunFill } from 'react-icons/bs';
import { TbDeviceDesktop } from 'react-icons/tb';
import { TiTick } from 'react-icons/ti';

import useGlobalSetting from '@/hooks/useGlobalSetting';
import { changeAppearance } from '@/contexts/setting/actions';
import useLanguage from '@/hooks/useLanguage';
const Appearance = () => {
    const text = useLanguage();
    const [setting, settingDispatch] = useGlobalSetting();
    let appearance_Text = text('appearance');

    let openButtonRef = useRef<HTMLButtonElement | null>(null);

    const [open, setOpen] = useState<boolean>(false);
    const toggleOpenMenu = (status: boolean) => () => {
        return setOpen(status);
    };

    const handleChangeAppearance =
        (mode: 'device' | 'light' | 'dark') => () => {
            // @ts-ignore
            return settingDispatch(changeAppearance(mode));
        };

    return (
        <>
            <Tooltip arrow={true} title={appearance_Text}>
                <IconButton
                    id="appearance__btn"
                    size="medium"
                    className="dark:!text-white !text-red-500 dark:hover:!bg-[#ffffff17]"
                    ref={openButtonRef}
                    onClick={toggleOpenMenu(!open)}
                >
                    <RiMoonFoggyFill />
                </IconButton>
            </Tooltip>
            <Menu
                open={open}
                anchorEl={openButtonRef.current}
                onClose={toggleOpenMenu(false)}
                className="font-MP_Regular"
                slotProps={{
                    paper: {
                        className:
                            'dark:!bg-[#141414e3] !bg-[#ffffffdb] dark:text-white w-[180px]',
                    },
                }}
                transformOrigin={{
                    horizontal: 'center',
                    vertical: 'top',
                }}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom',
                }}
            >
                {['light', 'dark', 'device'].map((appearance) => {
                    return (
                        <MenuItem
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
                                    size="small"
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
                                <span>{text('appearance', appearance)}</span>
                            </Stack>
                            {setting?.appearance === appearance && (
                                <TiTick className="text-red-500" />
                            )}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
};

export default Appearance;
