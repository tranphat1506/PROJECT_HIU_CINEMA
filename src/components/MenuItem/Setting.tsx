'use client';
import { Box, IconButton } from '@mui/material';
import PopperMenu from '../Common/PopperMenu';
import { MouseEventHandler } from 'react';
import { SlSettings } from 'react-icons/sl';
// import useGlobalSetting from '@/hooks/useGlobalSetting';
import { PopperMenuProps } from '../Common/PopperMenu';
import MenuItem from './MenuItem';
import useLanguage from '@/hooks/useLanguage';

interface SettingMenuItemProps {
    handleClick: MouseEventHandler;
}
const SettingMenuItem: React.FC<SettingMenuItemProps> = ({ handleClick }) => {
    // const [setting, dispatchSetting] = useGlobalSetting();
    const text = useLanguage();
    let setting_Text = text('setting');
    return (
        <MenuItem
            Icon={
                <IconButton sx={{ color: 'inherit' }}>
                    <SlSettings className="text-[1.3rem]" />
                </IconButton>
            }
            handleClick={handleClick}
            title={setting_Text}
        />
    );
};
const SettingPopper: React.FC<PopperMenuProps> = (props) => {
    return (
        <PopperMenu {...props}>
            <Box component={'div'} className="w-full h-full">
                hi
            </Box>
        </PopperMenu>
    );
};

export { SettingPopper };
export default SettingMenuItem;
