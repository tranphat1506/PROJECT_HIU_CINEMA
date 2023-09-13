import './styles/index.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { SettingProvider } from './contexts/setting/index.tsx';
import GlobalStyle from './components/Common/GlobalStyle/index.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <GlobalStyle>
                <SettingProvider>
                    <App />
                </SettingProvider>
            </GlobalStyle>
        </BrowserRouter>
    </React.StrictMode>,
);
