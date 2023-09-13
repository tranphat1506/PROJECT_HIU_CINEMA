import { configLanguage } from '@/languages/';
import {
    LOGIN_USER,
    CHANGE_SCREEN,
    ActionConstant,
    CHANGE_LANGUAGE,
    CHANGE_APPEARANCE,
} from './constants';
import { User, DeviceDetail } from './reducer';
export type ActionPayload =
    | LoginUserPayload
    | ChangeScreenPayload
    | ChangeLanguagePayload
    | ChangeAppearancePayload;
export interface LoginUserPayload {
    type: ActionConstant;
    payload: User;
}
export interface ChangeScreenPayload {
    type: ActionConstant;
    payload: DeviceDetail;
}
export interface ChangeLanguagePayload {
    type: ActionConstant;
    payload: string;
}
export interface ChangeAppearancePayload {
    type: ActionConstant;
    payload: 'device' | 'light' | 'dark';
}

export const loginUser = (status: boolean): LoginUserPayload => {
    return {
        type: LOGIN_USER,
        payload: {
            is_logging: status,
            last_logging: Date.now(),
            user_info: {},
        },
    };
};
export const changeScreen = (
    width: number,
    height: number,
): ChangeScreenPayload => {
    let device: any;
    if (width <= 380) device = 'mobile';
    else if (width <= 640) device = 'tablet';
    else if (width <= 1280) device = 'laptop';
    else device = 'pc';
    return {
        type: CHANGE_SCREEN,
        payload: {
            device: device,
            width: width,
            height: height,
            isLandscape: width > height,
        },
    };
};
export const changeLanguage = (lang: string): ChangeLanguagePayload => {
    const { status } = configLanguage(lang);
    if (status === 'fail') lang = 'en';
    window.localStorage.setItem('@language', lang);
    return {
        type: CHANGE_LANGUAGE,
        payload: lang,
    };
};
const isDarkMode = () =>
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
export const changeAppearance = (
    mode: 'device' | 'light' | 'dark',
): ChangeAppearancePayload => {
    // check if not in type
    if (mode !== 'device' && mode !== 'light' && mode !== 'dark') mode = 'dark';
    // update to localstorage
    window.localStorage.setItem('@appearance', mode);

    // clear previous appearance
    document.querySelector('html')?.classList.remove('dark');
    document.querySelector('html')?.classList.remove('light');

    // change appearance
    if (mode === 'device' && isDarkMode())
        document.querySelector('html')?.classList.add('dark');
    else if (mode === 'device' && !isDarkMode())
        document.querySelector('html')?.classList.add('light');
    else document.querySelector('html')?.classList.add(mode);

    // return state
    return {
        type: CHANGE_APPEARANCE,
        payload: mode,
    };
};
