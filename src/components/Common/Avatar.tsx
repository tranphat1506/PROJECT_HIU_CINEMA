import { Avatar } from '@mui/material';
function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
function stringAvatar(name: string, bgSize: string, fontSize: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: bgSize,
            height: bgSize,
            fontSize,
            fontFamily: 'inherit',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

interface AvatarProps {
    src?: string;
    stringName?: string;
    bgSize?: string;
    fontSize?: string;
}
const AvatarByString: React.FC<AvatarProps> = ({
    stringName = '',
    bgSize = '40px',
    fontSize = '1em',
}) => {
    return <Avatar {...stringAvatar(stringName, bgSize, fontSize)} />;
};

const AvatarBySrc: React.FC<AvatarProps> = ({ src = '', bgSize = '40px' }) => {
    return (
        <Avatar
            sx={{ width: bgSize, height: bgSize }}
            src={src}
            alt="User avatar"
        />
    );
};

export { AvatarByString, AvatarBySrc, Avatar };
