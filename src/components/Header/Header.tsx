import { useEffect, useRef } from 'react';
import Container from '../Common/Container';
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import clsx from 'clsx';

export interface HeaderProps {
    autoHide?: boolean;
    fixed?: boolean;
}
const Header: React.FC<HeaderProps> = ({ autoHide = true, fixed = true }) => {
    const HeaderRef = useRef<HTMLDivElement>(null);
    const lastScroll = useRef<number>(0);
    useEffect(() => {
        if (autoHide) document.querySelector('html')?.classList.add('onTop');
        else document.querySelector('html')?.classList.remove('onTop');
    }, [autoHide]);
    useEffect(() => {
        window.onscroll = () => {
            if (!autoHide) return;
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
        };
        return () => {
            window.onscroll = () => {};
        };
    }, [autoHide]);
    return (
        <>
            <div
                ref={HeaderRef}
                id="header"
                className={clsx(
                    'z-50 h-auto py-2 w-full bg-[#ffecd7] dark:bg-[#141414]',
                    {
                        fixed: fixed,
                    },
                )}
            >
                <Container className={'flex-col z-10'}>
                    <TopNav />
                    <BottomNav />
                </Container>
            </div>
        </>
    );
};

export default Header;
