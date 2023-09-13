const HIULogo = () => {
    return (
        <a
            className="h-8 items-center gap-1 p-2 lg:flex hidden"
            href={'https://hiu.vn/'}
        >
            <img
                src="/Logo-HBU-32x32.png"
                alt="Logo-HBU-32x32"
                className="h-6"
            />
            <div className="hiulogo__title uppercase h-6 text-[12px] leading-none dark:text-white">
                <div className="font-bold">Hong Bang</div>
                <div>International University</div>
            </div>
        </a>
    );
};

export default HIULogo;
