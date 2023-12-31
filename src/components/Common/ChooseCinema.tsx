import {
    Button,
    Dialog,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi';
import ChooseCinemaApi from '@/test/API/ChooseCinemaApi.json';
import useGlobalSetting from '@/hooks/useGlobalSetting';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import useLanguage from '@/hooks/useLanguage';
import { changeCinemaLocation } from '@/contexts/setting/actions';
import { useCookies } from 'react-cookie';
export type CinemaType = {
    id: string;
    name: { en: string; vn: string };
    region: string;
    city_id: string;
    district_id: string;
    google_map_link?: string;
} | null;
const DEFAULT_REGION = 'vietnam';
type ChooseCinemaProps = {
    autoHide?: boolean;
    autoHideLocation?: boolean;
};
const ChooseCinema: React.FC<ChooseCinemaProps> = ({
    autoHide = false,
    autoHideLocation = true,
}) => {
    const [CinemasPlacesApi, setCinemasPlacesApi] = useState<any>();
    const [CitiesApi, setCitiesApi] = useState<any>();
    // Fetch Api
    useEffect(() => {
        const fakeFetchApi = setTimeout(() => {
            setCitiesApi(ChooseCinemaApi.regions[DEFAULT_REGION].citiesApi);
            setCinemasPlacesApi(ChooseCinemaApi.location);
            clearTimeout(fakeFetchApi);
        }, 2000);

        return () => {
            clearTimeout(fakeFetchApi);
        };
    }, []);
    const text = useLanguage();
    const [_, setCookie, __] = useCookies(['@cinema-id']);
    const [setting, settingDispatch] = useGlobalSetting();
    const choosingCinema_Text = text('choosing_cinema');
    const choosingCinema2_Text = text('choosing_cinema', 'choose_cinema');
    const choosingCity_Text = text('choosing_cinema', 'choose_city');
    const choosingDistrict_Text = text('choosing_cinema', 'choose_district');
    const all_Text = text('all');

    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [cinema, setCinema] = useState<CinemaType>(null);
    // Check current cinema location is valid
    useEffect(() => {
        if (!CinemasPlacesApi) return;
        if (setting?.cinemaLocation && CinemasPlacesApi[setting.cinemaLocation])
            setCinema(CinemasPlacesApi[setting.cinemaLocation] as CinemaType);
        else setOpenMenu(autoHide);
    }, [CinemasPlacesApi]);

    const [cityId, setCityId] = useState<string>('all');
    const [districtId, setDistrictId] = useState<string>('all');

    const handleOpenMenu = (open: boolean) => () => {
        setOpenMenu(open);
    };

    const handleChangeCinema = (event: SelectChangeEvent) => {
        const cinemaApi: CinemaType = JSON.parse(event.target.value);
        if (!cinemaApi || !settingDispatch) return;
        setCinema(cinemaApi);
        settingDispatch(changeCinemaLocation(cinemaApi.id));
        setCookie('@cinema-id', cinemaApi.id, {
            maxAge: 86400, // seconds => 1day
        });
    };

    const handleChangeCity = (event: SelectChangeEvent) => {
        setDistrictId('all');
        setCinema(null);
        setCityId(event.target.value);
    };

    const handleChangeDistrict = (event: SelectChangeEvent) => {
        setCinema(null);
        setDistrictId(event.target.value);
    };

    return (
        <>
            <button
                onClick={handleOpenMenu(!openMenu)}
                className="choose-cinema outline-none font-MP_Medium rounded py-1 text-[#4b4b4b] dark:text-white dark:bg-transparent"
            >
                <span className="flex flex-row items-center flex-nowrap px-1">
                    <HiLocationMarker className="text-sm h-full" />
                    <span
                        className={clsx('px-1 text-lg', {
                            'lg:inline-block hidden': autoHideLocation,
                            'inline-block': !autoHideLocation,
                        })}
                    >
                        {!cinema
                            ? choosingCinema2_Text
                            : cinema.name[
                                  setting?.language as keyof typeof cinema.name
                              ]}
                    </span>
                    <MdOutlineKeyboardArrowDown className="text-sm h-full" />
                </span>
            </button>
            {CinemasPlacesApi && CitiesApi && (
                <Dialog
                    id="choose-cinema-menu"
                    open={openMenu}
                    onClose={handleOpenMenu(false)}
                    PaperProps={{
                        className:
                            'max-[380px]:!rounded-none max-[380px]:!m-0 max-[380px]:min-h-full !rounded-xl dark:bg-[#141414]',
                    }}
                >
                    <DialogTitle
                        className="!font-MP_Bold max-[380px]:!my-10 !my-5 max-[380px]:!text-[1.6rem] max-[380px]:w-full w-5/6 !text-xl max-md:text-md dark:text-white"
                        textTransform={'uppercase'}
                    >
                        {choosingCinema_Text}
                    </DialogTitle>
                    <div className="flex flex-col mx-5 mb-4 gap-4">
                        <div className="flex sm:flex-row flex-col gap-4">
                            {/* Form Select Cities */}
                            <FormControl className="sm:basis-1/2 basis-full">
                                <InputLabel
                                    id="select-cinema-city"
                                    className="!font-MP_Regular dark:!text-[#fff]"
                                >
                                    {choosingCity_Text}
                                </InputLabel>
                                <Select
                                    labelId="select-cinema-city"
                                    id="cinema-select-city-menu"
                                    value={cityId}
                                    label={choosingCity_Text}
                                    onChange={handleChangeCity}
                                    className="!font-MP_Medium dark:!text-white"
                                >
                                    {/* Default select is "All" */}
                                    <MenuItem
                                        className="!font-MP_Regular"
                                        value={'all'}
                                    >
                                        {all_Text}
                                    </MenuItem>
                                    {/* Other select */}
                                    {Object.keys(CitiesApi).map((city) => {
                                        const cityApi =
                                            CitiesApi[
                                                city as keyof typeof CitiesApi
                                            ];
                                        return (
                                            <MenuItem
                                                key={city}
                                                className="!font-MP_Regular"
                                                value={cityApi.id}
                                            >
                                                {
                                                    cityApi.name[
                                                        setting?.language as keyof typeof cityApi.name
                                                    ]
                                                }
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                            {/* Form Select District From City */}
                            <FormControl className="sm:basis-1/2 basis-full">
                                <InputLabel
                                    id="select-cinema-district"
                                    className="!font-MP_Regular dark:!text-[#fff]"
                                >
                                    {choosingDistrict_Text}
                                </InputLabel>
                                <Select
                                    labelId="select-cinema-district"
                                    id="cinema-select-district-menu"
                                    value={districtId}
                                    label={choosingDistrict_Text}
                                    onChange={handleChangeDistrict}
                                    className="!font-MP_Medium dark:!text-white"
                                >
                                    {/* Default select is "All" */}
                                    <MenuItem
                                        className="!font-MP_Regular"
                                        value={'all'}
                                    >
                                        {all_Text}
                                    </MenuItem>
                                    {/* Other select */}
                                    {cityId !== 'all' &&
                                        Object.keys(
                                            CitiesApi[
                                                cityId as keyof typeof CitiesApi
                                            ].districtsApi,
                                        ).map((district) => {
                                            const districtApi = (
                                                CitiesApi[
                                                    cityId as keyof typeof CitiesApi
                                                ].districtsApi as any
                                            )[district] as any;
                                            return (
                                                <MenuItem
                                                    key={district}
                                                    className="!font-MP_Regular"
                                                    value={district}
                                                >
                                                    {
                                                        districtApi.name[
                                                            setting?.language as keyof typeof districtApi.name
                                                        ]
                                                    }
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>
                        </div>
                        <FormControl>
                            <InputLabel
                                id="select-cinema"
                                className="!font-MP_Regular dark:!text-[#fff]"
                            >
                                {choosingCinema2_Text}
                            </InputLabel>
                            <Select
                                labelId="select-cinema"
                                id="cinema-select-menu"
                                value={cinema ? JSON.stringify(cinema) : ''}
                                label={choosingCinema2_Text}
                                onChange={handleChangeCinema}
                                className="!font-MP_Medium dark:!text-white"
                            >
                                {Object.keys(CinemasPlacesApi).map((id) => {
                                    const cinemaApi = CinemasPlacesApi[
                                        id as keyof typeof CinemasPlacesApi
                                    ] as CinemaType;
                                    if (!cinemaApi) return;
                                    if (
                                        cityId !== 'all' &&
                                        cinemaApi.city_id !== cityId
                                    )
                                        return;
                                    if (
                                        districtId !== 'all' &&
                                        cinemaApi.district_id !== districtId
                                    )
                                        return;
                                    return (
                                        <MenuItem
                                            key={id}
                                            className="!font-MP_Regular"
                                            value={JSON.stringify(cinemaApi)}
                                        >
                                            {
                                                cinemaApi.name[
                                                    setting?.language as keyof typeof cinemaApi.name
                                                ]
                                            }
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div
                        className={clsx(
                            'flex sm:flex-row flex-col gap-4 text-[#1b1b1b] items-center mx-5 mb-4 justify-around',
                            {
                                '!justify-center': !cinema,
                            },
                        )}
                    >
                        {cinema && (
                            <Button
                                LinkComponent={Link}
                                href={`/cinema/${cinema.id}`}
                                variant="contained"
                                size="large"
                                className="!font-MP_Medium md:!text-md lg:!text-lg !py-2 !bg-red-500 dark:!bg-red-netflix !rounded-none sm:w-max w-full"
                            >
                                <span>Xem Thêm Về Rạp</span>
                            </Button>
                        )}
                        <Button
                            onClick={handleOpenMenu(false)}
                            variant="outlined"
                            size="large"
                            color="inherit"
                            className="!font-MP_Medium md:!text-md lg:!text-lg !rounded-none !py-2 sm:w-max w-full dark:border-white dark:text-white dark:hover:!text-[#cacaca] dark:hover:!border-[#cacaca]"
                        >
                            {cinema ? 'Xong' : 'Thoát'}
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};

export default ChooseCinema;
