import { Box, Divider, IconButton } from '@mui/material';
import { MouseEventHandler } from 'react';
import { SlLogout, SlUser, SlWallet } from 'react-icons/sl';
import useGlobalSetting from '@/hooks/useGlobalSetting';
import MenuItem from './MenuItem';
import useLanguage from '@/hooks/useLanguage';

interface AuthMenuBoxProps {
    handleClick: MouseEventHandler;
}
const AuthMenuBox: React.FC<AuthMenuBoxProps> = ({ handleClick }) => {
    const text = useLanguage();
    const [setting, _] = useGlobalSetting();
    if (!setting?.currentUser.is_logging) {
        /* Text display */
        let signIn_Text = text('sign_in');
        let signUp_Text = text('sign_up');
        // -------------
        return (
            <Box component="div" className="md:hidden block">
                <MenuItem
                    className="!font-bold"
                    handleClick={handleClick}
                    title={signIn_Text}
                />
                <MenuItem handleClick={handleClick} title={signUp_Text} />
                <Divider />
            </Box>
        );
    }
    /* Text display */
    let accountSetting_Text = text('account_setting');
    let paymentSetting_Text = text('payment_setting');
    let logout_Text = text('logout');

    // -------------
    return (
        <>
            <MenuItem
                Icon={
                    <IconButton sx={{ color: 'inherit' }}>
                        <SlUser className="text-[1.3rem]" />
                    </IconButton>
                }
                handleClick={handleClick}
                title={accountSetting_Text}
            />
            <MenuItem
                Icon={
                    <IconButton sx={{ color: 'inherit' }}>
                        <SlWallet className="text-[1.3rem]" />
                    </IconButton>
                }
                handleClick={handleClick}
                title={paymentSetting_Text}
            />
            <MenuItem
                Icon={
                    <IconButton sx={{ color: 'inherit' }}>
                        <SlLogout className="text-[1.3rem]" />
                    </IconButton>
                }
                handleClick={handleClick}
                title={logout_Text}
            />
            <Divider />
        </>
    );
};
export default AuthMenuBox;
