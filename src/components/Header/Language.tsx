import { supportLanguage } from '@/languages';
import clsx from 'clsx';
import { Tooltip } from '@mui/material';
import useGlobalSetting from '@/hooks/useGlobalSetting';
import { changeLanguage } from '@/contexts/setting/actions';
import useLanguage from '@/hooks/useLanguage';
const Language = () => {
    const [setting, settingDispatch] = useGlobalSetting();
    const text = useLanguage();
    const handleChangeLanguage =
        (newLanguage: string) => (event: React.MouseEvent<HTMLElement>) => {
            // @ts-ignore
            settingDispatch(changeLanguage(newLanguage));
        };
    return (
        <div>
            {Object.keys(supportLanguage).map(
                (language, index, languageList) => {
                    const language_Text = language.toUpperCase();
                    return (
                        <Tooltip
                            title={text('language', language)}
                            key={language}
                        >
                            <button
                                key={language}
                                onClick={handleChangeLanguage(language)}
                                className={clsx(
                                    'dark:text-white text-black text-sm dark:hover:!bg-[#ffffff17]',
                                )}
                            >
                                <span
                                    className={clsx(
                                        {
                                            underline:
                                                language === setting?.language,
                                            'border-r-[1px] border-black dark:border-white':
                                                index + 1 !==
                                                languageList.length,
                                        },
                                        'px-2',
                                    )}
                                >
                                    {language_Text}
                                </span>
                            </button>
                        </Tooltip>
                    );
                },
            )}
        </div>
    );
};

export default Language;
