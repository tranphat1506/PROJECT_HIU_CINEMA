import './styles/index.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { SettingProvider } from './contexts/setting/index.tsx';
import GlobalStyle from './components/Common/GlobalStyle/index.tsx';
import { CookiesProvider } from 'react-cookie';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
                <GlobalStyle>
                    <SettingProvider>
                        <App />
                    </SettingProvider>
                </GlobalStyle>
            </CookiesProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
