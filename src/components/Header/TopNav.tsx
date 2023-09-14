import AuthButtonGroup from './AuthButtonGroup';
import Appearance from './Appearance';
import HIULogo from '../Common/HIULogo';
import AvatarContainer from './AvatarContainer';
import Menu from './Menu';

const TopNav = () => {
    return (
        <div className="w-full flex items-center font-MP_Regular justify-between h-12">
            <div className="flex flex-row items-center">
                <Menu className="dark:text-white" />
                <HIULogo className="lg:flex hidden" />
            </div>
            <div className="flex flex-row gap-4 items-center">
                <span className="sm:flex hidden gap-4">
                    <Appearance />
                    <AuthButtonGroup />
                </span>
                <AvatarContainer position="header" />
            </div>
        </div>
    );
};

export default TopNav;
