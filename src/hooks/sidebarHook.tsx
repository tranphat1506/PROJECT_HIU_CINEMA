'use client';

import { useState, Dispatch, SetStateAction } from 'react';

export const useDefaultSidebarState = () => {
    return useState<boolean>(false);
};
export const defaultToggleSidebar =
    (open: boolean, setState: Dispatch<SetStateAction<boolean>>) =>
    (event: React.MouseEvent | React.KeyboardEvent) => {
        setState(open);
    };
