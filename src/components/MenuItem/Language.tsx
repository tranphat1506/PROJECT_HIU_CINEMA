import { Box, IconButton, Stack, MenuList } from '@mui/material';
import { MouseEventHandler } from 'react';
import { supportLanguage } from '@/languages';
import useGlobalSetting from '@/hooks/useGlobalSetting';
import { HiLanguage } from 'react-icons/hi2';
import { MdOutlineArrowBack } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import MenuItem from './MenuItem';
import { changeLanguage } from '@/contexts/setting/actions';
import clsx from 'clsx';
import useLanguage from '@/hooks/useLanguage';
interface LanguageMenuItemProps {
    handleClick: MouseEventHandler;
}
const LanguageMenuItem: React.FC<LanguageMenuItemProps> = ({ handleClick }) => {
    const [setting, _] = useGlobalSetting();
    const text = useLanguage();
    let language_Text = text('language');
    let languageMode_Text = text('language', setting?.language);
    return (
        <MenuItem
            Icon={
                <IconButton sx={{ color: 'inherit' }}>
                    <HiLanguage className="text-[1.3rem]" />
                </IconButton>
            }
            handleClick={handleClick}
            canExpand={true}
            title={
                <span className="flex flex-row items-center gap-2">
                    <span>{language_Text}:</span>
                    <img
                        src={`/${setting?.language}_flag.png`}
                        alt={languageMode_Text}
                    ></img>
                </span>
            }
        />
    );
};
interface LanguageSubMenuProps {
    handleBack: React.MouseEventHandler;
    className?: string;
}
const LanguageSubMenu: React.FC<LanguageSubMenuProps> = ({
    handleBack,
    className,
}) => {
    const [setting, dispatchSetting] = useGlobalSetting();
    const text = useLanguage();
    const handleChangeLanguage =
        (newLanguage: string) => (event: React.MouseEvent) => {
            // @ts-ignore
            dispatchSetting(changeLanguage(newLanguage));
            handleBack(event);
            window.location.reload();
        };
    return (
        <>
            <Box
                component={'div'}
                className={clsx('flex flex-col w-full', className)}
                id="language-setting"
                tabIndex={0}
            >
                <MenuList
                    component={Stack}
                    className="w-full h-auto !px-4"
                    flexDirection={'row'}
                    alignItems={'center'}
                    gap={'1rem'}
                    style={{ color: 'inherit' }}
                >
                    <IconButton
                        onClick={handleBack}
                        size="medium"
                        style={{ color: 'inherit' }}
                    >
                        <MdOutlineArrowBack />
                    </IconButton>
                    <span className="text-xl font-bold px-[8px]">
                        {text('setting_language')}
                    </span>
                </MenuList>

                <Box component={'div'} className="m-0" id="language-container">
                    {Object.keys(supportLanguage).map((language) => {
                        return (
                            <MenuItem
                                key={language}
                                handleClick={handleChangeLanguage(language)}
                                className="border-none rounded-md text-lg justify-between"
                                title={
                                    <span>{text('language', language)}</span>
                                }
                                Icon={
                                    <IconButton>
                                        <img
                                            src={`/${language}_flag.png`}
                                            alt={`${text(
                                                'language',
                                                language,
                                            )}`}
                                        ></img>
                                    </IconButton>
                                }
                                canExpand
                                BeforeExpandIcon={
                                    language === setting?.language && (
                                        <TiTick className="text-red-500" />
                                    )
                                }
                                AfterExpandIcon={false}
                            />
                        );
                    })}
                </Box>
            </Box>
        </>
    );
};

export { LanguageSubMenu };
export default LanguageMenuItem;
