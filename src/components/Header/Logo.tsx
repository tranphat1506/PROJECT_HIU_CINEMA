import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface LogoProps {
    className?: string;
}
const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <div className={clsx(className)}>
            <Link
                to={'/home'}
                className={clsx(
                    'hiu-cinema__logo flex items-end bg-red-500 text-[#ffecd7] p-2 w-fit dark:text-white dark:bg-transparent rounded-md',
                )}
            >
                <div className="font-TitanOne flex items-center flex-row lg:mx-2 w-max">
                    <span className="text-[2rem] leading-none dark:text-[#E50914] block">
                        H
                    </span>
                    <img
                        src="3d-glasses.png"
                        alt="Popcorn image"
                        className="h-[2rem]"
                    />
                    <span className="text-[2rem] leading-none dark:text-[#E50914] block">
                        U
                    </span>
                </div>
                {/* <a href="https://www.flaticon.com/free-icons/cinema" title="cinema icons">Cinema icons created by Konkapp - Flaticon</a> */}
                <span className="font-TitanOne lg:text-[2rem] text-[1rem] leading-none dark:text-[#fff] sm:block hidden">
                    Cinema
                </span>
            </Link>
        </div>
    );
};

export default Logo;
