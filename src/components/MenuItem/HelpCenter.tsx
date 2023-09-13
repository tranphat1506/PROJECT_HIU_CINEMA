'use client';
import { Box, IconButton } from '@mui/material';
import PopperMenu from '../Common/PopperMenu';
import { MouseEventHandler } from 'react';
import { SlQuestion } from 'react-icons/sl';
import useGlobalSetting from '@/hooks/useGlobalSetting';
import { PopperMenuProps } from '../Common/PopperMenu';
import MenuItem from './MenuItem';
import useLanguage from '@/hooks/useLanguage';

interface HelpCenterMenuItemProps {
    handleClick: MouseEventHandler;
}
const HelpCenterMenuItem: React.FC<HelpCenterMenuItemProps> = ({
    handleClick,
}) => {
    const [setting, dispatchSetting] = useGlobalSetting();
    const text = useLanguage();
    let helpCenter_Text = text('help_center');
    return (
        <MenuItem
            Icon={
                <IconButton sx={{ color: 'inherit' }}>
                    <SlQuestion className="text-[1.3rem]" />
                </IconButton>
            }
            handleClick={handleClick}
            title={helpCenter_Text}
        />
    );
};
const HelpCenterPopper: React.FC<PopperMenuProps> = (props) => {
    return (
        <PopperMenu {...props}>
            <Box component={'div'} className="w-full h-full">
                hi
            </Box>
        </PopperMenu>
    );
};

export { HelpCenterPopper };
export default HelpCenterMenuItem;
