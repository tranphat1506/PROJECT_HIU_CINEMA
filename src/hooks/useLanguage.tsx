import { textByAnotherLang } from '@/languages';
import useGlobalSetting from './useGlobalSetting';

const useLanguage = () => {
    const [setting, _] = useGlobalSetting();
    return (text?: string, subText?: string) => {
        if (!subText) return textByAnotherLang(setting?.language, text);
        return textByAnotherLang(setting?.language, text, subText);
    };
};

export default useLanguage;
