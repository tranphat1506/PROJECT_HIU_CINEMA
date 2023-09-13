import { Menu, Box } from '@mui/material';
import { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

export type PopperMenuProps = {
    open: boolean;
    handleClose: MouseEventHandler | KeyboardEventHandler;
    anchorEl: HTMLElement | null;
    children?: ReactNode;
    className?: string;
    id?: string;
    position?: 'header' | 'bottom';
};

const PopperMenu: React.FC<PopperMenuProps> = ({
    open,
    handleClose,
    anchorEl,
    children,
    className,
    id,
    position = 'header',
}) => {
    return (
        <Menu
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            id={id}
            slotProps={{ paper: { className: className } }}
            transformOrigin={{
                horizontal: 'right',
                vertical: position === 'header' ? 'top' : 'bottom',
            }}
            anchorOrigin={{
                horizontal: 'right',
                vertical: position === 'header' ? 'bottom' : 'top',
            }}
        >
            <Box component="div" sx={{ fontFamily: 'inherit' }}>
                {children}
            </Box>
        </Menu>
    );
};

export default PopperMenu;
