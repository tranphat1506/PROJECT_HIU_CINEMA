import clsx from 'clsx';

interface ComponentProps {
    className?: string;
    logoClassName?: string;
}
const HIULogo: React.FC<ComponentProps> = ({ className, logoClassName }) => {
    return (
        <a
            className={clsx(
                'h-8 items-center gap-1 p-2 inline-flex',
                className,
            )}
            href={'https://hiu.vn/'}
        >
            <img
                src="/Logo-HBU-32x32.png"
                alt="Logo-HBU-32x32"
                className="h-6"
            />
            <div
                className={clsx(
                    'hiulogo__title uppercase h-6 text-[12px] leading-none dark:text-white',
                    logoClassName,
                )}
            >
                <div className="font-bold">Hong Bang</div>
                <div>International University</div>
            </div>
        </a>
    );
};

export default HIULogo;
