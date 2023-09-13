import { Box, IconButton } from '@mui/material';
import Container from '../Common/Container';
import { TfiClose } from 'react-icons/tfi';
import clsx from 'clsx';
import Logo from '../Header/Logo';

interface SidebarLayoutDefaultProps {
    handleClose: React.MouseEventHandler | React.KeyboardEventHandler;
    children?: React.ReactNode;
    className?: string;
    showLogo?: boolean;
}
const SidebarLayoutDefault: React.FC<SidebarLayoutDefaultProps> = ({
    handleClose,
    className,
    children,
    showLogo = false,
}) => {
    return (
        <Box
            component={'div'}
            onKeyDown={handleClose as React.KeyboardEventHandler}
            className={clsx(
                'w-full flex flex-col overflow-hidden h-full',
                className,
            )}
        >
            <Container className="shadow-sm">
                <div className="inline-flex flex-row items-center gap-3 h-20 w-full">
                    <IconButton
                        size="small"
                        id="close-button"
                        className="min-w-min"
                        color="inherit"
                        onClick={handleClose as React.MouseEventHandler}
                    >
                        <TfiClose />
                    </IconButton>
                    {showLogo && <Logo />}
                </div>
            </Container>
            {children}
        </Box>
    );
};

export default SidebarLayoutDefault;
