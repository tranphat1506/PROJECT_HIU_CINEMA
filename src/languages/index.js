'use client';
import languages from './v1/languages.json';
export const supportLanguage = {
    vn: true,
    en: true,
};
let currentLanguage = 'en';
const textByAnotherLang = (lang = currentLanguage, item, subItem) => {
    if (subItem) return languages[lang][item][subItem];
    return languages[lang][item]?.text;
};
/**
 * @default Default language: "EN"
 * @returns Language string
 */
const configLanguage = (lang = 'en') => {
    if (!supportLanguage[lang])
        return {
            status: 'fail',
            message: `${languages[currentLanguage].setting_language.text}: ${languages[currentLanguage].setting_language.fail}`,
        };
    currentLanguage = lang;
    return {
        status: 'success',
        message: `${languages[currentLanguage].setting_language.text}: ${languages[currentLanguage].setting_language.success}`,
    };
};
export { configLanguage, textByAnotherLang, currentLanguage };
