import { Drawer } from '@mui/material';

export interface NavSidebarProps {
    open: boolean;
    handleClose: React.MouseEventHandler;
    SidebarLayout: React.ReactNode;
    animationFrom?: 'left' | 'right' | 'top' | 'bottom';
    className?: string;
    transitionDuration?: number;
}
const NavSidebar: React.FC<NavSidebarProps> = ({
    open,
    handleClose,
    SidebarLayout,
    animationFrom = 'left',
    className,
    transitionDuration = 300,
}) => {
    return (
        <Drawer
            transitionDuration={transitionDuration}
            anchor={animationFrom}
            open={open}
            onClose={handleClose}
            className={className}
        >
            {SidebarLayout}
        </Drawer>
    );
};

export default NavSidebar;
