import AuthButtonGroup from './AuthButtonGroup';
import Appearance from './Appearance';
import AvatarContainer from './AvatarContainer';
import Menu from './Menu';
import Logo from './Logo';
import ChooseCinema from '../Common/ChooseCinema';

const TopNav = () => {
    return (
        <div className="w-full flex items-center font-MP_Regular justify-between h-12">
            <div className="flex flex-row items-center gap-4">
                <Menu className="dark:text-white" />
                <Logo className="max-[380px]:hidden" />
                <ChooseCinema />
            </div>
            <div className="flex flex-row gap-4 items-center">
                <span className="md:flex hidden gap-4">
                    <AuthButtonGroup />
                </span>
                <AvatarContainer position="header" />
                <Appearance />
            </div>
        </div>
    );
};

export default TopNav;
