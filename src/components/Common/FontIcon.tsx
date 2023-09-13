import clsx from 'clsx';

interface FontIconProps {
    icon?: string;
    iconSize?: string | number;
    className?: string;
}
type FontIconType = React.FC<FontIconProps>;
const FontIcon: FontIconType = ({ icon, iconSize = '1.3rem', className }) => {
    const size = typeof iconSize === 'number' ? `${iconSize}px` : iconSize;
    return (
        <span
            className={clsx(`${icon}`, className)}
            style={{ fontSize: size, lineHeight: size }}
        ></span>
    );
};

export default FontIcon;
