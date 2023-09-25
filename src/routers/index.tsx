import { HomeLayout, HomePage } from '../pages/Home';
import { BuyTicketLayout, BuyTicketPage } from '@/pages/BuyTicket';
type Router = Route[];
type Route = {
    path: string;
    page: React.FC;
    layout?: React.FC;
    props?: any;
};
const publicRoutes: Router = [
    { path: '/', page: HomePage, layout: HomeLayout },
    {
        path: '/buy-ticket',
        page: BuyTicketPage,
        layout: BuyTicketLayout,
        props: { headerProps: { autoHide: false, fixed: false } },
    },
];

const privateRoutes: Router = [];

export { publicRoutes, privateRoutes };
