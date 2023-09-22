import { useEffect, useRef } from 'react';
import Container from '../Common/Container';
import Logo from './Logo';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import clsx from 'clsx';

export interface HeaderProps {
    autoHide?: boolean;
    fixed?: boolean;
}
const Header: React.FC<HeaderProps> = ({ autoHide = false, fixed = true }) => {
    const HeaderRef = useRef<HTMLDivElement>(null);
    const lastScroll = useRef<number>(0);
    useEffect(() => {
        if (!autoHide)
            return document.querySelector('html')?.classList.remove('onTop');
        window.addEventListener('scroll', () => {
            if (HeaderRef.current?.clientHeight !== undefined) {
                if (
                    window.scrollY - lastScroll.current <
                    -HeaderRef.current?.clientHeight
                ) {
                    lastScroll.current = window.scrollY;
                    return document
                        .querySelector('html')
                        ?.classList.add('onTop');
                }
                if (
                    window.scrollY > HeaderRef.current?.clientHeight &&
                    window.scrollY > lastScroll.current
                ) {
                    lastScroll.current = window.scrollY;
                    return document
                        .querySelector('html')
                        ?.classList.remove('onTop');
                }
            }
        });

        return () => {};
    }, []);
    return (
        <>
            <div
                ref={HeaderRef}
                id="header"
                className={clsx(
                    'z-50 h-auto py-2 w-screen bg-[#ffecd7] dark:bg-[#141414]',
                    {
                        fixed: fixed,
                    },
                )}
            >
                <Container className={'flex-col z-10'}>
                    <Logo className="absolute xl:px-8 px-3 lg:left-auto left-0 ml-16" />
                    <TopNav />
                    <BottomNav />
                </Container>
            </div>
        </>
    );
};

export default Header;
