import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routers';
import React, { useEffect } from 'react';
import useGlobalSetting from './hooks/useGlobalSetting';
import {
    changeAppearance,
    changeCinemaLocation,
    changeLanguage,
    changeScreen,
} from './contexts/setting/actions';
import { useCookies } from 'react-cookie';
function App() {
    const [_, settingDispatch] = useGlobalSetting();
    const [cookie] = useCookies(['@cinema-id']);
    useEffect(() => {
        if (settingDispatch) {
            const getLanguage =
                window.localStorage.getItem('@language') || 'vn';
            const getAppearance =
                (window.localStorage.getItem('@appearance') as any) || 'device';
            // Set Language
            settingDispatch(changeLanguage(getLanguage));
            // Set Appearance Mode
            settingDispatch(changeAppearance(getAppearance));
            // Set Device
            settingDispatch(
                changeScreen(window.innerWidth, window.innerHeight),
            );
            // Set Cinema Location
            if (!!cookie['@cinema-id'])
                settingDispatch(changeCinemaLocation(cookie['@cinema-id']));
        }
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
