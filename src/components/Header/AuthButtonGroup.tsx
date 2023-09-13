import { Button, Tooltip } from '@mui/material';
import useLanguage from '@/hooks/useLanguage';
const AuthButtonGroup = () => {
    const text = useLanguage();
    // text var
    const signIn_Text = text('sign_in');
    const signUp_Text = text('sign_up');
    return (
        <div className="gap-4 font-MP_Bold flex uppercase">
            <Tooltip
                arrow={true}
                title={signIn_Text}
                style={{ fontFamily: 'inherit' }}
            >
                <Button
                    variant="text"
                    sx={{
                        fontFamily: 'inherit',
                        textTransform: 'inherit',
                    }}
                    color="inherit"
                    className="auth-btn !rounded-full !bg-red-500 dark:!bg-red-netflix !px-4 hover:shadow-xl"
                >
                    <span className="text-[#FFECD7] dark:text-white auth-btn__title">
                        {signIn_Text}
                    </span>
                </Button>
            </Tooltip>
            <Tooltip
                arrow={true}
                title={signUp_Text}
                style={{ fontFamily: 'inherit' }}
            >
                <Button
                    variant="outlined"
                    sx={{ fontFamily: 'inherit', textTransform: 'inherit' }}
                    color="inherit"
                    className="auth-btn !border-red-500 dark:!bg-white dark:!text-red-netflix dark:!border-none"
                >
                    <span className="text-red-500 auth-btn__title">
                        {signUp_Text}
                    </span>
                </Button>
            </Tooltip>
        </div>
    );
};

export default AuthButtonGroup;
