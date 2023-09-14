import { memo } from 'react';
import { FacebookSvg, GoogleMapSvg, InstagramSvg, YoutubeSvg } from './Svg';
import clsx from 'clsx';
interface SocialMediaContainerProps {
    width?: number | string;
    height?: number | string;
    className?: string;
}
export interface SvgDefaultProps {
    width?: number | string;
    height?: number | string;
    onClickCallback?: React.MouseEventHandler;
}
const SocialMediaContainer: React.FC<SocialMediaContainerProps> = ({
    width,
    height,
    className,
}) => {
    return (
        <div className={clsx('social-container', className)}>
            <a
                title="Facebook"
                className="social--link"
                href="https://www.facebook.com/"
                style={{ display: 'inline-block' }}
            >
                <FacebookSvg width={width} height={height} />
            </a>
            <a
                title="Instagram"
                className="social--link"
                href="https://www.instagram.com/"
                style={{ display: 'inline-block' }}
            >
                <InstagramSvg width={width} height={height} />
            </a>
            <a
                title="Youtube"
                className="social--link"
                href="https://www.youtube.com/"
                style={{ display: 'inline-block' }}
            >
                <YoutubeSvg width={width} height={height} />
            </a>
            <a
                title="Location"
                className="social--link"
                href="https://goo.gl/maps/jxYhxK7edqGXDRQx6/"
                style={{ display: 'inline-block' }}
            >
                <GoogleMapSvg width={width} height={height} />
            </a>
        </div>
    );
};

export default memo(SocialMediaContainer);
