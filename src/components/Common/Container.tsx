import clsx from 'clsx';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}
const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return (
        <div
            className={clsx(
                'flex items-center max-w-[2520px] mx-auto xl:px-8 px-5 w-full',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Container;
