import { Link } from 'react-router-dom';
import HIULogo from '../Common/HIULogo';
import SocialContainer from '../Common/SocialContainer';
import FooterMemberApi from '@/test/API/FooterMemberApi.json';
import useLanguage from '@/hooks/useLanguage';
const Footer = () => {
    const text = useLanguage();
    return (
        <footer className="h-full bg-[#fff] shadow-inner dark:bg-[#141414] w-full font-MP_Regular text-[#141414] dark:text-[#c4c4c4]">
            <div className="max-w-[1700px] mx-auto min-h-[400px] flex flex-col justify-end p-4 gap-4">
                <div id="social-media" className="w-full">
                    <SocialContainer
                        width={40}
                        className="flex gap-8 md:w-3/4 w-full mb-4 mx-auto"
                    />
                </div>
                <div
                    id="footer-member"
                    className="md:w-3/4 w-full mx-auto flex flex-wrap items-center justify-start"
                >
                    {Object.keys(FooterMemberApi).map((memberId) => {
                        const member =
                            FooterMemberApi[
                                memberId as keyof typeof FooterMemberApi
                            ];
                        return (
                            <span
                                key={memberId}
                                className="md:basis-1/3 min-[380px]:basis-1/2 basis-full lg:basis-1/4 md:m-0 my-1"
                            >
                                <Link to={member.to}>{text(member.title)}</Link>
                            </span>
                        );
                    })}
                </div>
                <div
                    id="copyright"
                    className="md:w-3/4 mx-auto w-full flex flex-wrap items-end justify-between gap-4"
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
