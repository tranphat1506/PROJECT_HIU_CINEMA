import { ActionPayload } from './actions';
import {
    LOGIN_USER,
    CHANGE_SCREEN,
    CHANGE_LANGUAGE,
    CHANGE_APPEARANCE,
} from './constants';

export type User = {
    is_logging: boolean;
    last_logging: number;
    user_info: any | null;
};
export type DeviceDetail = {
    device: 'mobile' | 'tablet' | 'laptop' | 'pc';
    width: number | null;
    height: number | null;
    isLandscape: boolean;
};
export type GlobalSetting = {
    appearance: 'device' | 'dark' | 'light';
    language: string;
    currentUser: User;
    deviceDetail: DeviceDetail;
};
export const initState: GlobalSetting = {
    appearance: 'light',
    language: 'en',
    currentUser: {
        is_logging: false,
        last_logging: 0,
        user_info: null,
    },
    deviceDetail: {
        device: 'pc',
        width: null,
        height: null,
        isLandscape: false,
    },
};

const reducer: React.Reducer<GlobalSetting, ActionPayload> = (
    state: GlobalSetting,
    payload: ActionPayload,
): GlobalSetting => {
    let newState: GlobalSetting;
    const { type: actionType, payload: actionPayload }: ActionPayload = payload;
    switch (actionType) {
        case LOGIN_USER:
            newState = { ...state, currentUser: actionPayload as User };
            break;
        case CHANGE_SCREEN:
            newState = {
                ...state,
                deviceDetail: actionPayload as DeviceDetail,
            };
            break;
        case CHANGE_LANGUAGE:
            newState = {
                ...state,
                language: actionPayload as string,
            };
            break;
        case CHANGE_APPEARANCE:
            newState = {
                ...state,
                appearance: actionPayload as any,
            };
            break;
        default:
            throw Error('Invalid type!');
    }
    return newState;
};

export default reducer;
