import { Link } from 'react-router-dom';
import HIULogo from '../Common/HIULogo';
import SocialContainer from '../Common/SocialContainer';

const Footer = () => {
    return (
        <footer className="h-[400px] bg-[#fff] shadow-inner dark:bg-[#141414] w-full font-MP_Regular text-[#141414] dark:text-[#c4c4c4]">
            <div className="h-full flex flex-col justify-end max-w-[2520px] mx-auto px-4">
                <div id="social-media" className="w-full">
                    <SocialContainer
                        width={40}
                        className="flex gap-8 md:w-3/4 w-full mb-4 mx-auto"
                    />
                </div>
                <div
                    id="footer-nav"
                    className="md:w-3/4 w-full mb-4 mx-auto flex flex-wrap items-center justify-between"
                >
                    <span className="md:basis-1/3 sm:basis-1/2 basis-full lg:basis-1/4 md:m-0 mx-2 my-1">
                        <Link to={''}>Điều khoản sử dụng</Link>
                    </span>
                    <span className="md:basis-1/3 sm:basis-1/2 basis-full lg:basis-1/4 md:m-0 mx-2 my-1">
                        <Link to={''}>Quyền riêng tư</Link>
                    </span>
                    <span className="md:basis-1/3 sm:basis-1/2 basis-full lg:basis-1/4 md:m-0 mx-2 my-1">
                        <Link to={''}>Liên hệ chúng tôi</Link>
                    </span>
                </div>
                <div
                    id="copyright"
                    className="md:w-3/4 mx-auto w-full flex flex-wrap items-end justify-between gap-4 mb-4"
                >
                    <HIULogo className="!text-black dark:!text-white !p-0" />
                    <a
                        href="https://www.flaticon.com/free-icons/cinema"
                        title="cinema icons"
                        className=""
                    >
                        &copy; Cinema icons created by Freepik - Flaticon
                    </a>
                    <span className="">
                        &copy; 2023 lechautranphat@gmail.com.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
