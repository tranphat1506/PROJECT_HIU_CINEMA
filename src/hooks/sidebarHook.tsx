import { useState, Dispatch, SetStateAction } from 'react';

export const useDefaultSidebarState = () => {
    return useState<boolean>(false);
};
export const defaultToggleSidebar =
    (open: boolean, setState: Dispatch<SetStateAction<boolean>>) => () => {
        setState(open);
    };
