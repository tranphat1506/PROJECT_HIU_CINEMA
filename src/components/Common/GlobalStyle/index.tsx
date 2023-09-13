import './GlobalStyle.scss';
interface GlobalStyleProps {
    children: React.ReactNode;
}
const GlobalStyle: React.FC<GlobalStyleProps> = ({ children }) => {
    return <>{children}</>;
};

export default GlobalStyle;
