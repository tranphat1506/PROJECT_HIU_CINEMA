import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Button, CircularProgress, Dialog, IconButton } from '@mui/material';
import { PiSmileyStickerFill } from 'react-icons/pi';
import ChairRow from './ChairRow';
import { MdChair } from 'react-icons/md';
type ChooseChairProps = {};
const ChooseChair: React.FC<ChooseChairProps> = ({}) => {
    const navigate = useNavigate();
    const [userChoose, setUserChoose] = useState<{ [id: string]: boolean }>({});
    const [openPaymentMenu, setOpenPaymentMenu] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState({
        paymentQuery: false,
        paymentSuccess: false,
    });
    const togglePaymentMenu = (open: boolean) => () => {
        if (!Object.keys(userChoose).length) return;
        setOpenPaymentMenu(open);
    };
    const handleChooseChair = useCallback(
        (chairId: string, statusThisChair?: boolean) => () => {
            if (userChoose[chairId] || statusThisChair)
                delete userChoose[chairId];
            else userChoose[chairId] = true;
            setUserChoose({ ...userChoose });
        },
        [],
    );
    const handlePaymentDispatch = (action: string) => () => {
        switch (action) {
            case 'pay':
                setPaymentStatus({ ...paymentStatus, paymentQuery: true });
                break;
            case 'success':
                setPaymentStatus({ ...paymentStatus, paymentSuccess: true });
                break;
            default:
                throw Error('Invalid action!');
        }
    };
    useEffect(() => {
        if (!paymentStatus.paymentQuery) return;
        if (!paymentStatus.paymentSuccess) {
            let fakePaymentLoading = setTimeout(() => {
                setPaymentStatus({ ...paymentStatus, paymentSuccess: true });
                clearTimeout(fakePaymentLoading);
                let waitAndBackHome = setTimeout(() => {
                    navigate('/');
                    clearTimeout(waitAndBackHome);
                }, 1000);
            }, 1000);
        }
    }, [paymentStatus]);
    return (
        <div className="max-w-[1700px] mx-auto w-full pt-6">
            <div className="flex flex-nowrap gap-2 max-lg:flex-col">
                <div className="max-lg:w-full w-[40%] dark:text-white p-3 flex max-lg:flex-row flex-col">
                    <div className="w-full flex justify-center">
                        <img
                            src="/thenun2/thenun2-poster.jpg"
                            alt="Movie poster"
                            className="h-full object-contain"
                        />
                    </div>
                    <div className="px-2 w-full">
                        <div className="font-MP_Medium text-2xl uppercase text-center">
                            The Nun II
                        </div>
                        <div className="font-MP_Regular text-base">
                            Rạp: HIUC - Bông Sao
                        </div>
                        <div className="font-MP_Regular text-base">
                            Ngày: 19/10 - T5
                        </div>
                        <div className="font-MP_Regular text-base">
                            Thời gian: 13:00
                        </div>
                        <div className="font-MP_Regular text-base">
                            Giá vé: 45.000đ
                        </div>
                        {!!Object.keys(userChoose).length && (
                            <span className="text-base overflow-ellipsis">
                                Ghế đã chọn: (
                                {Object.keys(userChoose).map(
                                    (chairId, index) => {
                                        if (!index) return chairId;
                                        return '-' + chairId;
                                    },
                                )}
                                )
                            </span>
                        )}
                    </div>
                </div>
                <div className="w-auto bg-[#efefef2e] m-3 p-2 border-2 rounded-xl border-red-300 dark:text-white flex flex-col overflow-y-auto">
                    <div className="w-max">
                        <div className="font-MP_Regular font-semibold uppercase text-center px-2 py-4">
                            Màn Hình Chiếu
                        </div>
                        <ChairRow
                            userChoose={userChoose}
                            handleChooseChair={handleChooseChair}
                        />
                    </div>
                    <div className="w-full flex justify-evenly mt-4">
                        <div className="flex items-center flex-col">
                            <MdChair className="text-[40px] dark:text-white text-[#3b3b3b]" />
                            <span className="font-MP_Regular">Ghế trống</span>
                        </div>
                        <div className="flex items-center flex-col">
                            <MdChair className="text-[40px] text-[#8165ff]" />
                            <span className="font-MP_Regular">Ghế bạn đặt</span>
                        </div>
                        <div className="flex items-center flex-col">
                            <MdChair className="text-[40px] text-red-netflix" />
                            <span className="font-MP_Regular">Ghế bạn đặt</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-5 font-MP_Medium flex gap-4 mb-4 justify-end">
                <span className="dark:text-white text-[#3b3b3b] text-2xl">
                    <span className="mr-2">
                        Số ghế: {Object.keys(userChoose).length}
                    </span>
                </span>
                <span className="dark:text-white text-[#3b3b3b] text-2xl">
                    Tổng: {45 * Object.keys(userChoose).length}.000 đ
                </span>
            </div>
            <div className="mx-5 mb-4 font-MP_Medium flex gap-4 justify-end">
                <Button
                    onClick={togglePaymentMenu(true)}
                    variant="outlined"
                    className="!font-MP_Medium !border-[#fff] dark:!text-white !text-[#3b3b3b]"
                >
                    Thanh toán
                </Button>
                <Dialog
                    open={openPaymentMenu}
                    onClose={togglePaymentMenu(false)}
                    PaperProps={{ className: 'dark:!bg-black' }}
                >
                    <div className="w-[480px] p-4">
                        {!paymentStatus.paymentQuery ? (
                            <>
                                <h1 className="uppercase font-MP_Regular font-semibold text-2xl dark:text-white py-4 text-center">
                                    Hóa đơn
                                </h1>
                                <div className="">
                                    <div className="dark:text-white flex flex-col font-MP_Medium px-8 gap-2">
                                        <span>Tên phim: The Nun II</span>
                                        <span>Rạp: HIUC - Bông Sao</span>
                                        <span>Ngày: 19/10 - T5</span>
                                        <span>Thời gian: 13:00</span>
                                        <span>
                                            Tiền vé: 45.000đ x{' '}
                                            {Object.keys(userChoose).length}
                                        </span>
                                        <span>Tiền nước: 0đ</span>
                                        <hr />
                                        <span>
                                            Tổng tiền:{' '}
                                            {45 *
                                                Object.keys(userChoose).length}
                                            .000đ
                                        </span>
                                    </div>
                                </div>
                                <h1 className="uppercase font-MP_Regular font-semibold text-2xl dark:text-white py-4 text-center">
                                    Thanh toán bằng
                                </h1>
                                <div className="w-max m-auto flex gap-4">
                                    <IconButton
                                        size="small"
                                        onClick={handlePaymentDispatch('pay')}
                                    >
                                        <img
                                            className="w-[50px]"
                                            src="/MoMo_Logo.png"
                                            alt="Pay with Momo"
                                        />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={handlePaymentDispatch('pay')}
                                    >
                                        <img
                                            className="w-[50px]"
                                            src="/Logo-ZaloPay.webp"
                                            alt="Pay with Zalopay"
                                        />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={handlePaymentDispatch('pay')}
                                    >
                                        <img
                                            className="w-[50px]"
                                            src="/visa.png"
                                            alt="Pay with Visa"
                                        />
                                    </IconButton>
                                </div>
                            </>
                        ) : (
                            <>
                                {!paymentStatus.paymentSuccess ? (
                                    <>
                                        <h1 className="uppercase font-MP_Regular font-semibold text-2xl dark:text-white py-4 text-center">
                                            Đang thanh toán
                                        </h1>
                                        <div className="w-full h-[150px] flex justify-center items-center">
                                            <CircularProgress></CircularProgress>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="uppercase font-MP_Regular font-semibold text-2xl dark:text-white py-4 text-center">
                                            Thanh toán thành công
                                        </h1>
                                        <div className="w-full h-[150px] flex justify-center items-center">
                                            <PiSmileyStickerFill className="text-8xl text-[#4ad14c]" />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </Dialog>
                <Button
                    variant="contained"
                    className="!font-MP_Medium !bg-red-500 dark:!bg-red-netflix"
                >
                    Mua kèm đồ ăn
                </Button>
            </div>
        </div>
    );
};

export default ChooseChair;
