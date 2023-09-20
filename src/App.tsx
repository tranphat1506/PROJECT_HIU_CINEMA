import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routers';
import React, { useEffect } from 'react';
import useGlobalSetting from './hooks/useGlobalSetting';
import {
    changeAppearance,
    changeLanguage,
    changeScreen,
} from './contexts/setting/actions';
function App() {
    const [_, settingDispatch] = useGlobalSetting();

    useEffect(() => {
        const getLanguage = window.localStorage.getItem('@language') || 'vn';
        const getAppearance =
            window.localStorage.getItem('@appearance') || 'device';
        // @ts-ignore
        settingDispatch(changeLanguage(getLanguage));
        // @ts-ignore
        settingDispatch(changeAppearance(getAppearance));
        // @ts-ignore
        settingDispatch(changeScreen(window.innerWidth, window.innerHeight));
    }, []);
    return (
        <Routes>
            {publicRoutes.map((route, index) => {
                const Page = route.page;
                const Layout = route.layout || React.Fragment;
                const { props: layoutProps } = route || {};
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout {...layoutProps}>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}
            {privateRoutes.map((route, index) => {
                const Page = route.page;
                const Layout = route.layout || React.Fragment;
                const { props: layoutProps } = route || {};
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout {...layoutProps}>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}
        </Routes>
    );
}

export default App;
