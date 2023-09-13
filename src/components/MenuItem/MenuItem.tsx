import { Box, MenuItem as MUI_MenuItem, Stack } from '@mui/material';
import { Fragment, useState } from 'react';
import { SlArrowDown, SlArrowRight } from 'react-icons/sl';
import PopperMenu from '../Common/PopperMenu';
interface MenuItemProps {
    handleClick?: React.MouseEventHandler;
    title?: string | React.ReactNode;
    Icon?: React.ReactNode;
    className?: string;
    canExpand?: boolean;
    BeforeExpandIcon?: React.ReactNode;
    AfterExpandIcon?: React.ReactNode;
    MenuContent?: React.ReactNode;
    typeExpandMenu?: 'popper' | 'default';
    typeMenu?: 'button' | 'menu_item';
    spacingTitle?: string;
    expandMenuProps?: any;
}
const MenuItem: React.FC<MenuItemProps> = ({
    handleClick,
    title,
    Icon,
    className,
    canExpand = false,
    BeforeExpandIcon = <SlArrowRight className="text-[0.7rem]" />,
    AfterExpandIcon = <SlArrowDown className="text-[0.7rem]" />,
    MenuContent,
    typeExpandMenu = 'default',
    expandMenuProps,
    typeMenu = 'menu_item',
    spacingTitle = '0.6rem',
}) => {
    const MenuComponent: React.FC<any> =
        typeMenu === 'menu_item' ? MUI_MenuItem : Box;
    if (!canExpand) {
        return (
            <MenuComponent
                className={className}
                onClick={handleClick}
                sx={{ fontFamily: 'inherit' }}
            >
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    gap={!Icon || !title ? 0 : spacingTitle}
                >
                    {!!Icon && Icon}
                    {!!title && <span>{title}</span>}
                </Stack>
            </MenuComponent>
        );
    }
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const expand = Boolean(anchorEl);
    const toggleExpand =
        (open: boolean) => (event: React.MouseEvent<HTMLElement>) => {
            if (!open) return setAnchorEl(null);
            setAnchorEl(event.currentTarget);
        };
    return (
        <Fragment>
            <MenuComponent
                className={className}
                sx={{ fontFamily: 'inherit' }}
                onClick={handleClick || toggleExpand(!expand)}
            >
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    width={'100%'}
                    alignItems={'center'}
                    gap={canExpand && '1.5rem'}
                >
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        gap={!Icon || !title ? 0 : spacingTitle}
                    >
                        {!!Icon && Icon}
                        {!!title && <span>{title}</span>}
                    </Stack>
                    {!expand && BeforeExpandIcon}
                    {expand && AfterExpandIcon}
                </Stack>
            </MenuComponent>
            {expand && typeExpandMenu === 'default' && MenuContent}
            {expand && typeExpandMenu === 'popper' && (
                <PopperMenu
                    open={expand}
                    handleClose={toggleExpand(false)}
                    anchorEl={anchorEl}
                    position={expandMenuProps?.position}
                >
                    {MenuContent}
                </PopperMenu>
            )}
        </Fragment>
    );
};

export default MenuItem;
